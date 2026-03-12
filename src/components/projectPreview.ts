import type { Project, ProjectPreviewMedia } from "../data/projects";

export function getAutoplayPreviewMedia(
  project: Project,
  shouldReduceMotion: boolean,
): ProjectPreviewMedia | undefined {
  if (shouldReduceMotion) {
    return undefined;
  }

  const previewMedia = project.previewMedia;

  if (!previewMedia || previewMedia.type !== "video") {
    return undefined;
  }

  if (previewMedia.sources.length === 0) {
    return undefined;
  }

  return previewMedia;
}
