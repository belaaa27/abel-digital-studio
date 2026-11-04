# ABEL / DIGITAL Studio

A personal full-stack developer portfolio showcasing modern web applications, thoughtful digital experiences, and technical expertise.

**Live Website:** https://abel-digital-studio.vercel.app  
**GitHub Repository:** https://github.com/belaaa27/abel-digital-studio

## Overview

ABEL / DIGITAL Studio is a personal portfolio built with Next.js. It showcases selected development projects, professional services, and information about the developer.

The application includes a custom administrator dashboard and a database-driven content management system, allowing projects to be managed and published dynamically without manually editing the homepage.

## Features

### Public Website

- Responsive homepage with a warm ivory and forest-green visual identity.
- About, Services, Work, and Contact sections.
- Dynamic project showcase powered by database content.
- Project descriptions, technology tags, screenshots, and external links.
- Search engine optimization and social sharing metadata.
- Accessible interface and optimized page performance.

### Admin Dashboard

- Protected administrator authentication.
- Database-driven project management.
- Create, edit, publish, and unpublish projects.
- Manage featured projects and project information.
- Screenshot capture using ScreenshotOne.
- Image hosting through Cloudinary.

## Technology Stack

| Category           | Technologies                       |
| ------------------ | ---------------------------------- |
| Framework          | Next.js 16, React 19               |
| Language           | JavaScript                         |
| Styling            | Tailwind CSS 4                     |
| Database           | MariaDB / TiDB Cloud               |
| ORM                | Prisma 7                           |
| Database Adapter   | Prisma MariaDB Adapter             |
| Authentication     | bcryptjs, database-backed sessions |
| Image Hosting      | Cloudinary                         |
| Screenshot Service | ScreenshotOne                      |
| Email              | Nodemailer                         |
| Deployment         | Vercel                             |
| Version Control    | Git and GitHub                     |

## Getting Started

### Prerequisites

- Node.js
- npm
- Git
- A compatible MariaDB or TiDB database

### 1. Clone the repository

```bash
git clone https://github.com/belaaa27/abel-digital-studio.git
cd abel-digital-studio
```

### 2. Install dependencies

```bash
npm install
```

The installation process automatically generates the Prisma Client through the project's `postinstall` script.

### 3. Configure environment variables

Create a local `.env` file in the project root.

At minimum, configure:

```env
DATABASE_URL="your_database_connection_string"
```

Configure any additional environment variables required by the application, including credentials for external services.

Keep local and production environment configurations separate.

**Security:** Never commit `.env` files, database passwords, API keys, or private credentials to GitHub.

### 4. Configure the database

This project uses Prisma 7 with the following configuration:

- Prisma schema: `prisma/schema.prisma`
- Migration directory: `prisma/migrations`
- Prisma configuration: `prisma7.config.ts`
- Database connection: `DATABASE_URL`

For a local development database, apply the existing migrations using:

```bash
npx prisma migrate dev --config ./prisma7.config.ts
```

Only run this against your intended development database. Do not run development migrations against production.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command         | Description                                           |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Starts the Next.js development server                 |
| `npm run build` | Creates a production build                            |
| `npm run start` | Starts the production server                          |
| `npm run lint`  | Runs ESLint                                           |
| `npm install`   | Installs dependencies and generates the Prisma Client |

## Project Structure

```text
abel-digital-studio/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
├── scripts/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── admin/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   └── generated/
├── prisma7.config.ts
├── package.json
├── package-lock.json
├── next.config.mjs
└── README.md
```

## Deployment

The application is deployed on Vercel:

https://abel-digital-studio.vercel.app

Production uses a hosted database and environment variables configured separately from the local development environment.

## Author

**Abel Million**  
Freelance Full-Stack Developer

- Portfolio: https://abel-digital-studio.vercel.app
- GitHub: https://github.com/belaaa27

---

Built with Next.js, Prisma, and a focus on thoughtful digital experiences.
