import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readStyles() {
  return readFileSync(new URL("./ProjectDetail.module.css", import.meta.url), "utf8");
}

describe("Project detail layout", () => {
  it("uses dynamic viewport height for the full-page detail stage", () => {
    const styles = readStyles();

    expect(styles).toContain("min-height: 100dvh;");
    expect(styles).toContain("height: 100dvh;");
  });

  it("centers an embed-specific desktop stage instead of inheriting the iframe viewport", () => {
    const styles = readStyles();

    expect(styles).toContain(':global(html[data-embed="true"]) .pageShell');
    expect(styles).toContain("height: var(--embed-shell-height, auto);");
    expect(styles).toContain("width: var(--embed-stage-width, 1760px);");
    expect(styles).toContain("height: var(--embed-stage-height, 1160px);");
    expect(styles).toContain("transform: scale(var(--embed-stage-scale, 1));");
  });

  it("forces the embed layout into the desktop split-pane rules even under a narrow iframe viewport", () => {
    const styles = readStyles();

    expect(styles).toContain(':global(html[data-embed="true"]) .splitLayout');
    expect(styles).toContain("flex-direction: row;");
    expect(styles).toContain(':global(html[data-embed="true"]) .pane');
    expect(styles).toContain(':global(html[data-embed="true"]) .imageContainer');
    expect(styles).toContain(':global(html[data-embed="true"]) .iframeContainer');
    expect(styles).toContain("height: 100%;");
  });

  it("gives mobile query-driven implementation views a taller first pane than the default 40vh stage", () => {
    const styles = readStyles();

    expect(styles).toContain('.pageShell[data-hide-top-chrome="true"] .pane:first-child');
    expect(styles).toContain("height: 72dvh;");
    expect(styles).toContain('.pageShell[data-hide-top-chrome="true"] .pane:first-child [data-project-id]');
    expect(styles).toContain("flex: 1 1 auto;");
  });

  it("lets stacked mobile panes size to their content", () => {
    const styles = readStyles();

    expect(styles).toContain("flex: 0 0 auto;");
  });

  it("restores equal-height split panes on desktop", () => {
    const styles = readStyles();

    expect(styles).toContain("@media (min-width: 1024px)");
    expect(styles).toContain(".pane");
    expect(styles).toContain("flex: 1 1 0;");
  });
});
