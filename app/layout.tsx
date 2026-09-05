import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Puppies | Clínica Veterinária em Samambaia Norte – DF",
  description:
    "Clínica Veterinária Puppies em Samambaia Norte, Brasília. Clínica geral, especialidades, internação, cirurgias, vacinas e exames. O cuidado que seu pet merece.",
  themeColor: "#FFD902",
  openGraph: {
    title: "Puppies | Clínica Veterinária",
    description: "O cuidado que seu pet merece está aqui. Samambaia Norte, Brasília – DF.",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa+One&family=Doppio+One&family=Lato:ital,wght@0,400;0,700;0,900;1,400&family=Quicksand:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="https://projetos.gaveadigital.com/clinica-puppies/img/favicon.png" />
        <link rel="apple-touch-icon" href="https://projetos.gaveadigital.com/clinica-puppies/img/favicon.png" />
      </head>
      <body>
        {children}
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="afterInteractive" />
      </body>
    </html>
  );
}
