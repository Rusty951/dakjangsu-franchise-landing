import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import './RebrandOwnerReviews.css';

// Interview excerpts and context are recorded in docs/context/owner-reviews.md.
const stories = [
  {
    id: 'gangnam-segok',
    topic: '먹어본 맛',
    heading: <>다음 날 먹어도<br />맛있어서.</>,
    quote: '너무 맛있어가지고 한번 해봐야 되겠다는 생각을 가지게 된 것 같아요.',
    description: <>지인이 운영하던 매장에서 알게 된 닭장수.<br />다음 날 먹은 후라이드 맛이<br />시작의 계기가 됐습니다.</>,
    branch: '강남세곡점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/gangnam-segok.webp',
    video: 'https://www.youtube.com/watch?v=tYAbjFWqiJU&t=6s',
  },
  {
    id: 'bucheon-jungdong',
    topic: '감당할 수 있는 운영',
    heading: <>이 정도 규모라면<br />혼자서도.</>,
    quote: '이건 나 혼자 해도 되겠다는 생각이 드는 거예요.',
    description: <>넓은 식당의 인건비와 사람 관리가<br />부담이었던 사장님.<br />아담한 매장을 보고 가능성을 봤습니다.</>,
    branch: '부천중동점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/bucheon-jungdong.webp',
    video: 'https://www.youtube.com/watch?v=LtWcQBXPlDo&t=24s',
  },
  {
    id: 'seoul-munjeong',
    topic: '직접 먹고 내린 결정',
    heading: <>먹어보고<br />마음을 정했습니다.</>,
    quote: '근처 세곡점 가서 맛있게 먹고 나서 닭장수를 해야겠다는 결심을 하게 되었습니다.',
    description: <>후라이드가 맛있는 브랜드를 찾다가<br />세곡점에 직접 방문해 먹어본 뒤<br />닭장수를 선택했습니다.</>,
    branch: '서울문정점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/seoul-munjeong.webp',
    video: 'https://www.youtube.com/watch?v=v6ybPKjfPf8&t=24s',
  },
  {
    id: 'seoul-jamsil',
    topic: '운영 후 다시 선택',
    heading: <>두 번째 매장도<br />닭장수로.</>,
    quote: '고객들도 계속 늘어나고 하다 보니까 욕심이 좀 생기더라고요.',
    description: <>첫 매장에서 고객과 단골이 늘어나는<br />경험을 한 뒤,<br />두 번째 매장을 열었습니다.</>,
    branch: '서울잠실점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/seoul-jamsil.webp',
    video: 'https://www.youtube.com/watch?v=E1pr_LIQv-k&t=6s',
  },
];

export default function RebrandOwnerReviews() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.location.hash !== '#rebrand-owner-reviews') return;
    let cancelled = false;
    let firstFrame;
    let secondFrame;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (!cancelled) sectionRef.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
        });
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, []);

  const selectStory = index => {
    const list = listRef.current;
    if (!list) return;
    const target = Math.max(0, Math.min(stories.length - 1, index));
    const cards = list.children;
    list.scrollTo({
      left: cards[target].offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const updateActiveStory = () => {
    const list = listRef.current;
    const start = list.children[0].offsetLeft;
    let closest = 0;
    let distance = Infinity;
    Array.from(list.children).forEach((card, index) => {
      const nextDistance = Math.abs(card.offsetLeft - start - list.scrollLeft);
      if (nextDistance < distance) {
        distance = nextDistance;
        closest = index;
      }
    });
    setActiveIndex(closest);
  };

  const handleKeyDown = event => {
    const list = listRef.current;
    if (list.scrollWidth <= list.clientWidth) return;
    const destinations = {
      ArrowLeft: Math.max(0, activeIndex - 1),
      ArrowRight: Math.min(stories.length - 1, activeIndex + 1),
      Home: 0,
      End: stories.length - 1,
    };
    if (event.key in destinations) {
      event.preventDefault();
      selectStory(destinations[event.key]);
    }
  };

  return <section className="owner-proof" id="rebrand-owner-reviews" ref={sectionRef} aria-labelledby="owner-proof-title">
    <div className="owner-proof__inner">
      <header className="owner-proof__heading">
        <p>실제 점주 인터뷰</p>
        <h2 id="owner-proof-title">사장님들은 왜<br /><em>닭장수를 선택했을까요?</em></h2>
      </header>
      <ul className="owner-proof__cards" id="owner-proof-cards" ref={listRef} role="list" tabIndex={0} aria-label="점주 네 분의 선택 이유" onScroll={updateActiveStory} onKeyDown={handleKeyDown}>
        {stories.map((story, index) => <li className="owner-proof__card" key={story.id}>
          <p className="owner-proof__topic"><span>{String(index + 1).padStart(2, '0')}</span><span>{story.topic}</span></p>
          <h3>{story.heading}</h3>
          <blockquote className="owner-proof__quote" cite={story.video}>“{story.quote}”</blockquote>
          <p className="owner-proof__context">{story.description}</p>
          <div className="owner-proof__byline">
            <img src={assetPath(story.profile)} alt="" width="52" height="52" loading="lazy" decoding="async" />
            <div><span className="owner-proof__branch">{story.branch}</span><a href={story.video} target="_blank" rel="noopener noreferrer" aria-label={`${story.branch} 인터뷰 보기, 새 창`}>인터뷰 보기 <span aria-hidden="true">↗</span></a></div>
          </div>
        </li>)}
      </ul>
      <div className="owner-proof__controls" aria-label="점주 이야기 넘기기">
        <button type="button" aria-label="이전 이야기" aria-controls="owner-proof-cards" disabled={activeIndex === 0} onClick={() => selectStory(activeIndex - 1)}><span aria-hidden="true">←</span></button>
        <div className="owner-proof__dots">
          {stories.map((story, index) => <button key={story.id} type="button" aria-label={`${index + 1}번째 이야기 보기`} aria-controls="owner-proof-cards" aria-current={activeIndex === index ? 'true' : undefined} onClick={() => selectStory(index)}><span aria-hidden="true" /></button>)}
        </div>
        <button type="button" aria-label="다음 이야기" aria-controls="owner-proof-cards" disabled={activeIndex === stories.length - 1} onClick={() => selectStory(activeIndex + 1)}><span aria-hidden="true">→</span></button>
      </div>
      <p className="owner-proof__note">점주 인터뷰에서 발췌한 내용과 요약입니다. 각 점주의 운영 경험입니다.</p>
    </div>
  </section>;
}
