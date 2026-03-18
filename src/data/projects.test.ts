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
        platform: "threads",
        url: "https://www.threads.com/@byunsabum/post/DTkg4CWkyVS",
      }),
    );
    expect(project?.referencePreview?.image).toBeTruthy();
    expect(project?.referencePreview?.description).toContain(
      "black and white spoon silhouettes",
    );
  });
});
