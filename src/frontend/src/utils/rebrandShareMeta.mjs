export const rebrandShareMeta = {
  title: '닭장수후라이드 창업 | 내 점포 지원 상담',
  description: '창업 지원 조건, 새로운 매장 공간, 실제 점주 경험을 살펴보세요. 희망 지역과 점포에 맞는 창업 상담을 안내합니다.',
  url: 'https://dakjangsu-client-sample.vercel.app/?concept=rebrand',
  image: 'https://dakjangsu-client-sample.vercel.app/rebrand/share/consultation-v1.png',
  imageAlt: '닭장수 캐릭터와 함께 살펴보는 창업비와 내 점포 지원 상담',
};

export const rebrandMetaEntries = [
  ['name', 'description', rebrandShareMeta.description],
  ['property', 'og:url', rebrandShareMeta.url],
  ['property', 'og:title', rebrandShareMeta.title],
  ['property', 'og:description', rebrandShareMeta.description],
  ['property', 'og:image', rebrandShareMeta.image],
  ['property', 'og:image:secure_url', rebrandShareMeta.image],
  ['property', 'og:image:type', 'image/png'],
  ['property', 'og:image:width', '1200'],
  ['property', 'og:image:height', '630'],
  ['property', 'og:image:alt', rebrandShareMeta.imageAlt],
  ['name', 'twitter:title', rebrandShareMeta.title],
  ['name', 'twitter:description', rebrandShareMeta.description],
  ['name', 'twitter:image', rebrandShareMeta.image],
  ['name', 'twitter:image:alt', rebrandShareMeta.imageAlt],
];

const escapeAttribute = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export const applyRebrandShareMeta = template => {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${rebrandShareMeta.title}</title>`);
  for (const [attribute, key, content] of rebrandMetaEntries) {
    const tag = `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`;
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    html = html.replace(new RegExp(`<meta ${attribute}="${escapedKey}"[^>]*>`), tag);
  }
  return html;
};
