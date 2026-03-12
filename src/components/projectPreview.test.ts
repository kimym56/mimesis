import { describe, expect, it } from "vitest";
import type { Project } from "../data/projects";
import { getAutoplayPreviewMedia } from "./projectPreview";

const projectBase: Project = {
  id: "sample-project",
  title: "Sample Project",
  description: "Sample description",
  originalImage: "/images/original.png",
  imitationImage: "/images/imitation.png",
};

describe("getAutoplayPreviewMedia", () => {
  it("returns undefined when reduced motion is preferred", () => {
    const preview = getAutoplayPreviewMedia(
      {
        ...projectBase,
        previewMedia: {
          type: "video",
          poster: "/images/imitation.png",
          sources: [{ src: "/videos/sample.mp4", type: "video/mp4" }],
        },
      },
      true,
    );

    expect(preview).toBeUndefined();
  });

  it("returns video preview metadata when available and motion is allowed", () => {
    const preview = getAutoplayPreviewMedia(
      {
        ...projectBase,
        previewMedia: {
          type: "video",
          poster: "/images/imitation.png",
          sources: [{ src: "/videos/sample.mp4", type: "video/mp4" }],
        },
      },
      false,
    );

    expect(preview?.type).toBe("video");
    expect(preview?.sources).toHaveLength(1);
    expect(preview?.sources[0]?.src).toBe("/videos/sample.mp4");
  });

  it("returns undefined when preview metadata is missing", () => {
    const preview = getAutoplayPreviewMedia(projectBase, false);
    expect(preview).toBeUndefined();
  });
});
