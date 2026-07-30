import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Empacota um servidor Node.js autocontido em .next/standalone — essencial
  // pra hospedar num Node.js tradicional (Hostinger) sem depender da estrutura
  // de workspaces do monorepo estar presente no servidor de produção.
  output: "standalone",
  images: {
    // Fotos são servidas pelo Supabase Storage (bucket público).
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
