import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  weight: ["500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mimesis | UX Portfolio",
  description: "A UX portfolio displaying original visual works side-by-side with imitations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${spaceGrotesk.variable}`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <ThemeToggle />
        <main id="main">
          {children}
        </main>
      </body>
    </html>
  );
}
