// @ts-check
const webpack = require("webpack");
const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

const packageJson = require("./package.json");

const NEXTJS_IGNORE_ESLINT = process.env.NEXTJS_IGNORE_ESLINT === "1" || false;
const NEXTJS_IGNORE_TYPECHECK =
  process.env.NEXTJS_IGNORE_TYPECHECK === "1" || false;

// const isProd = process.env.NODE_ENV === "production";

/**
 * A way to allow CI optimization when the build done there is not used
 * to deliver an image or deploy the files.
 * @link https://nextjs.org/docs/advanced-features/source-maps
 */
const disableSourceMaps = process.env.NEXT_DISABLE_SOURCEMAPS === "true";

/**
 * @type {import('next').NextConfig}
 **/
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  cleanDistDir: true,
  trailingSlash: true,

  productionBrowserSourceMaps: !disableSourceMaps,
  optimizeFonts: true,

  httpAgentOptions: {
    // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
    keepAlive: true,
  },

  experimental: {
    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,

    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    // externalDir: true,
  },

  // Replace terser by swc
  // Vercel seems to bugs with swfMinify (logs:     [TypeError: {(intermediate value)} is not a function])
  // @link https://github.com/vercel/next.js/issues/31153
  swcMinify: false,

  pageExtensions: ["page.tsx", "page.mdx"],

  typescript: {
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
  },

  eslint: {
    ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
    dirs: ["src"],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      // Add specific config for server mode
    }

    // config.resolve.fallback = {
    //   buffer: require.resolve("buffer/"),
    //   process: require.resolve("process/browser"),
    // };

    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /\/.stories.tsx\// })
    );

    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: /\.(js|ts)x?$/,
    //   use: [
    //     {
    //       loader: "@svgr/webpack",
    //       // https://react-svgr.com/docs/webpack/#passing-options
    //       options: {
    //         svgo: true,
    //         // @link https://github.com/svg/svgo#configuration
    //         svgoConfig: {
    //           multipass: false,
    //           datauri: "base64",
    //           js2svg: {
    //             indent: 2,
    //             pretty: false,
    //           },
    //         },
    //       },
    //     },
    //   ],
    // });

    return config;
  },
  env: {
    APP_NAME: packageJson.name,
    APP_VERSION: packageJson.version,
    BUILD_TIME: new Date().getTime().toString(10),
  },
};

module.exports = withMDX(config);
