import { useEffect, useRef, useState } from 'react';
import './ProblemAnswer.css';

const commissionRate = 0.078;
const paymentRate = 0.03;
const deliveryFee = 3400;

const formatWon = (value) => `${Math.round(value).toLocaleString('ko-KR')}원`;
const formatNumber = (value) => Math.round(value).toLocaleString('ko-KR');
const parseAmount = (value) => Number(value.replace(/[^0-9]/g, '')) || 0;

const problemItems = [
  {
    label: '수수료',
    value: '최대 7.8%',
    description: '상생요금제 상위 구간 기준 중개수수료입니다. 25,000원 주문이면 1,950원입니다.'
  },
  {
    label: '배달비',
    value: '최대 3,400원',
    description: '업주 부담 배달비는 구간에 따라 붙습니다. 수수료와 별도로 계산해야 합니다.'
  },
  {
    label: '광고·쿠폰',
    value: '별도',
    description: '노출을 높이거나 주문을 유도할 때 추가로 검토하게 되는 비용입니다.'
  }
];

const ProblemAnswer = () => {
  const [openItem, setOpenItem] = useState(null);
  const [orderAmount, setOrderAmount] = useState(25000);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const commissionFee = orderAmount * commissionRate;
  const paymentFee = orderAmount * paymentRate;
  const totalFee = commissionFee + deliveryFee + paymentFee;
  const amountMotionKey = Math.round(orderAmount);

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
      { threshold: 0.32 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`story-section story-section--motion-ready${isVisible ? ' is-visible' : ''}`}
      id="answer"
      ref={sectionRef}
    >
      <div className="problem-board">
        <h2 className="problem-headline" aria-label="팔릴 때마다 먼저 빠지는 비용">
          <span className="problem-headline-line problem-headline-line--one">팔릴 때마다</span>
          <span className="problem-headline-line problem-headline-line--two">
            먼저 빠지는 <span className="problem-headline-stamp">비용</span>
          </span>
        </h2>
        <div className="problem-cost-card" aria-label="배달앱 주문에 따라붙는 비용 항목">
          <strong>공개 요금제 기준 비용 계산</strong>
          <label className="problem-cost-input">
            <span>주문금액</span>
            <input
              type="text"
              inputMode="numeric"
              value={formatNumber(orderAmount)}
              onChange={(event) => setOrderAmount(parseAmount(event.target.value))}
              aria-label="주문금액 입력"
            />
            <em>원</em>
          </label>
          <div className="problem-cost-summary" aria-label="공개 요금제 기준 비용 예시">
            <span>
              <em>중개비</em>
              <b className="problem-cost-amount" key={`commission-${amountMotionKey}`}>
                {formatWon(commissionFee)}
              </b>
            </span>
            <span>
              <em>배달비</em>
              <b className="problem-cost-amount problem-cost-amount--steady" key={`delivery-${amountMotionKey}`}>
                {formatWon(deliveryFee)}
              </b>
            </span>
            <span>
              <em>결제대행</em>
              <b className="problem-cost-amount" key={`payment-${amountMotionKey}`}>
                {formatWon(paymentFee)}
              </b>
            </span>
          </div>
          <p className="problem-cost-total">
            공개 요금제 기준, <span>쿠폰과 광고비 전에도</span>
            <strong key={`total-${amountMotionKey}`}>{formatWon(totalFee)}</strong>
            비용으로 먼저 잡힙니다.
          </p>
          <div className="problem-chip-list">
            {problemItems.map((item) => {
              const isOpen = openItem === item.label;

              return (
                <article className="problem-cost-item" key={item.label}>
                  <button
                    className={`problem-cost-row${isOpen ? ' is-open' : ''}`}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenItem(isOpen ? null : item.label)}
                  >
                    <span className="problem-cost-toggle" aria-hidden="true">
                      {isOpen ? '-' : '+'}
                    </span>
                    <span className="problem-cost-label">{item.label}</span>
                    <span className="problem-cost-value">{item.value}</span>
                  </button>
                  {isOpen && <p>{item.description}</p>}
                </article>
              );
            })}
          </div>
          <p className="problem-cost-source">
            출처: 배달플랫폼-입점업체 상생협의체 보도자료(2024.11), 쿠팡이츠 사장님 요금제 정책(2026.4 시행).
            플랫폼, 매출 구간, 지역, 프로모션에 따라 실제 비용은 달라질 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemAnswer;
