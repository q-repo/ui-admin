// This file shows how to use a custom path for the i18n config
// Currently, the default path ./src/i18n/request.ts is being used,
// so this configuration is NOT active.

// If you want to use a custom path, uncomment and use this pattern:

/*
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Custom path example:
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default withNextIntl(nextConfig);
*/

// Supported default paths (no need to specify):
// - ./src/i18n/request.ts (currently used)
// - ./src/i18n/request.js
// - ./src/i18n/request.jsx
// - ./src/i18n/request.tsx
// - ./i18n/request.ts (root level)
// - ./i18n/request.js
// - ./i18n/request.jsx
// - ./i18n/request.tsx
