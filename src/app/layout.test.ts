import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readSource(relativePath: string) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("RootLayout font wiring", () => {
  it("exposes the Schibsted Grotesk variable on the body for demo-specific typography", () => {
    const layoutSource = readSource("./layout.tsx");

    expect(layoutSource).toContain("Schibsted_Grotesk");
    expect(layoutSource).toContain('variable: "--font-schibsted-grotesk"');
    expect(layoutSource).toContain("schibstedGrotesk.variable");
  });

  it("detects iframe embedding early and seeds desktop-stage CSS variables", () => {
    const layoutSource = readSource("./layout.tsx");

    expect(layoutSource).toContain("window.self!==window.top");
    expect(layoutSource).toContain("document.documentElement.setAttribute('data-embed','true')");
    expect(layoutSource).toContain("--embed-stage-scale");
    expect(layoutSource).toContain("window.addEventListener('resize',syncEmbedStage");
  });
});
