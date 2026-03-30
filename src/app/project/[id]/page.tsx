import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const project = projects.find((p) => p.id === resolvedParams.id);
    const initialMode = Array.isArray(resolvedSearchParams?.mode)
      ? resolvedSearchParams.mode[0]
      : resolvedSearchParams?.mode;
    const hideTopChrome = Boolean(
      resolvedSearchParams
      && Object.values(resolvedSearchParams).some((value) =>
        Array.isArray(value) ? value.length > 0 : typeof value === "string",
      ),
    );

    if (!project) {
        notFound();
    }

    return (
      <ProjectDetailClient
        hideTopChrome={hideTopChrome}
        initialMode={initialMode}
        project={project}
      />
    );
}
