import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import type { InteractiveProjectComponent } from "./types";

const PageCurlProject = dynamic(() => import("./page-curl/PageCurlProject"), {
  ssr: false,
}) as InteractiveProjectComponent;

const WiperTypographyProject = dynamic(
  () => import("./wiper-typography/WiperTypographyProject"),
  { ssr: false }
) as InteractiveProjectComponent;

type InteractiveDemoId = NonNullable<Project["interactiveDemo"]>;

export const interactiveProjectRegistry: Record<InteractiveDemoId, InteractiveProjectComponent> = {
  "page-curl": PageCurlProject,
  "wiper-typography": WiperTypographyProject,
};
