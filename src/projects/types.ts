import type { ComponentType } from "react";

export interface InteractiveProjectProps {
  projectId: string;
  onViewStateChange?: (state: { renderMode?: string }) => void;
}

export type InteractiveProjectComponent =
  ComponentType<InteractiveProjectProps>;
