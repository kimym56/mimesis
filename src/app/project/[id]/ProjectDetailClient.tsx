"use client";

import { Project } from "@/data/projects";
import { interactiveProjectRegistry } from "@/projects/registry";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./ProjectDetail.module.css";
import ProjectReferenceContent from "./ProjectReferenceContent";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const [interactiveRenderMode, setInteractiveRenderMode] =
    useState<string>("2d");
  const InteractiveProject = project.interactiveDemo
    ? interactiveProjectRegistry[project.interactiveDemo]
    : undefined;
  const showWiperModelSource =
    project.id === "wiper-typography" && interactiveRenderMode === "3d-driver";

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

  const motionProps = (xOffset: number, delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, x: xOffset },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, ease, delay },
        };

  return (
    <div className={styles.container}>
      <Link
        href="/"
        className={styles.backButton}
        aria-label="Back to Projects"
      >
        <ArrowLeft size={18} aria-hidden="true" />
        <span>Back to Projects</span>
      </Link>

      <div className={styles.splitLayout}>
        {/* Left: Imitation */}
        <motion.div className={styles.pane} {...motionProps(-30)}>
          <div className={styles.paneHeader}>
            <span className={styles.label}>My Mimesis</span>
          </div>
          {project.interactive ? (
            InteractiveProject ? (
              <InteractiveProject
                projectId={project.id}
                onViewStateChange={(state) => {
                  if (typeof state.renderMode === "string") {
                    setInteractiveRenderMode(state.renderMode);
                  }
                }}
              />
            ) : (
              <div className={styles.imageContainer}>
                <Image
                  src={project.imitationImage}
                  alt={`${project.title} — imitation recreation`}
                  fill
                  className={styles.image}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            )
          ) : (
            <div className={styles.imageContainer}>
              <Image
                src={project.imitationImage}
                alt={`${project.title} — imitation recreation`}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          )}
        </motion.div>

        {/* Right: Original */}
        <motion.div className={styles.pane} {...motionProps(30, 0.1)}>
          <div className={styles.paneHeader}>
            <span className={styles.label}>Original Reference</span>
            <div className={styles.info}>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.description}>
                {project.description}
                {project.referenceUser && (
                  <>
                    {" "}
                    Reference by{" "}
                    <a
                      href={project.referenceUser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.referenceLink}
                      style={{ textDecoration: "underline", color: "inherit" }}
                    >
                      {project.referenceUser.name}
                    </a>
                    .
                  </>
                )}
              </p>
              {showWiperModelSource ? (
                <p className={styles.referenceMeta}>
                  Model source{" "}
                  <a
                    href="https://sketchfab.com/3d-models/tesla-2018-model-3-5ef9b845aaf44203b6d04e2c677e444f"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.referenceLink}
                    style={{ textDecoration: "underline", color: "inherit" }}
                  >
                    Tesla 2018 Model 3 (Sketchfab)
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </div>
          <ProjectReferenceContent project={project} />
        </motion.div>
      </div>
    </div>
  );
}
