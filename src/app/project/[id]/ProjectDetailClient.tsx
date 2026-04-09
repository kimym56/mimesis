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

export default function ProjectDetailClient({
  hideTopChrome = false,
  initialMode,
  project,
}: {
  hideTopChrome?: boolean;
  initialMode?: string;
  project: Project;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [interactiveRenderMode, setInteractiveRenderMode] = useState<string>(
    initialMode ?? "2d",
  );
  const InteractiveProject = project.interactiveDemo
    ? interactiveProjectRegistry[project.interactiveDemo]
    : undefined;
  const showWiperModelSource =
    project.id === "wiper-typography" && interactiveRenderMode === "3d-driver";

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const viewport = { once: true, amount: 0.25 };

  const paneMotionProps = (xOffset: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport,
          variants: {
            hidden: { opacity: 0, x: xOffset },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.7,
                ease,
                staggerChildren: 0.12,
              },
            },
          },
        };

  const staggerGroupVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.08,
            staggerChildren: 0.1,
          },
        },
      };

  const staggerItemVariants = shouldReduceMotion
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease,
          },
        },
      };

  return (
    <div className={styles.container}>
      <div className={styles.splitLayout}>
        {/* Left: Imitation */}
        <motion.div className={styles.pane} {...paneMotionProps(-30)}>
          {hideTopChrome ? null : (
            <motion.div
              className={styles.paneHeader}
              variants={staggerGroupVariants}
            >
              <motion.div
                className={styles.paneHeaderRow}
                variants={staggerItemVariants}
              >
                <Link
                  href="/"
                  className={styles.backIconButton}
                  aria-label="Back to projects"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </Link>
                <span className={styles.label}>My Mimesis</span>
              </motion.div>
            </motion.div>
          )}
          <motion.div className={styles.paneBody} variants={staggerItemVariants}>
            {project.interactive ? (
              InteractiveProject ? (
                <InteractiveProject
                  hideControls={hideTopChrome}
                  initialMode={initialMode}
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
        </motion.div>

        {/* Right: Original */}
        <motion.div className={styles.pane} {...paneMotionProps(30)}>
          <motion.div className={styles.paneHeader} variants={staggerGroupVariants}>
            <motion.div variants={staggerItemVariants}>
              <span className={styles.label}>Original Reference</span>
            </motion.div>
            <motion.div className={styles.info} variants={staggerGroupVariants}>
              <motion.div variants={staggerItemVariants}>
                <h1 className={styles.title}>{project.title}</h1>
              </motion.div>
              <motion.div variants={staggerItemVariants}>
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
              </motion.div>
              {showWiperModelSource ? (
                <motion.div variants={staggerItemVariants}>
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
                </motion.div>
              ) : null}
            </motion.div>
          </motion.div>
          <motion.div className={styles.paneBody} variants={staggerItemVariants}>
            <ProjectReferenceContent project={project} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
