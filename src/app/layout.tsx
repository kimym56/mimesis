import type { Metadata } from "next";
import { Archivo, Schibsted_Grotesk, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
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

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
  display: "swap",
  weight: ["700", "800"],
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
            __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}d.setAttribute('data-theme',t);if(window.self!==window.top){var isProjectDetail=window.location.pathname.startsWith('/project/');var stageWidth=isProjectDetail?1760:1440;var stageHeight=isProjectDetail?1160:1120;var stagePadding=24;var syncEmbedStage=function(){var availableWidth=Math.max(window.innerWidth-stagePadding*2,320);var availableHeight=Math.max(window.innerHeight-stagePadding*2,320);var embedScale=Math.min(1,availableWidth/stageWidth,availableHeight/stageHeight);d.style.setProperty('--embed-stage-width',stageWidth+'px');d.style.setProperty('--embed-stage-height',stageHeight+'px');d.style.setProperty('--embed-stage-scale',String(embedScale));d.style.setProperty('--embed-shell-height',Math.round(stageHeight*embedScale)+'px');};document.documentElement.setAttribute('data-embed','true');syncEmbedStage();window.addEventListener('resize',syncEmbedStage,{passive:true});}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${archivo.variable} ${spaceGrotesk.variable} ${schibstedGrotesk.variable}`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Suspense fallback={null}>
          <ThemeToggle />
        </Suspense>
        <main id="main">
          {children}
        </main>
      </body>
    </html>
  );
}
