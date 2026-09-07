import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 buduje w pełni statyczną wersję (GitHub Pages).
 * BASE_PATH ustawia prefiks ścieżek, np. /king-glamour dla
 * https://<user>.github.io/king-glamour/.
 */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.BASE_PATH?.replace(/\/$/, "") || undefined;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: isStatic ? "export" : undefined,
  basePath,
  trailingSlash: isStatic,
  images: { unoptimized: true },
};

export default nextConfig;
