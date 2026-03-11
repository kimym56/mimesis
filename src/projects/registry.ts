import dynamic from "next/dynamic";
import type { Project } from "@/data/projects";
import type { InteractiveProjectComponent } from "./types";

const PageCurlProject = dynamic(() => import("./page-curl/PageCurlProject"), {
  loading: () => null,
}) as InteractiveProjectComponent;

const WiperTypographyProject = dynamic(
  () => import("./wiper-typography/WiperTypographyProject"),
  { loading: () => null }
) as InteractiveProjectComponent;

type InteractiveDemoId = NonNullable<Project["interactiveDemo"]>;

export const interactiveProjectRegistry: Record<InteractiveDemoId, InteractiveProjectComponent> = {
  "page-curl": PageCurlProject,
  "wiper-typography": WiperTypographyProject,
};
