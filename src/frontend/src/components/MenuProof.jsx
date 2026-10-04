import { useEffect, useRef, useState } from 'react';
import './MenuProof.css';

const MenuProof = () => {
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
      className={`menu-proof-section menu-proof-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      id="fried"
      aria-labelledby="menu-proof-title"
      ref={sectionRef}
    >
      <div className="menu-proof-loop" aria-hidden="true">
        <span className="menu-proof-loop-light menu-proof-loop-light--one" />
        <span className="menu-proof-loop-light menu-proof-loop-light--two" />
        <span className="menu-proof-loop-steam menu-proof-loop-steam--one" />
        <span className="menu-proof-loop-steam menu-proof-loop-steam--two" />
      </div>
      <div className="menu-proof-inner">
        <div className="menu-proof-copy">
          <h2 id="menu-proof-title">
            <span>배달만</span>
            <span>기다리지 않는 <em>치킨집</em></span>
          </h2>

          <p className="menu-proof-lead">
            포장으로 가져가고,<br />
            매장에서는 한잔하고 갑니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuProof;
