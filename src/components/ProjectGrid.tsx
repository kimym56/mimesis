"use client";

import { Project } from "@/data/projects";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAutoplayPreviewMedia } from "./projectPreview";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const shouldReduceMotion = useReducedMotion();
  const prefersReducedMotion = shouldReduceMotion ?? false;

  return (
    <div className={styles.grid}>
      {projects.map((project, index) => {
        const previewMedia = getAutoplayPreviewMedia(project, prefersReducedMotion);
        const fallbackImage = project.previewMedia?.poster ?? project.imitationImage;

        return (
          <motion.div
            key={project.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: prefersReducedMotion ? 0 : index * 0.1,
            }}
            className={styles.card}
          >
            <Link href={`/project/${project.id}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                {previewMedia ? (
                  <video
                    className={styles.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={previewMedia.poster}
                    aria-hidden="true"
                  >
                    {previewMedia.sources.map((source) => (
                      <source
                        key={`${source.type}-${source.src}`}
                        src={source.src}
                        type={source.type}
                      />
                    ))}
                  </video>
                ) : (
                  <Image
                    src={fallbackImage}
                    alt={project.title}
                    fill
                    className={styles.media}
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                    priority={index === 0}
                  />
                )}
              </div>
              <div className={styles.info}>
                <div className={styles.titleRow}>
                  <h3 className={styles.title}>{project.title}</h3>
                  {project.referenceUser && (
                    <p className={styles.referenceByline}>
                      @{project.referenceUser.name}
                    </p>
                  )}
                </div>
                <p className={styles.description}>{project.description}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
