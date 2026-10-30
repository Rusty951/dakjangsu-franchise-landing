import { useEffect, useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import './RebrandOwnerReviews.css';

// Interview excerpts and context are recorded in docs/context/owner-reviews.md.
const stories = [
  {
    id: 'gangnam-segok',
    topic: '지인이 전한 입소문',
    heading: <>지인의 장사가 잘되는 걸 보고,<br />저도 시작했습니다.</>,
    quote: '지인이 먼저 시작을 해서 체인점을 알게 됐고요.',
    branch: '강남세곡점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/gangnam-segok.webp',
    poster: '/rebrand/owner-posters/eo-illustration-v1/gangnam-segok.webp',
    posterLabel: '분식집 10년, 치킨집으로 바꾼 이유',
    video: 'https://www.youtube.com/watch?v=tYAbjFWqiJU&t=6s',
  },
  {
    id: 'bucheon-jungdong',
    topic: '혼자 해볼 만한 운영',
    heading: <>이 정도 규모라면<br />혼자서도 해볼 수 있겠다</>,
    quote: '이건 나 혼자 해도 되겠다는 생각이 드는 거예요.',
    branch: '부천중동점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/bucheon-jungdong.webp',
    poster: '/rebrand/owner-posters/eo-illustration-v1/bucheon-jungdong.webp',
    posterLabel: '이건 혼자서도 하겠는데?',
    video: 'https://www.youtube.com/watch?v=LtWcQBXPlDo&t=24s',
  },
  {
    id: 'seoul-munjeong',
    topic: '잊을 수 없는 후라이드 맛',
    heading: <>직접 먹어보고<br />가맹을 결심한 후라이드</>,
    quote: '근처 세곡점 가서 맛있게 먹고 나서 닭장수를 해야겠다는 결심을 하게 되었습니다.',
    branch: '서울문정점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/seoul-munjeong.webp',
    poster: '/rebrand/owner-posters/eo-illustration-v1/seoul-munjeong.webp',
    posterLabel: '1층은 치킨집, 5층은 우리 집',
    video: 'https://www.youtube.com/watch?v=v6ybPKjfPf8&t=24s',
  },
  {
    id: 'seoul-jamsil',
    topic: '손님이 남긴 고마움',
    heading: <>맛있는 치킨을 팔아줘서<br />고맙다는 손님</>,
    quote: '맛있는 치킨 팔아 주셔서 감사합니다라는 후기를 볼 때가 가장 좋고요.',
    branch: '서울잠실점 점주',
    profile: '/rebrand/owner-profiles/3d-v1/seoul-jamsil.webp',
    poster: '/rebrand/owner-posters/eo-illustration-v1/seoul-jamsil.webp',
    posterLabel: '왜 두 번째도 닭장수였을까?',
    video: 'https://www.youtube.com/watch?v=E1pr_LIQv-k&t=120s',
  },
];

function OwnerInterviewDialog({ story, onClose, openerRef }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const video = new URL(story.video);
  const videoId = video.searchParams.get('v');
  const start = Number.parseInt(video.searchParams.get('t'), 10) || 0;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const opener = openerRef.current;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, [openerRef]);

  return <dialog
    ref={dialogRef}
    className="owner-proof__dialog"
    aria-labelledby="owner-interview-dialog-title"
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
  >
    <div className="owner-proof__dialog-header">
      <h3 id="owner-interview-dialog-title">{story.branch} 인터뷰</h3>
      <button ref={closeRef} className="owner-proof__dialog-close" type="button" onClick={onClose} aria-label="인터뷰 닫기">×</button>
    </div>
    <div className="owner-proof__video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&start=${start}`}
        title={`${story.branch} 인터뷰`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
    <div className="owner-proof__dialog-footer">
      <a href={story.video} target="_blank" rel="noopener noreferrer">유튜브에서 보기 <span aria-hidden="true">↗</span><span className="owner-proof__sr-only">, 새 창</span></a>
    </div>
  </dialog>;
}

export default function RebrandOwnerReviews() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const openerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedStory, setSelectedStory] = useState(null);

  const openInterview = (event, story) => {
    openerRef.current = event.currentTarget;
    setSelectedStory(story);
  };

  useEffect(() => {
    if (!['#rebrand-owner-reviews', '#rebrand-owner-stories'].includes(window.location.hash)) return;
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
    <div className="owner-proof__inner" id="rebrand-owner-stories">
      <header className="owner-proof__heading">
        <p>실제 점주 인터뷰</p>
        <h2 id="owner-proof-title">사장님들은 왜<br /><em>닭장수를 선택했을까요?</em></h2>
      </header>
      <ul className="owner-proof__cards" id="owner-proof-cards" ref={listRef} role="list" tabIndex={0} aria-label="점주 네 분의 선택 이유" onScroll={updateActiveStory} onKeyDown={handleKeyDown}>
        {stories.map((story, index) => <li className="owner-proof__card" key={story.id}>
          <button className="owner-proof__poster" type="button" aria-haspopup="dialog" aria-label={`${story.branch} 인터뷰 보기: ${story.posterLabel}`} onClick={event => openInterview(event, story)}>
            <img src={assetPath(story.poster)} alt="" width="1280" height="720" loading="lazy" decoding="async" />
            <span className="owner-proof__poster-play" aria-hidden="true">▶</span>
          </button>
          <p className="owner-proof__topic"><span>{String(index + 1).padStart(2, '0')}</span><span>{story.topic}</span></p>
          <h3>{story.heading}</h3>
          <blockquote className="owner-proof__quote" cite={story.video}>“{story.quote}”</blockquote>
          <div className="owner-proof__byline">
            <img src={assetPath(story.profile)} alt="" width="52" height="52" loading="lazy" decoding="async" />
            <div><span className="owner-proof__branch">{story.branch}</span><button className="owner-proof__watch" type="button" aria-haspopup="dialog" aria-label={`${story.branch} 인터뷰 보기`} onClick={event => openInterview(event, story)}>인터뷰 보기 <span aria-hidden="true">▶</span></button></div>
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
    </div>
    {selectedStory && <OwnerInterviewDialog story={selectedStory} openerRef={openerRef} onClose={() => setSelectedStory(null)} />}
  </section>;
}
