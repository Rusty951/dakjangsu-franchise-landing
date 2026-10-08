const rest = { opacity: 1, transform: 'translate(0, 0) scale(1) rotate(0deg)' };

export const chapterMotions = {
  brand: {
    source: '/rebrand/poses/hero-presentation-v1/01-neutral.png',
    duration: 450,
    frames: [{ opacity: 0 }, { opacity: 1 }],
  },
  2: {
    source: '/rebrand/poses/opening-package-v1/03-present.png',
    duration: 1200,
    frames: [{ opacity: 0, transform: 'translate(-24px, 8px) rotate(-2deg)' }, rest],
  },
  4: {
    source: '/rebrand/poses/royalty-zero-v1/03-push.png',
    duration: 700,
    frames: [{ opacity: 0, transform: 'scale(.96)' }, rest],
  },
  6: {
    source: '/rebrand/poses/consultation-invite-v1/03-guide.png',
    duration: 1000,
    frames: [{ opacity: 0, transform: 'translateX(28px)' }, rest],
  },
};
