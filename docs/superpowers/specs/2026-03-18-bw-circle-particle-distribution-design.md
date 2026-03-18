# Black & White Circle Particle Distribution Design

## Goal

Push the `bw-circle` canvas closer to SABUM's original by correcting the first-frame particle spawn: the dots should feel balanced across the whole disc, with only a subtle extra clustering near the center of the divider line.

## Scope

- Only the particle system in `src/projects/bw-circle`
- Keep the existing two-ball motion and shell UI intact
- Improve density, spread, and half-balance of the interior dots
- Do not add collision splash particles or restore the `W` / `B` camera buttons in this pass

## Approach

The runtime motion loop can stay close to the source-comparison result. The change is in spawn distribution:

1. Keep two independent swarms and full-disc coverage so the first frame reads balanced across the entire circle.
2. Split the initial spawn into two layers:
   - a larger uniform full-disc layer
   - a smaller divider-center-biased layer
3. Keep the bias soft and localized near the center of the divider so the clustering is visible but not staged.
4. Preserve deterministic seeds so the spawn shape stays testable and stable.
5. Keep the existing runtime particle motion after spawn unless a separate source mismatch is identified.

## File Boundaries

- `src/projects/bw-circle/bwCircleSimulation.ts`
  - fixed particle budget
  - deterministic hybrid particle seeding helper
  - shared particle type definitions
- `src/projects/bw-circle/bwCircleSimulation.test.ts`
  - regression coverage for full-disc coverage plus center-line bias
- `src/projects/bw-circle/BwCircleScene.tsx`
  - use the new particle helper
  - keep particle motion closer to the original half-boundary behavior

## Performance

- Continue using mutable arrays inside the animation loop
- Keep rendering batched by color using a single path per swarm
- Avoid per-frame allocations beyond the existing canvas draw work
- Keep the fixed particle count from the original, but avoid extra runtime work beyond the existing canvas loop

## Testing

- verify the particle budget remains fixed at the original density
- verify the seeded particle swarm is deterministic, bounded by the circle radius, and spans both sides
- verify the initial spawn keeps meaningful coverage away from the center while also increasing density inside a small divider-center band
- re-run the focused `bw-circle` tests, lint, and production build after the scene update
