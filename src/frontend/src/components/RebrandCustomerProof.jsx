import { useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import './RebrandCustomerProof.css';

// Verbatim excerpts. Branches, dates and source context live in docs/context/customer-reviews.md.
const reviews = [
  { id: 'returning', before: '후라이드 치킨은 ', emphasis: '짱인것같아여', after: ' 진짜 너무 바삭하고 맛있아요~', source: '1111843021' },
  { id: 'old-style-best', before: '', emphasis: '옛날통닭의 최고봉~^^', after: '', source: '1465534943' },
  { id: 'thin-batter', before: '기본 치킨 튀김옷이 ', emphasis: '얇아서 고소담백하니', after: ' 넘 맛있어요!!', source: '1326884566' },
  { id: 'life-chicken', before: '', emphasis: '인생 치킨 등극..!', after: '', context: '간장 순살, 후라이드 닭발을 먹고 남긴 후기', source: '1326884566' },
  { id: 'fried-only', before: '항상 후라이드는 ', emphasis: '여기서만 포장해요.', after: '', source: '1326884566' },
  { id: 'family', before: '튀김 옷이 두껍지 않아서 담백해 ', emphasis: '부모님이 좋아하세요~', after: '', source: '1315902974' },
];

export default function RebrandCustomerProof() {
  const reviewsRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectReview = index => {
    const list = reviewsRef.current;
    if (!list) return;
    const cards = list.children;
    list.scrollTo({
      left: cards[index].offsetLeft - cards[0].offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  const updateActiveReview = () => {
    const list = reviewsRef.current;
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
    const list = reviewsRef.current;
    if (list.scrollWidth <= list.clientWidth) return;
    const destinations = {
      ArrowLeft: Math.max(0, activeIndex - 1),
      ArrowRight: Math.min(reviews.length - 1, activeIndex + 1),
      Home: 0,
      End: reviews.length - 1,
    };
    if (event.key in destinations) {
      event.preventDefault();
      selectReview(destinations[event.key]);
    }
  };

  return <section className="customer-proof" id="rebrand-customer-proof" aria-labelledby="customer-proof-title">
    <div className="customer-proof__inner">
      <h2 id="customer-proof-title">왜 닭장수를 <em>선택할까요?</em></h2>
      <div className="customer-proof__layout">
        <figure className="customer-proof__product">
          <img
            src={assetPath('/rebrand/customer-proof/signature-platter.webp')}
            alt="얇고 바삭한 튀김옷의 닭장수 시그니처 후라이드 한 접시"
            width="1600"
            height="985"
            loading="lazy"
            decoding="async"
          />
          <figcaption>시그니처 후라이드</figcaption>
        </figure>
        <ul
          className="customer-proof__reviews"
          id="customer-proof-reviews"
          ref={reviewsRef}
          role="list"
          tabIndex={0}
          aria-label="고객 후기 6개"
          onScroll={updateActiveReview}
          onKeyDown={handleKeyDown}
        >
          {reviews.map(review => <li key={review.id} className="customer-proof__card">
            <span className="customer-proof__quote" aria-hidden="true">“</span>
            <blockquote cite={`https://m.place.naver.com/restaurant/${review.source}/review/visitor`}>
              {review.before}<strong>{review.emphasis}</strong>{review.after}
            </blockquote>
            {review.context && <p className="customer-proof__context">{review.context}</p>}
          </li>)}
        </ul>
      </div>
      <div className="customer-proof__controls" aria-label="고객 후기 넘기기">
        <button type="button" aria-label="이전 후기" aria-controls="customer-proof-reviews" disabled={activeIndex === 0} onClick={() => selectReview(activeIndex - 1)}>
          <span aria-hidden="true">←</span>
        </button>
        <div className="customer-proof__dots">
          {reviews.map((review, index) => <button
            key={review.id}
            type="button"
            aria-label={`${index + 1}번째 후기 보기`}
            aria-controls="customer-proof-reviews"
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => selectReview(index)}
          ><span aria-hidden="true" /></button>)}
        </div>
        <button type="button" aria-label="다음 후기" aria-controls="customer-proof-reviews" disabled={activeIndex === reviews.length - 1} onClick={() => selectReview(activeIndex + 1)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>;
}
