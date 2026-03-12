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
});
