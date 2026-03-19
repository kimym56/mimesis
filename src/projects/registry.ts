import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import type { InteractiveProjectComponent } from "./types";
import WiperTypographyProject from "./wiper-typography/WiperTypographyProject";

const PageCurlProject = dynamic(() => import("./page-curl/PageCurlProject"), {
  loading: () => null,
}) as InteractiveProjectComponent;

const BwCircleProject = dynamic(() => import("./bw-circle/BwCircleProject"), {
  loading: () => null,
}) as InteractiveProjectComponent;

type InteractiveDemoId = NonNullable<Project["interactiveDemo"]>;

export const interactiveProjectRegistry: Record<InteractiveDemoId, InteractiveProjectComponent> = {
  "bw-circle": BwCircleProject,
  "page-curl": PageCurlProject,
  "wiper-typography": WiperTypographyProject as InteractiveProjectComponent,
};
