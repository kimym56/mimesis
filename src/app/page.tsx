import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="container" style={{ padding: "6rem 1.5rem", minHeight: "100vh" }}>
      <header style={{ marginBottom: "4rem" }}>
        <h1 className="title">Mimesis</h1>
        <p className="subtitle">
          A study of visual works and their imitations.
          A UX portfolio exploring what it takes to recreate premium interfaces
          with an eye for minimal, soft aesthetics.
        </p>
      </header>

      <ProjectGrid projects={projects} />
    </main>
  );
}
