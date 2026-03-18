import { describe, expect, it } from "vitest";
import { interactiveProjectRegistry } from "./registry";

describe("interactiveProjectRegistry", () => {
  it("includes the black and white circle renderer", () => {
    expect(interactiveProjectRegistry["bw-circle"]).toBeDefined();
  });
});
