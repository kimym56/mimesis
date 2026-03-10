import type { ComponentType } from "react";

export interface InteractiveProjectProps {
  projectId: string;
}

export type InteractiveProjectComponent = ComponentType<InteractiveProjectProps>;
