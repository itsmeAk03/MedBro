import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Med Bro",
  description: "A medical recomendayion syste,",
  icons:"/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
