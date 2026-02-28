import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="container home-page">
      <header className="home-header">
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
