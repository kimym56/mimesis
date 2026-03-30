import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readSource(relativePath: string) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Home page embed stage", () => {
  it("wraps the home page in a dedicated shell for embedded desktop scaling", () => {
    const pageSource = readSource("./page.tsx");

    expect(pageSource).toContain('className="home-page-shell"');
    expect(pageSource).toContain('className="container home-page"');
  });

  it("defines embed-only stage sizing styles for the home page", () => {
    const globalStyles = readSource("./globals.css");

    expect(globalStyles).toContain('html[data-embed="true"] .home-page-shell');
    expect(globalStyles).toContain('html[data-embed="true"] .home-page');
    expect(globalStyles).toContain("transform: scale(var(--embed-stage-scale, 1));");
    expect(globalStyles).toContain("height: var(--embed-shell-height, auto);");
  });
});
