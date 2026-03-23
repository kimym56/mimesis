# Bw Circle Particle Spread Design

**Goal:** Relax the interior particle clustering in the black-and-white circle slightly while preserving the existing composition and motion profile.

## Context

The current `createBwCircleParticles` distribution mixes a uniform disc fill with a center-line-biased subset. Visually, the biased subset is a bit tighter than the earlier look the user wants to return to.

## Approved Direction

Use the "B" option from the comparison:

- Keep the same full-disc distribution model.
- Keep the same center-line-biased secondary cluster.
- Reduce the biased subset a little so less of the field is concentrated in the center.
- Widen the biased sampling spread slightly so those particles feel more breathable rather than tightly packed.

## Implementation Notes

- Limit changes to `src/projects/bw-circle/bwCircleSimulation.ts` and its tests.
- Preserve determinism for a given seed.
- Preserve the invariant that particles remain inside the circle boundary.
- Add a test that demonstrates the center-line cluster is still present but less dense than before.

## Validation

- Run the targeted simulation test file.
- Run the related scene test file if the simulation change affects render assumptions.
