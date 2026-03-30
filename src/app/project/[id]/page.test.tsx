import { describe, expect, it, vi } from "vitest";
import type { ReactElement } from "react";

const notFound = vi.fn(() => {
  throw new Error("notFound");
});

vi.mock("@/data/projects", () => ({
  projects: [
    {
      id: "staggered-text",
      title: "Staggered Text",
      description: "desc",
      imitationImage: "/images/imitation.png",
      interactive: true,
      interactiveDemo: "staggered-text",
      originalImage: "/images/original.png",
    },
  ],
}));

vi.mock("next/navigation", () => ({
  notFound,
}));

vi.mock("./ProjectDetailClient", () => ({
  default: (props: { initialMode?: string; project: { id: string } }) => ({
    props,
    type: "mock-project-detail-client",
  }),
}));

describe("ProjectPage", () => {
  it("passes the mode query param through to the detail client", async () => {
    const { default: ProjectPage } = await import("./page");

    const result = (await ProjectPage({
      params: Promise.resolve({ id: "staggered-text" }),
      searchParams: Promise.resolve({ mode: "button" }),
    })) as ReactElement<{ initialMode?: string }>;

    expect(result.props.initialMode).toBe("button");
  });

  it("passes undefined when mode query param is missing", async () => {
    const { default: ProjectPage } = await import("./page");

    const result = (await ProjectPage({
      params: Promise.resolve({ id: "staggered-text" }),
      searchParams: Promise.resolve({}),
    })) as ReactElement<{ initialMode?: string }>;

    expect(result.props.initialMode).toBeUndefined();
  });
});
