/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "projetos.gaveadigital.com" },
      { protocol: "https", hostname: "rede.petlife.com.br" },
      { protocol: "https", hostname: "www.doglife.com.br" }
    ]
  }
};

export default nextConfig;
