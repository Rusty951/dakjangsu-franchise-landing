import './OwnerInterview.css';
import { assetPath } from '../assetPath';

const OwnerInterview = () => {
  return (
    <section className="owner-interview-section" id="owner-interview" aria-labelledby="owner-interview-title">
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
