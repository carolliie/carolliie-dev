import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Carollie - Software developer",
  description: "Projetos inovadores e soluções digitais que transformam ideias em realidade.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=pencerio@50&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
