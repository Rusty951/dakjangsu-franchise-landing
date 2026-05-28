import './SuccessScenes.css';
import { assetPath } from '../assetPath';

const SuccessScenes = () => {
  return (
    <section className="success-scenes-section" id="success-scenes" aria-labelledby="success-scenes-title">
      <div className="success-scenes-copy">
        <span>닭장수의 답</span>
        <h2 id="success-scenes-title">
          <span>배달앱이 아니어도</span>
          <span>다시 찾게 만드는</span>
          <span>매장을 만듭니다</span>
        </h2>
      </div>

      <figure className="success-scenes-photo">
        <img
          src={assetPath('/images/dakjangsu-interior-queue-20180727-web.jpg')}
          alt="닭장수후라이드 매장에서 손님들이 주문을 기다리는 모습"
        />
      </figure>
    </section>
  );
};

export default SuccessScenes;
