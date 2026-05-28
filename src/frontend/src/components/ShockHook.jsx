import './ShockHook.css';
import { assetPath } from '../assetPath';

const ShockHook = () => {
  return (
    <section className="shock-hook-section" aria-labelledby="shock-hook-title">
      <figure className="shock-hook-image">
        <img
          src={assetPath('/images/dakjangsu-packaging-start-queue-original.jpg')}
          alt="매장 안에서 포장 준비와 대기 손님이 함께 보이는 장면"
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
