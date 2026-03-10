"use client";

import { Project } from "@/data/projects";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PageCurlEmbed from "./PageCurlEmbed";
import PageCurlEmbed3D from "./PageCurlEmbed3D";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion();
  const [mode, setMode] = useState<"2d" | "3d">("2d");

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
            <div className={styles.interactivePane}>
              <div className={styles.modeToggle}>
                <button
                  className={`${styles.modeButton} ${mode === "2d" ? styles.modeButtonActive : ""}`}
                  onClick={() => setMode("2d")}
                >
                  2D Canvas
                </button>
                <button
                  className={`${styles.modeButton} ${mode === "3d" ? styles.modeButtonActive : ""}`}
                  onClick={() => setMode("3d")}
                >
                  3D Shader
                </button>
              </div>
              {mode === "2d" ? <PageCurlEmbed /> : <PageCurlEmbed3D />}
            </div>
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
            </div>
          </div>
          {project.referenceEmbed ? (
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
          ) : project.interactive ? (
            <PageCurlEmbed demo />
          ) : (
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
          )}
        </motion.div>
      </div>
    </div>
  );
}
