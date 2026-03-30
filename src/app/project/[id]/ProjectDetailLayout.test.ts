import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

function readStyles() {
  return readFileSync(new URL("./ProjectDetail.module.css", import.meta.url), "utf8");
}

describe("Project detail layout", () => {
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
