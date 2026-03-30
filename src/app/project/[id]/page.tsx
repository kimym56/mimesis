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
  searchParams?: Promise<{ mode?: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const project = projects.find((p) => p.id === resolvedParams.id);
    const initialMode = Array.isArray(resolvedSearchParams?.mode)
      ? resolvedSearchParams.mode[0]
      : resolvedSearchParams?.mode;

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient initialMode={initialMode} project={project} />;
}
