import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readCss(relativePath: string) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readSelectorBlock(css: string, selector: string) {
  const match = css.match(
    new RegExp(`${escapeForRegExp(selector)}\\s*\\{[^}]*\\}`, "m"),
  );

  expect(match, `Expected ${selector} block to exist`).not.toBeNull();

  return match?.[0] ?? "";
}

const tokensCss = readCss("./tokens.css");
const wiperCss = readCss("../projects/wiper-typography/WiperTypographyProject.module.css");
const pageCurlCss = readCss("../projects/page-curl/PageCurlProject.module.css");
const bwCircleCss = readCss("../projects/bw-circle/BwCircleProject.module.css");
const staggeredTextCss = readCss(
  "../projects/staggered-text/StaggeredTextProject.module.css",
);
const projectDetailCss = readCss("../app/project/[id]/ProjectDetail.module.css");
const themeToggleCss = readCss("../components/ThemeToggle.module.css");

const SOFT_RADIUS_CASES = [
  { css: wiperCss, label: "wiper toggle shell", selector: ".modeToggle" },
  { css: wiperCss, label: "wiper toggle button", selector: ".modeButton" },
  { css: wiperCss, label: "wiper project wrapper", selector: ".wrapper" },
  { css: pageCurlCss, label: "page curl toggle shell", selector: ".modeToggle" },
  { css: pageCurlCss, label: "page curl toggle button", selector: ".modeButton" },
  { css: bwCircleCss, label: "bw-circle toggle shell", selector: ".modeToggle" },
  { css: bwCircleCss, label: "bw-circle toggle button", selector: ".modeButton" },
  { css: bwCircleCss, label: "bw-circle link input", selector: ".linkInput" },
  { css: bwCircleCss, label: "bw-circle playback button", selector: ".playbackButton" },
  { css: bwCircleCss, label: "bw-circle youtube preview", selector: ".previewFrame" },
  { css: projectDetailCss, label: "project detail image container", selector: ".imageContainer" },
  { css: projectDetailCss, label: "project detail iframe container", selector: ".iframeContainer" },
  { css: projectDetailCss, label: "project detail reference iframe", selector: ".referenceIframe" },
  { css: projectDetailCss, label: "project detail reference card", selector: ".referenceCard" },
  { css: projectDetailCss, label: "project detail threads shell", selector: ".threadsEmbedShell" },
] as const;

const PROMINENT_RADIUS_CASES = [
  { css: pageCurlCss, label: "page curl embed controls", selector: ".embedControls" },
  { css: bwCircleCss, label: "bw-circle scene shell", selector: ".sceneShell" },
] as const;

const PILL_RADIUS_CASES = [
  { css: themeToggleCss, label: "theme toggle", selector: ".toggle" },
  { css: pageCurlCss, label: "page curl slider", selector: ".slider" },
  {
    css: pageCurlCss,
    label: "page curl webkit slider thumb",
    selector: ".slider::-webkit-slider-thumb",
  },
  {
    css: pageCurlCss,
    label: "page curl firefox slider thumb",
    selector: ".slider::-moz-range-thumb",
  },
] as const;

describe("semantic radius scale", () => {
  it("defines the semantic radius aliases", () => {
    expect(tokensCss).toContain("--radius-subtle: var(--radius-md);");
    expect(tokensCss).toContain("--radius-soft: var(--radius-lg);");
    expect(tokensCss).toContain("--radius-prominent: var(--radius-xl);");
    expect(tokensCss).toContain("--radius-pill: var(--radius-full);");
  });

  it("uses semantic tokens in the first migration pass", () => {
    for (const testCase of SOFT_RADIUS_CASES) {
      const block = readSelectorBlock(testCase.css, testCase.selector);

      expect(block, `${testCase.label} should use radius soft`).toContain(
        "border-radius: var(--radius-soft);",
      );
    }

    for (const testCase of PROMINENT_RADIUS_CASES) {
      const block = readSelectorBlock(testCase.css, testCase.selector);

      expect(block, `${testCase.label} should use radius prominent`).toContain(
        "border-radius: var(--radius-prominent);",
      );
    }

    for (const testCase of PILL_RADIUS_CASES) {
      const block = readSelectorBlock(testCase.css, testCase.selector);

      expect(block, `${testCase.label} should use radius pill`).toContain(
        "border-radius: var(--radius-pill);",
      );
    }
  });

  it("keeps project detail panes shrinkable for an even split layout", () => {
    const paneBlock = readSelectorBlock(projectDetailCss, ".pane");

    expect(paneBlock).toContain("flex: 1 1 0;");
    expect(paneBlock).toContain("min-width: 0;");
  });

  it("reserves a motion box for staggered text wordmark transitions", () => {
    const wordmarkBlock = readSelectorBlock(staggeredTextCss, ".wordmark");

    expect(wordmarkBlock).toContain("min-height:");
  });

  it("uses a dark stage treatment for staggered text", () => {
    const triggerBlock = readSelectorBlock(staggeredTextCss, ".trigger");

    expect(triggerBlock).toContain("background-color: #05070a;");
  });

  it("uses a bottom-hinged outgoing arm for staggered text", () => {
    const outgoingArmBlock = readSelectorBlock(staggeredTextCss, ".outgoingArm");
    const activeOutgoingArmBlock = readSelectorBlock(
      staggeredTextCss,
      '.trigger[data-active="true"] .outgoingArm',
    );
    const activeOutgoingGlyphBlock = readSelectorBlock(
      staggeredTextCss,
      '.trigger[data-active="true"] .outgoingGlyph',
    );

    expect(outgoingArmBlock).toContain("transform-origin: 50% 88%;");
    expect(activeOutgoingArmBlock).toContain("rotateX(-82deg)");
    expect(activeOutgoingGlyphBlock).toContain("rotateX(18deg)");
  });
});
