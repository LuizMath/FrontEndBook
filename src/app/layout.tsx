import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
