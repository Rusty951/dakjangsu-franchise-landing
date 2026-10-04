export const heroGreetingDuration = 2400;

// One closed arm path, with easing only at the beginning and end.
// Keeping one texture removes pose-swap cuts and double-hand crossfades.
export const getHeroGreetingState = (elapsed, pose) => {
  const offset = Math.min(1, Math.max(0, elapsed / heroGreetingDuration));
  const t = offset ** 3 * (offset * (offset * 6 - 15) + 10);
  const rest = 1 - t;
  const reach = 3 * rest * rest * t * .10 + 3 * rest * t * t * .045;
  const height = 3 * rest * rest * t * -.04 + 3 * rest * t * t * .016;
  return {
    from: 4,
    to: 4,
    mix: 0,
    offset,
    points: {
      left: [pose.left[0] + reach, pose.left[1] + height],
      right: [pose.right[0] - reach, pose.right[1] + height],
    },
  };
};
