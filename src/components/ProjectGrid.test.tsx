import type { ComponentPropsWithoutRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import type { Project } from "@/data/projects";
import ProjectGrid from "./ProjectGrid";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: ComponentPropsWithoutRef<"div">) => (
      <div {...props}>{children}</div>
    ),
  },
  useReducedMotion: () => false,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({
    alt,
    className,
    fill,
    priority,
    sizes,
    src,
    unoptimized,
  }: ComponentPropsWithoutRef<"img"> & {
    fill?: boolean;
    priority?: boolean;
    src: string;
    unoptimized?: boolean;
  }) => {
    void fill;
    void priority;
    void sizes;
    void unoptimized;

    return <span aria-label={alt} className={className} data-src={src} />;
  },
}));

const projectBase: Project = {
  id: "sample-project",
  title: "Sample Project",
  description: "Sample description",
  originalImage: "/images/original.png",
  imitationImage: "/images/imitation.png",
};

describe("ProjectGrid", () => {
  it("renders inline author metadata only for projects with reference users", () => {
    const markup = renderToStaticMarkup(
      <ProjectGrid
        projects={[
          {
            ...projectBase,
            id: "with-reference",
            title: "With Reference",
            referenceUser: {
              name: "Jongmin Kim",
              url: "https://blog.cmiscm.com/?page_id=3023",
            },
          },
          {
            ...projectBase,
            id: "without-reference",
            title: "Without Reference",
          },
        ]}
      />,
    );

    expect(markup).toContain("@Jongmin Kim");
    expect(markup).not.toContain("Reference by");
    expect(markup.match(/@Jongmin Kim/g)).toHaveLength(1);
  });
});
