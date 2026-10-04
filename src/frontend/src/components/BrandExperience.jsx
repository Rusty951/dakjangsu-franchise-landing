import './BrandExperience.css';
import { assetPath } from '../assetPath';

const values = [
  {
    title: '포장 손님',
    image: assetPath('/images/dakjangsu-takeout-mission.png'),
    alt: '포장 박스와 종이봉투가 놓인 후라이드 치킨 테이블',
  },
  {
    title: '동네 단골',
    image: assetPath('/images/dakjangsu-hero-fried.png'),
    alt: '여러 접시에 담긴 후라이드 치킨 테이블',
  },
  {
    title: '팔리는 메뉴',
    image: assetPath('/images/dakjangsu-fried-closeup.png'),
    alt: '바삭한 후라이드 치킨 클로즈업',
  },
  {
    title: '운영 기준',
    image: assetPath('/images/dakjangsu-takeout-mission.png'),
    alt: '깨끗한 테이블 위 포장 치킨 세트',
  },
];

const BrandExperience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <h2>Core Value</h2>
        <div className="experience-grid">
          {values.map((item) => (
            <article className="experience-card" key={item.title}>
              <figure>
                <img src={item.image} alt={item.alt} />
              </figure>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandExperience;
