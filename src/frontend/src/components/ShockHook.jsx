import { useEffect, useRef, useState } from 'react';
import './ShockHook.css';
import { assetPath } from '../assetPath';

const ShockHook = () => {
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
      { threshold: 0.28 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`shock-hook-section shock-hook-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      aria-labelledby="shock-hook-title"
      ref={sectionRef}
    >
      <figure className="shock-hook-image">
        <img
          src={assetPath('/images/dakjangsu-packaging-start-queue-original.jpg')}
          alt="매장 안에서 포장 준비와 대기 손님이 함께 보이는 장면"
          width="2400"
          height="1800"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="shock-hook-copy">
        <h2 id="shock-hook-title">
          <span>동네 손님이</span>
          <span>직접 찾아오는 매장</span>
        </h2>
        <p className="shock-hook-answer">
          <strong>
            <span>닭장수의 답은</span>
            <em>포장과 홀 서비스</em>
          </strong>
          <span className="shock-hook-proof">
            테이크아웃으로 시작한 닭장수는<br />
            처음부터 동네 손님을 봤습니다.
          </span>
        </p>
      </div>
    </section>
  );
};

export default ShockHook;
