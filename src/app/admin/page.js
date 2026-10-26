"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"
  const [loggingOut, setLoggingOut] = useState(false);

  // Projects state
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all"); // "all" | "published" | "drafts"

  // Toast / Banner state
  const [toastMessage, setToastMessage] = useState("");

  // Create / Edit Project Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  // Delete Confirmation Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    imageUrl: "",
    featured: false,
    published: false,
  });

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const projectsRes = await fetch("/api/admin/projects", { method: "GET" });
      if (projectsRes.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!projectsRes.ok) {
        throw new Error("Failed to load portfolio projects.");
      }

      const projectsData = await projectsRes.json();
      setProjects(projectsData.projects || []);
      setProjectsError("");
    } catch (err) {
      console.error("Error fetching projects:", err);
      setProjectsError(
        err.message || "An unexpected error occurred while fetching projects.",
      );
    } finally {
      setProjectsLoading(false);
    }
  };

  useEffect(() => {
    async function verifyAndFetchData() {
      try {
        const sessionRes = await fetch("/api/auth/session", { method: "GET" });
        if (!sessionRes.ok) {
          router.replace("/admin/login");
          return;
        }

        const sessionData = await sessionRes.json();
        if (!sessionData.authenticated) {
          router.replace("/admin/login");
          return;
        }

        setAdmin(sessionData.admin);
        setStatus("ready");

        await fetchProjects();
      } catch (err) {
        console.error("Dashboard initialization error:", err);
        router.replace("/admin/login");
      }
    }

    verifyAndFetchData();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.replace("/admin/login");
    }
  };

  const openCreateModal = () => {
    setEditingProjectId(null);
    setFormData({
      title: "",
      slug: "",
      category: "",
      description: "",
      liveUrl: "",
      githubUrl: "",
      imageUrl: "",
      featured: false,
      published: false,
    });
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title || "",
      slug: project.slug || "",
      category: project.category || "",
      description: project.description || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      imageUrl: project.imageUrl || "",
      featured: Boolean(project.featured),
      published: Boolean(project.published),
    });
    setFormErrors([]);
    setIsModalOpen(true);
  };

  const openDeleteModal = (project) => {
    setProjectToDelete(project);
    setDeleteError("");
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(
        `/api/admin/projects/${projectToDelete.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const resData = await response.json();
        throw new Error(resData.error || "Failed to delete project.");
      }

      setDeleteModalOpen(false);
      setToastMessage(
        `Project "${projectToDelete.title}" deleted successfully!`,
      );
      setTimeout(() => setToastMessage(""), 5000);

      setProjectToDelete(null);
      await fetchProjects();
    } catch (err) {
      console.error("Delete project error:", err);
      setDeleteError(
        err.message || "Failed to delete project. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleTitleChange = (e) => {
    const titleVal = e.target.value;
    const autoSlug = titleVal
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title: titleVal,
      slug:
        !editingProjectId &&
        (prev.slug === "" || prev.slug === autoSlug.slice(0, -1))
          ? autoSlug
          : prev.slug,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setFormErrors([]);

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      category: formData.category.trim(),
      description: formData.description.trim(),
      liveUrl: formData.liveUrl.trim() || null,
      githubUrl: formData.githubUrl.trim() || null,
      imageUrl: formData.imageUrl.trim() || null,
      featured: formData.featured,
      published: formData.published,
    };

    try {
      const endpoint = editingProjectId
        ? `/api/admin/projects/${editingProjectId}`
        : "/api/admin/projects";
      const method = editingProjectId ? "PATCH" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setFormErrors([
            "A project with this slug already exists. Please choose a unique slug.",
          ]);
        } else if (resData.details && Array.isArray(resData.details)) {
          setFormErrors(resData.details);
        } else {
          setFormErrors([
            resData.error ||
              "Failed to save project. Please review your input.",
          ]);
        }
        return;
      }

      setIsModalOpen(false);
      setToastMessage(
        editingProjectId
          ? `Project "${payload.title}" updated successfully!`
          : `Project "${payload.title}" created successfully!`,
      );
      setTimeout(() => setToastMessage(""), 5000);

      await fetchProjects();
    } catch (err) {
      console.error("Project submission error:", err);
      setFormErrors([
        "Network error. Please check your connection and try again.",
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  // Calculated Statistics
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter((p) => p.published).length;
    const drafts = projects.filter((p) => !p.published).length;
    const featured = projects.filter((p) => p.featured).length;
    return { total, published, drafts, featured };
  }, [projects]);

  // Filtered & Searched Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.slug.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterTab === "published") {
        return matchesSearch && project.published;
      }
      if (filterTab === "drafts") {
        return matchesSearch && !project.published;
      }
      return matchesSearch;
    });
  }, [projects, searchQuery, filterTab]);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-warm-ivory text-ink-forest flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-ink-forest/20 border-t-ink-forest" />
          <p className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
            Verifying session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm-ivory text-ink-forest flex flex-col justify-between p-6 lg:p-12 relative">
      <div className="space-y-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-ink-forest/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-ink-forest"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-ink-forest/60">
              ABEL /
            </span>
            <span className="tracking-tight uppercase">DIGITAL</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block font-mono text-xs text-ink-forest/60">
              {admin?.email}
            </span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-full border border-ink-forest/20 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-ink-forest transition-colors hover:bg-ink-forest hover:text-warm-ivory disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        {/* Global Toast Banner */}
        {toastMessage && (
          <div className="rounded-xl bg-emerald-800 text-warm-ivory p-4 font-mono text-xs flex items-center justify-between shadow-md">
            <span>✓ {toastMessage}</span>
            <button
              onClick={() => setToastMessage("")}
              className="text-warm-ivory/70 hover:text-warm-ivory"
            >
              ✕
            </button>
          </div>
        )}

        {/* Studio Welcome & Create Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-ink-forest/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-forest mb-2">
              Studio Portal
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink-forest font-light tracking-tight">
              Project Management
            </h1>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center rounded-full bg-ink-forest px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-warm-ivory transition-opacity hover:opacity-90 shadow-sm"
          >
            + Create Project
          </button>
        </div>

        {/* Statistics Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-ink-forest/15 bg-white/50 p-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-forest/60 block mb-1">
              Total Projects
            </span>
            <span className="font-serif text-3xl text-ink-forest">
              {projectsLoading ? "—" : stats.total}
            </span>
          </div>
          <div className="rounded-2xl border border-ink-forest/15 bg-white/50 p-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-forest/60 block mb-1">
              Published
            </span>
            <span className="font-serif text-3xl text-ink-forest">
              {projectsLoading ? "—" : stats.published}
            </span>
          </div>
          <div className="rounded-2xl border border-ink-forest/15 bg-white/50 p-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-forest/60 block mb-1">
              Drafts
            </span>
            <span className="font-serif text-3xl text-ink-forest">
              {projectsLoading ? "—" : stats.drafts}
            </span>
          </div>
          <div className="rounded-2xl border border-ink-forest/15 bg-white/50 p-5 shadow-sm">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-forest/60 block mb-1">
              Featured
            </span>
            <span className="font-serif text-3xl text-ink-forest">
              {projectsLoading ? "—" : stats.featured}
            </span>
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search by title or slug..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-ink-forest/20 bg-white px-4 py-2.5 text-xs text-ink-forest placeholder-ink-forest/40 focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
              />
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-xl border border-ink-forest/20 bg-white/60 p-1 font-mono text-xs">
              <button
                onClick={() => setFilterTab("all")}
                className={`rounded-lg px-3.5 py-1.5 transition-colors ${
                  filterTab === "all"
                    ? "bg-ink-forest text-warm-ivory font-medium"
                    : "text-ink-forest/70 hover:text-ink-forest"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                onClick={() => setFilterTab("published")}
                className={`rounded-lg px-3.5 py-1.5 transition-colors ${
                  filterTab === "published"
                    ? "bg-ink-forest text-warm-ivory font-medium"
                    : "text-ink-forest/70 hover:text-ink-forest"
                }`}
              >
                Published ({stats.published})
              </button>
              <button
                onClick={() => setFilterTab("drafts")}
                className={`rounded-lg px-3.5 py-1.5 transition-colors ${
                  filterTab === "drafts"
                    ? "bg-ink-forest text-warm-ivory font-medium"
                    : "text-ink-forest/70 hover:text-ink-forest"
                }`}
              >
                Drafts ({stats.drafts})
              </button>
            </div>
          </div>

          {/* Projects Table / Card List Container */}
          <div className="rounded-2xl border border-ink-forest/15 bg-white shadow-sm overflow-hidden">
            {projectsLoading ? (
              <div className="flex flex-col items-center justify-center p-16 gap-3 text-center">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-ink-forest/20 border-t-ink-forest" />
                <p className="font-mono text-xs uppercase tracking-wider text-ink-forest/60">
                  Loading portfolio projects...
                </p>
              </div>
            ) : projectsError ? (
              <div className="p-12 text-center text-red-600 font-mono text-xs">
                {projectsError}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="p-16 text-center space-y-2">
                <p className="font-serif text-lg text-ink-forest">
                  No projects found
                </p>
                <p className="font-mono text-xs text-ink-forest/60">
                  {searchQuery || filterTab !== "all"
                    ? "Try adjusting your search query or filter criteria."
                    : "No projects have been added to the database yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-ink-forest/10 bg-ink-forest/[0.02] font-mono text-[10px] uppercase tracking-wider text-ink-forest/60">
                      <th className="py-3.5 px-6">Project Title</th>
                      <th className="py-3.5 px-6">Slug</th>
                      <th className="py-3.5 px-6">Category</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6">Featured</th>
                      <th className="py-3.5 px-6">Created</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-forest/10 font-mono text-xs">
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="transition-colors hover:bg-ink-forest/[0.015]"
                      >
                        <td className="py-4 px-6 font-medium text-ink-forest">
                          <div className="flex items-center gap-2">
                            {project.imageUrl && (
                              <img
                                src={project.imageUrl}
                                alt=""
                                className="h-7 w-7 rounded-lg object-cover border border-ink-forest/15"
                              />
                            )}
                            <span className="font-sans font-medium text-sm">
                              {project.title}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-ink-forest/70">
                          {project.slug}
                        </td>
                        <td className="py-4 px-6 text-ink-forest/80">
                          {project.category || "—"}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${
                              project.published
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {project.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          {project.featured ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-electric-lime/40 text-ink-forest text-[10px] font-semibold uppercase">
                              Featured
                            </span>
                          ) : (
                            <span className="text-ink-forest/40">—</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-ink-forest/60">
                          {project.createdAt
                            ? new Date(project.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : "—"}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(project)}
                            className="rounded-lg border border-ink-forest/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-forest hover:bg-ink-forest hover:text-warm-ivory transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteModal(project)}
                            className="rounded-lg border border-red-300 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-red-700 hover:bg-red-700 hover:text-white transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-ink-forest/20 bg-warm-ivory p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-ink-forest/10 pb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-forest/60">
                  {editingProjectId ? "Modify Record" : "New Record"}
                </span>
                <h2 className="font-serif text-2xl text-ink-forest font-light">
                  {editingProjectId
                    ? "Edit Portfolio Project"
                    : "Create Portfolio Project"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-ink-forest/60 hover:text-ink-forest font-mono text-sm"
              >
                ✕
              </button>
            </div>

            {formErrors.length > 0 && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 font-mono text-xs text-red-700 space-y-1">
                <p className="font-bold uppercase tracking-wider">
                  Submission Errors:
                </p>
                <ul className="list-disc list-inside space-y-0.5">
                  {formErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kora Leather"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kora-leather"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                      })
                    }
                    className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest font-mono focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. E-Commerce & Brand Experience"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summary of the project context, technical architecture, and challenges solved..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                    Live URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, liveUrl: e.target.value })
                    }
                    className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                    GitHub URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-ink-forest/70 mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full rounded-xl border border-ink-forest/20 bg-white px-3.5 py-2 text-xs text-ink-forest focus:outline-none focus:ring-2 focus:ring-ink-forest/30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2 font-mono text-xs">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="rounded border-ink-forest/30 text-ink-forest focus:ring-ink-forest"
                  />
                  <span>Publish immediately</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-ink-forest/30 text-ink-forest focus:ring-ink-forest"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-ink-forest/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={submitting}
                  className="rounded-full border border-ink-forest/20 px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink-forest hover:bg-ink-forest/5 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-ink-forest px-6 py-2 font-mono text-xs uppercase tracking-wider text-warm-ivory transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingProjectId
                      ? "Save Changes"
                      : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-ink-forest/20 bg-warm-ivory p-6 sm:p-8 shadow-2xl space-y-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-red-600 font-bold">
                Destructive Action
              </span>
              <h2 className="font-serif text-2xl text-ink-forest font-light mt-1">
                Delete Project?
              </h2>
            </div>

            <p className="font-mono text-xs text-ink-forest/80 leading-relaxed">
              Are you sure you want to delete{" "}
              <strong className="font-semibold text-ink-forest">
                {projectToDelete.title}
              </strong>
              ? This action cannot be undone and will remove the project from
              the public portfolio.
            </p>

            {deleteError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 font-mono text-xs text-red-700">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-ink-forest/10 font-mono text-xs">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                disabled={deleting}
                className="rounded-full border border-ink-forest/20 px-4 py-2 uppercase tracking-wider text-ink-forest hover:bg-ink-forest/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={deleting}
                className="rounded-full bg-red-700 px-6 py-2 uppercase tracking-wider text-white hover:bg-red-800 disabled:opacity-50 transition-colors"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between border-t border-ink-forest/10 pt-6 text-[11px] font-mono text-ink-forest/60 gap-2 mt-12">
        <span>ABEL / DIGITAL — ADMIN DASHBOARD</span>
        <span>PROTECTED AREA</span>
      </footer>
    </main>
  );
}
