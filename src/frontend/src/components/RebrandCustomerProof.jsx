import { useRef, useState } from 'react';
import { assetPath } from '../assetPath';
import './RebrandCustomerProof.css';

// Excerpts keep the original wording; one typo was fixed at the owner's request.
// Attribution and source context are recorded in docs/context/customer-reviews.md.
const reviews = [
  { id: 'thin-batter', branch: '잠실점', author: '돌돌**', before: '후라이드는 ', emphasis: '튀김이 얇아서 진짜 바삭해요!!', after: ' 후라이드맛집 인정!', source: '1418123469' },
  { id: 'neighborhood-dinner', branch: '안양비산점', author: '빈스**', before: '단지 안에 이런 치킨집 있으면 ', emphasis: '진짜 행복한 저녁', after: '🍗', source: '2090567902' },
  { id: 'no-sauce', branch: '천안역점', author: '삐삐**', before: '닭장수후라이드 처음 먹어보는데 ', emphasis: '양념없이 먹어도 맛있어요', after: '', source: '2089676023' },
  { id: 'mom-approved', branch: '탕정점', author: '댕댕**', before: '속살은 촉촉하고 담백해서, ', emphasis: '엄마도 한 입 드시고 고개 끄덕끄덕', after: ' 😄', source: '1319306715' },
  { id: 'rare-crisp', branch: '봉명점', author: '낭구**', before: '염지된 후라이드도 드문데 ', emphasis: '바삭하기까지 해서', after: ' 너무 맛있게 잘 먹었어요', source: '1629419116' },
  { id: 'clean-oil', branch: '한솔점', author: '산으**', before: '', emphasis: '깨끗한 기름으로 튀긴 후라이드', after: ' 손으로 짝짝찢어 소금에 찍어 먹으니 맛이나네요', source: '1131300020' },
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
      <h2 id="customer-proof-title">손님들은 왜<br /><em>닭장수를 선택했을까요?</em></h2>
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
          <figcaption>시그니처 후라이드<span className="customer-proof__promise">후라이드는 대충하지 않습니다.</span></figcaption>
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
            <p className="customer-proof__attribution">
              <span className="customer-proof__branch">{review.branch}</span>
              <span>{review.author}</span>
            </p>
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
