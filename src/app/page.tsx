import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import Image from "next/image";

export default function Home() {
  return (
    <main className="container home-page">
      <header className="home-header">
        <div className="home-header-copy">
          <h1 className="title">Mimesis</h1>
          <p className="subtitle">
            “The instinct of imitation is implanted in man from childhood.”
            <span className="subtitle-attribution">- Aristotle, Poetics -</span>
          </p>
        </div>

        <div aria-hidden="true" className="home-header-cover">
          <Image
            alt=""
            aria-hidden="true"
            className="home-header-cover-image"
            fill
            priority
            sizes="(max-width: 1230px) calc(100vw - 3rem), 1200px"
            src="/images/mimesis.svg"
            unoptimized
          />
        </div>
      </header>

      <ProjectGrid projects={projects} />
    </main>
  );
}
