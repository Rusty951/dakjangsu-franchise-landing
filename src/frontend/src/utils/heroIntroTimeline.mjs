// One pass: offers, recruitment, then the same settled offers without rerolling.
export const heroIntroTiming = {
  offerFadeStart: 4050,
  characterStart: 4250,
  returnStart: 8000,
  duration: 8400,
};

export const heroOfferFrames = [
  { offset: 0, opacity: 1 },
  { offset: heroIntroTiming.offerFadeStart / heroIntroTiming.duration, opacity: 1 },
  { offset: heroIntroTiming.characterStart / heroIntroTiming.duration, opacity: 0 },
  { offset: heroIntroTiming.returnStart / heroIntroTiming.duration, opacity: 0 },
  { offset: 1, opacity: 1 },
];

export function heroRecruitmentFrames(delay, duration, rise = 0, easing = 'linear') {
  return [
    { offset: 0, opacity: 0, transform: `translateY(${rise}px)` },
    { offset: delay / heroIntroTiming.duration, opacity: 0, transform: `translateY(${rise}px)`, easing },
    { offset: (delay + duration) / heroIntroTiming.duration, opacity: 1, transform: 'translateY(0)' },
    { offset: heroIntroTiming.returnStart / heroIntroTiming.duration, opacity: 1, transform: 'translateY(0)' },
    { offset: 1, opacity: 0, transform: 'translateY(0)' },
  ];
}
