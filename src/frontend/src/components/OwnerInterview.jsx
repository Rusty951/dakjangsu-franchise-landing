import { useEffect, useRef, useState } from 'react';
import './OwnerInterview.css';
import { assetPath } from '../assetPath';

const OwnerInterview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`owner-interview-section owner-interview-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      id="owner-interview"
      aria-labelledby="owner-interview-title"
      ref={sectionRef}
    >
      <div className="owner-interview-content">
        <div className="owner-interview-heading">
          <span className="owner-interview-label">실제 점주 인터뷰</span>
          <h2 id="owner-interview-title">
            <span>먼저 시작한 점주의 추천은</span>
            <span><em>다음 창업</em>으로 이어졌습니다</span>
          </h2>
        </div>

        <button className="owner-proof-video" type="button" aria-label="점주 인터뷰 영상 보기">
          <img
            src={assetPath('/images/dakjangsu-owner-interview-real.png')}
            alt="닭장수후라이드 점주 인터뷰 장면"
          />
          <span className="owner-proof-play" aria-hidden="true" />
        </button>

        <p className="owner-interview-story">
          <span>닭장수후라이드가 가진</span>
          <span>또 하나의 힘입니다.</span>
        </p>
      </div>
    </section>
  );
};

export default OwnerInterview;
