// The existing 1024x1536 lift drawings place palms at 8% and feet above 95%.
// Use the available screen height instead of a fixed character-height ceiling.
export function fitLiftActor({ maxWidth, handY, bottom }) {
  const height = Math.max(1, Math.min(maxWidth * 1.5, (bottom - handY) / .87));
  return { height, width: height * 2 / 3, top: handY - height * .08 };
}
