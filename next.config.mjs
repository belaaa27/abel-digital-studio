/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  outputFileTracingIncludes: {
    "/api/**/*": ["./certs/isrgrootx1.pem"],
  },
};

export default nextConfig;
