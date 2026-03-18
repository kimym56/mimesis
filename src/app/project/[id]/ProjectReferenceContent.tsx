import Image from "next/image";
import type { Project } from "@/data/projects";
import ThreadsReferenceEmbed from "./ThreadsReferenceEmbed";
import styles from "./ProjectDetail.module.css";

function renderReferencePreviewCard(project: Project) {
  if (!project.referencePreview) {
    return null;
  }

  return (
    <div className={styles.referenceCard}>
      <div className={styles.referenceCardImageWrap}>
        <Image
          src={project.referencePreview.image}
          alt={`${project.title} reference preview`}
          fill
          className={styles.referenceCardImage}
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className={styles.referenceCardBody}>
        <span className={styles.referencePlatformLabel}>
          {project.referencePreview.platform}
        </span>
        <h2 className={styles.referenceCardTitle}>
          {project.referencePreview.title}
        </h2>
        <p className={styles.referenceCardDescription}>
          {project.referencePreview.description}
        </p>
        <a
          href={project.referencePreview.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.referenceCardLink}
        >
          Open on Threads
        </a>
      </div>
    </div>
  );
}

export default function ProjectReferenceContent({
  project,
}: {
  project: Project;
}) {
  if (project.referencePreview) {
    const fallback = renderReferencePreviewCard(project);

    if (
      project.referencePreview.platform === "threads" &&
      project.referencePreview.embed === "official" &&
      fallback
    ) {
      return (
        <ThreadsReferenceEmbed
          url={project.referencePreview.url}
          fallback={fallback}
        />
      );
    }

    return fallback;
  }

  if (project.referenceEmbed) {
    return (
      <div className={styles.iframeContainer}>
        <iframe
          src={project.referenceEmbed}
          height="877"
          width="504"
          frameBorder="0"
          allowFullScreen
          title="Original reference"
          className={styles.referenceIframe}
        />
      </div>
    );
  }

  return (
    <div className={styles.imageContainer}>
      <Image
        src={project.originalImage}
        alt={`${project.title} — original reference`}
        fill
        className={styles.image}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
