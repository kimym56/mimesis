import type { Project } from "@/data/projects";
import type { ComponentPropsWithoutRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import ProjectDetailClient from "./ProjectDetailClient";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      animate,
      children,
      initial,
      transition,
      variants,
      viewport,
      whileInView,
      ...props
    }: ComponentPropsWithoutRef<"div"> & {
      animate?: string;
      initial?: string;
      transition?: { delay?: number };
      variants?: {
        hidden?: object;
        visible?: { transition?: { delayChildren?: number; staggerChildren?: number } };
      };
      viewport?: { amount?: number; once?: boolean };
      whileInView?: string;
    }) => (
      <div
        data-motion-animate={animate}
        data-motion-delay={transition?.delay}
        data-motion-delay-children={variants?.visible?.transition?.delayChildren}
        data-motion-initial={initial}
        data-motion-stagger={variants?.visible?.transition?.staggerChildren}
        data-motion-variant-keys={variants ? Object.keys(variants).join(",") : undefined}
        data-motion-viewport-amount={viewport?.amount}
        data-motion-viewport-once={viewport?.once}
        data-motion-while-in-view={whileInView}
        {...props}
      >
        {children}
      </div>
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
  it("renders viewport-triggered stagger motion wrappers for detail sections", () => {
    const markup = renderToStaticMarkup(
      <ProjectDetailClient project={project} />,
    );

    expect(markup).toContain('data-motion-while-in-view="visible"');
    expect(markup).toContain('data-motion-viewport-once="true"');
    expect(markup).toContain('data-motion-stagger="0.12"');
  });

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
});
