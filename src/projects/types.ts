import type { ComponentType } from "react";

export interface InteractiveProjectProps {
  initialMode?: string;
  projectId: string;
  onViewStateChange?: (state: { renderMode?: string }) => void;
}

export type InteractiveProjectComponent =
  ComponentType<InteractiveProjectProps>;
