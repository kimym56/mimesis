"use client";

import { Project } from "@/data/projects";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectGrid.module.css";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className={styles.grid}>
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : index * 0.1 }}
                    className={styles.card}
                >
                    <Link href={`/project/${project.id}`} className={styles.link}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={project.imitationImage}
                                alt={project.title}
                                fill
                                className={styles.image}
                                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                                priority={index === 0}
                            />
                        </div>
                        <div className={styles.info}>
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
