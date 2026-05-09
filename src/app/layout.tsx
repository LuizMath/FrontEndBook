import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Juridiq Books",
    template: "%s | Juridiq Books",
  },
  description:
    "Catálogo de livros — desafio fullstack Juridiq. Cadastre, liste e filtre livros.",
  applicationName: "Juridiq Books",
  keywords: ["livros", "catálogo", "Juridiq", "Next.js", "shadcn/ui"],
  authors: [{ name: "Juridiq" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Juridiq Books",
    title: "Juridiq Books",
    description:
      "Catálogo de livros — desafio fullstack Juridiq. Cadastre, liste e filtre livros.",
  },
  twitter: {
    card: "summary",
    title: "Juridiq Books",
    description: "Catálogo de livros — desafio fullstack Juridiq.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans antialiased">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
