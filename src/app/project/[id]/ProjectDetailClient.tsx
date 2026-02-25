"use client";

import { Project } from "@/data/projects";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetailClient({ project }: { project: Project }) {
    const shouldReduceMotion = useReducedMotion();

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
            <Link href="/" className={styles.backButton} aria-label="Back to Projects">
                <ArrowLeft size={18} aria-hidden="true" />
                <span>Back to Projects</span>
            </Link>

            <div className={styles.splitLayout}>
                {/* Left: Imitation */}
                <motion.div className={styles.pane} {...motionProps(-30)}>
                    <div className={styles.paneHeader}>
                        <span className={styles.label}>My Imitation</span>
                    </div>
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
                </motion.div>

                {/* Right: Original */}
                <motion.div className={styles.pane} {...motionProps(30, 0.1)}>
                    <div className={styles.paneHeader}>
                        <span className={styles.label}>Original Reference</span>
                        <div className={styles.info}>
                            <h1 className={styles.title}>{project.title}</h1>
                            <p className={styles.description}>{project.description}</p>
                        </div>
                    </div>
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
                </motion.div>
            </div>
        </div>
    );
}
