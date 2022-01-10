// @ts-check

const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

const NEXTJS_IGNORE_ESLINT = process.env.NEXTJS_IGNORE_ESLINT === "1" || false;
const NEXTJS_IGNORE_TYPECHECK =
  process.env.NEXTJS_IGNORE_TYPECHECK === "1" || false;

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  cleanDistDir: true,
  trailingSlash: true,
  optimizeFonts: true,
  pageExtensions: ["page.tsx", "page.mdx"],
  basePath: process.env.NEXT_USER_BASEPATH || "",

  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
  },

  eslint: {
    ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
    dirs: ["src"],
  },
};

const withTM = require("next-transpile-modules")([
  "@kiebitz-oss/ui",
  "@kiebitz-oss/api",
  "@kiebitz-oss/config",
]);

module.exports = withTM(withMDX(config));
