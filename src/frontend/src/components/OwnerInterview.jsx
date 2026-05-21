import './OwnerInterview.css';

const interviewQuotes = [
  {
    quote: '오픈 전에 봐야 할 순서가 분명해졌어요.',
    source: '점주 인터뷰 예시 문구'
  },
  {
    quote: '운영 방식과 지역 조건을 함께 점검할 수 있었습니다.',
    source: '실제 후기 확인 후 교체'
  }
];

const OwnerInterview = () => {
  return (
    <section className="owner-interview-section" id="owner-interview">
      <div className="container">
        <div className="brand-section-heading owner-interview-heading">
          <span>가맹점주 인터뷰</span>
          <h2>결정 전에<br />확인할 장면.</h2>
          <p>창업을 결정하기 전, 실제 운영자가 확인한 준비 과정을 보여줍니다.</p>
        </div>

        <div className="owner-interview-panel">
          <figure className="owner-video-card" aria-label="가맹점주 인터뷰 영상">
            <img
              src="/images/dakjangsu-owner-interview-video-example.png"
              alt="매장 안에서 가맹점주가 인터뷰하는 영상 이미지"
            />
            <span className="owner-video-sample">인터뷰 영상</span>
            <span className="owner-video-duration">90초 구성</span>
            <span className="owner-video-play" aria-hidden="true" />
            <figcaption>
              <span>자막 포함 · 실제 매장 배경</span>
              <strong>창업 전 확인한 준비 과정과 운영 흐름을 짧게 보여줍니다.</strong>
            </figcaption>
          </figure>

          <div className="owner-interview-quotes" aria-label="가맹점주 한 줄 인터뷰">
            {interviewQuotes.map((item) => (
              <blockquote key={item.source}>
                <p>“{item.quote}”</p>
                <cite>{item.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OwnerInterview;
