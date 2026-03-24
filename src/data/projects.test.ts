import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects reference embeds", () => {
  it("uses an embeddable YouTube URL for wiper typography", () => {
    const project = projects.find(({ id }) => id === "wiper-typography");

    expect(project).toBeDefined();
    expect(project?.referenceEmbed).toMatch(
      /^https:\/\/www\.youtube\.com\/embed\/[^?]+/,
    );
    expect(project?.referenceEmbed).toContain("start=588");
  });

  it("includes original author attribution for wiper typography", () => {
    const project = projects.find(({ id }) => id === "wiper-typography");

    expect(project).toBeDefined();
    expect(project?.referenceUser).toEqual({
      name: "Jongmin Kim",
      url: "https://blog.cmiscm.com/?page_id=3023",
    });
  });

  it("registers black white circle as an interactive project", () => {
    const project = projects.find(({ id }) => id === "black-white-circle");

    expect(project).toBeDefined();
    expect(project?.interactive).toBe(true);
    expect(project?.interactiveDemo).toBe("bw-circle");
    expect(project?.referencePreview).toEqual(
      expect.objectContaining({
        embed: "official",
        platform: "threads",
        url: "https://www.threads.com/@byunsabum/post/DTkg4CWkyVS",
      }),
    );
    expect(project?.referencePreview?.image).toBeTruthy();
    expect(project?.referencePreview?.description).toContain(
      "black and white spoon silhouettes",
    );
  });

  it("replaces the placeholder creative portfolio with staggered text", () => {
    const removedProject = projects.find(({ id }) => id === "creative-portfolio");
    const project = projects.find(({ id }) => id === "staggered-text");

    expect(removedProject).toBeUndefined();
    expect(project).toBeDefined();
    expect(project?.interactive).toBe(true);
    expect(project?.interactiveDemo).toBe("staggered-text");
    expect(project?.referencePreview).toEqual(
      expect.objectContaining({
        platform: "x",
        url: "https://x.com/raunofreiberg/status/1826969932099104959",
      }),
    );
    expect(project?.referenceUser).toEqual({
      name: "Rauno Freiberg",
      url: "https://x.com/raunofreiberg/status/1826969932099104959",
    });
  });
});
