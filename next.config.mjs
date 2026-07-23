/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export -> S3 + CloudFront. No server at this rung of the roadmap.
  output: 'export',
  // /about -> /about/index.html, which is what the S3 website endpoint serves.
  trailingSlash: true,
  // next/image optimization needs a server; we ship pre-optimized WebP instead.
  images: { unoptimized: true },
  // A stray package-lock.json in the home dir confuses root inference.
  turbopack: { root: import.meta.dirname },
}

export default nextConfig
