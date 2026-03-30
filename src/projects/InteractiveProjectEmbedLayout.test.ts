import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readStyles(relativePath: string) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

describe("Interactive project embed layout", () => {
  it("forces desktop-height wrappers for iframe embeds even when media queries stay in mobile mode", () => {
    const pageCurl = readStyles("./page-curl/PageCurlProject.module.css");
    const wiper = readStyles("./wiper-typography/WiperTypographyProject.module.css");
    const bwCircle = readStyles("./bw-circle/BwCircleProject.module.css");
    const staggeredText = readStyles("./staggered-text/StaggeredTextProject.module.css");

    expect(pageCurl).toContain(':global(html[data-embed="true"]) .embedWrapper');
    expect(wiper).toContain(':global(html[data-embed="true"]) .wrapper');
    expect(bwCircle).toContain(':global(html[data-embed="true"]) .sceneShell');
    expect(staggeredText).toContain(':global(html[data-embed="true"]) .projectShell');
    expect(staggeredText).toContain(':global(html[data-embed="true"]) .interactivePane');
    expect(pageCurl).toContain("height: 100%;");
    expect(wiper).toContain("height: 100%;");
    expect(bwCircle).toContain("height: 100%;");
    expect(staggeredText).toContain("height: 100%;");
  });

  it("lets the page-curl interactive root inherit a definite parent height for the 3d canvas host", () => {
    const pageCurl = readStyles("./page-curl/PageCurlProject.module.css");

    expect(pageCurl).toContain(".interactivePane");
    expect(pageCurl).toContain("height: 100%;");
  });
});
