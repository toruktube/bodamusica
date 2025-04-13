import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // No ejecutar ESLint durante el build para evitar problemas
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opcionalmente, también ignorar errores de TypeScript durante el build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
