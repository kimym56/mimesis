// @vitest-environment jsdom

import type { ComponentPropsWithoutRef } from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import type { Project } from "@/data/projects";
import ProjectReferenceContent from "./ProjectReferenceContent";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("next/image", () => ({
  default: ({
    alt,
    className,
    fill,
    priority,
    src,
    ...props
  }: ComponentPropsWithoutRef<"img"> & {
    className?: string;
    fill?: boolean;
    priority?: boolean;
    src: string;
  }) => {
    void fill;
    void priority;
    return (
      <span
        aria-label={alt}
        className={className}
        data-src={src}
        {...props}
      />
    );
  },
}));

const baseProject: Project = {
  id: "black-white-circle",
  title: "Black & White Circle",
  description: "Reference description",
  originalImage: "/images/original.png",
  imitationImage: "/images/imitation.png",
};

const threadsProject: Project = {
  ...baseProject,
  referencePreview: {
    embed: "official",
    platform: "threads",
    url: "https://www.threads.com/@byunsabum/post/DTkg4CWkyVS",
    image: "/images/threads-black-white-circle-reference.jpg",
    title: "Sabum Byun on Threads",
    description: "Inspired by the black and white spoon silhouettes.",
  },
};

describe("ProjectReferenceContent", () => {
  let container: HTMLDivElement;
  let root: Root;
  let originalFetch: typeof globalThis.fetch | undefined;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("renders a preview card instead of an iframe when preview metadata exists", () => {
    const markup = renderToStaticMarkup(
      <ProjectReferenceContent project={threadsProject} />,
    );

    expect(markup).toContain("Open on Threads");
    expect(markup).toContain("Sabum Byun on Threads");
    expect(markup).not.toContain("<iframe");
  });

  it("requests the official Threads oEmbed response for opted-in posts", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ html: "<blockquote>Embedded Threads post</blockquote>" }),
    });

    globalThis.fetch = fetchMock as typeof globalThis.fetch;

    await act(async () => {
      root.render(<ProjectReferenceContent project={threadsProject} />);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://graph.threads.net/oembed?url=https%3A%2F%2Fwww.threads.com%2F%40byunsabum%2Fpost%2FDTkg4CWkyVS",
    );
  });

  it("keeps the fallback Threads card visible when oEmbed fails", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("network")) as typeof globalThis.fetch;

    await act(async () => {
      root.render(<ProjectReferenceContent project={threadsProject} />);
    });

    expect(container.textContent).toContain("Open on Threads");
    expect(container.textContent).toContain("Sabum Byun on Threads");
  });
});
