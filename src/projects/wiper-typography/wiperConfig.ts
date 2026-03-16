export const WIPER_GLYPHS = "TYPOGRH".split("");
export const WIPER_BACKGROUND_COLOR = "#1171b2";
export const WIPER_GLYPH_COLOR = "rgb(255, 255, 255)";
export const WIPER_BAR_COLOR = "rgb(0, 0, 0)";

export const WIPER_GLYPH_SIZE = 50;
export const WIPER_GLYPH_FONT_SIZE = 40;
export const WIPER_GLYPH_TEXT_OFFSET_Y = 15;
export const WIPER_GLYPH_ROTATION_STEP = 0.01;
export const WIPER_GLYPH_SPAWN_Y = -30;

export const WIPER_LINE_WIDTH = 22;
export const WIPER_AUTOPLAY_SPEED = 0.01;
export const WIPER_POINTER_PHASE_MAX_DELTA = 0.012;
export const WIPER_MAX_BAR_DEPTH = 0.18;
export const WIPER_MAX_GLYPH_FIELD_DEPTH = 0.72;
export const WIPER_MAX_STAGE_CAMERA_OFFSET = 0.24;
export const WIPER_3D_GLYPH_EXTRUSION_DEPTH = 16;
export const WIPER_3D_GLYPH_SIDE_COLOR = "#dde7ef";
export const WIPER_STAGE_GLYPH_SCALE_MULTIPLIER = 1.2;
export const WIPER_STAGE_GLYPH_DEPTH_OFFSET = -0.16;
export const WIPER_STAGE_GLYPH_DEPTH_SPREAD = 0.08;
export const WIPER_STAGE_DASHBOARD_COLOR = "#10161d";
export const WIPER_STAGE_TRIM_COLOR = "#1b232b";
export const WIPER_STAGE_GLASS_COLOR = "#a7c8de";
export const WIPER_STAGE_GLASS_OPACITY = 0.14;
export const WIPER_STAGE_EXTERIOR_COLOR = "#0e5c90";
export const WIPER_STAGE_WIPER_ARM_COLOR = "#161b21";
export const WIPER_STAGE_WIPER_BLADE_COLOR = "#090c10";
export const WIPER_MAX_VIEW_YAW = 0.42;
export const WIPER_MAX_VIEW_PITCH = 0.26;
export const WIPER_VIEW_YAW_SENSITIVITY = 1.1;
export const WIPER_VIEW_PITCH_SENSITIVITY = 0.9;
export const WIPER_PARTICLE_FRICTION = 0.93;
export const WIPER_PARTICLE_GRAVITY = 0.1;
export const WIPER_PARTICLE_INITIAL_VELOCITY = 1.4;
export const WIPER_COLLISION_PUSH = 0.4;

export const WIPER_PARTICLE_BUDGET = {
  desktop: 120,
  tablet: 80,
  mobile: 50,
} as const;
