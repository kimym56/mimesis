import type { Project } from "@/data/projects";
import type { ComponentPropsWithoutRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ProjectDetailClient from "./ProjectDetailClient";

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
    src,
  }: ComponentPropsWithoutRef<"img"> & {
    src: string;
  }) => <span aria-label={alt} className={className} data-src={src} />,
}));

vi.mock("@/projects/registry", () => ({
  interactiveProjectRegistry: {},
}));

vi.mock("./ProjectReferenceContent", () => ({
  default: () => <div>Reference content</div>,
}));

const project: Project = {
  id: "sample-project",
  title: "Sample Project",
  description: "Sample description",
  originalImage: "/images/original.png",
  imitationImage: "/images/imitation.png",
};

describe("ProjectDetailClient", () => {
  it("renders a simple back arrow control before the My Mimesis label", () => {
    const markup = renderToStaticMarkup(
      <ProjectDetailClient project={project} />,
    );

    expect(markup).toContain('aria-label="Back to projects"');
    expect(markup).toContain("My Mimesis");
    expect(markup).not.toContain("Back to Projects");
  });

  it("hides the back arrow and My Mimesis label when query-driven chrome hiding is enabled", () => {
    const anyProject: Project = {
      ...project,
      id: "any-project",
      interactive: true,
    };

    const markup = renderToStaticMarkup(
      <ProjectDetailClient hideTopChrome project={anyProject} />,
    );

    expect(markup).not.toContain('aria-label="Back to projects"');
    expect(markup).not.toContain("My Mimesis");
  });

  it("marks query-driven detail views so mobile sizing can prioritize the implementation pane", () => {
    const markup = renderToStaticMarkup(
      <ProjectDetailClient hideTopChrome initialMode="3d" project={project} />,
    );

    expect(markup).toContain('data-hide-top-chrome="true"');
    expect(markup).toContain("Original Reference");
    expect(markup).not.toContain("My Mimesis");
  });
});
