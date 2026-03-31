import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readCss(relativePath: string) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function countOccurrences(source: string, pattern: string) {
  return source.split(pattern).length - 1;
}

const globalCss = readCss("../app/globals.css");
const projectDetailCss = readCss("../app/project/[id]/ProjectDetail.module.css");
const wiperCss = readCss("../projects/wiper-typography/WiperTypographyProject.module.css");
const pageCurlCss = readCss("../projects/page-curl/PageCurlProject.module.css");
const bwCircleCss = readCss("../projects/bw-circle/BwCircleProject.module.css");
const staggeredTextCss = readCss(
  "../projects/staggered-text/StaggeredTextProject.module.css",
);

const MOBILE_PANE_MIN_HEIGHT = "min-height: var(--project-mobile-pane-min-height, 40vh);";

describe("embedded project pane heights", () => {
  it("defines an embed-specific mobile pane height floor", () => {
    expect(globalCss).toContain("--project-mobile-pane-min-height: 40vh;");
    expect(globalCss).toContain('html[data-embed="true"]');
    expect(globalCss).toContain("--project-mobile-pane-min-height: max(18rem, 40vh);");
  });

  it("uses the shared mobile pane height token across project detail and demo shells", () => {
    expect(countOccurrences(projectDetailCss, MOBILE_PANE_MIN_HEIGHT)).toBe(4);
    expect(countOccurrences(wiperCss, MOBILE_PANE_MIN_HEIGHT)).toBe(1);
    expect(countOccurrences(pageCurlCss, MOBILE_PANE_MIN_HEIGHT)).toBe(1);
    expect(countOccurrences(bwCircleCss, MOBILE_PANE_MIN_HEIGHT)).toBe(1);
    expect(countOccurrences(staggeredTextCss, MOBILE_PANE_MIN_HEIGHT)).toBe(2);
  });
});
