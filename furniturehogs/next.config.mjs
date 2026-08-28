/** @type {import('next').NextConfig} */

// GOVERNANCE — Article VIII / documented anti-pattern:
// `output: 'export'` is intentionally OMITTED. This build has live API routes
// (/api/availability, /api/booking) that proxy to n8n. Static export would
// silently disable them. Deploy target is Vercel serverless. Do not add it.
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
