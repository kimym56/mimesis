import type { ComponentPropsWithoutRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "@/data/projects";
import ProjectReferenceContent from "./ProjectReferenceContent";

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

describe("ProjectReferenceContent", () => {
  it("renders a preview card instead of an iframe when preview metadata exists", () => {
    const markup = renderToStaticMarkup(
      <ProjectReferenceContent
        project={{
          ...baseProject,
          referencePreview: {
            platform: "threads",
            url: "https://www.threads.com/@byunsabum/post/DTkg4CWkyVS",
            image: "/images/threads-black-white-circle-reference.jpg",
            title: "Sabum Byun on Threads",
            description: "Inspired by the black and white spoon silhouettes.",
          },
        }}
      />,
    );

    expect(markup).toContain("Open on Threads");
    expect(markup).toContain("Sabum Byun on Threads");
    expect(markup).not.toContain("<iframe");
  });
});
