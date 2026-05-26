import './SuccessScenes.css';

const scenes = [
  {
    id: 'takeout',
    label: '01',
    title: '퇴근길에 들고 가는 포장',
    image: '/images/dakjangsu-scene-takeout-evening.png',
    alt: '저녁 골목에서 포장 봉투를 들고 나오는 손님'
  },
  {
    id: 'weekend',
    label: '02',
    title: '주말 식탁에 다시 올라오는 메뉴',
    image: '/images/dakjangsu-scene-weekend-repeat.png',
    alt: '주말 식탁에서 포장 치킨을 함께 먹는 사람들'
  },
  {
    id: 'regulars',
    label: '03',
    title: '동네에서 기억되는 한 집',
    image: '/images/dakjangsu-scene-neighborhood-regulars.png',
    alt: '저녁 매장 앞에서 포장 치킨을 기다리는 손님들'
  }
];

const SuccessScenes = () => {
  return (
    <section className="success-scenes-section" id="success-scenes" aria-labelledby="success-scenes-title">
      <div className="container">
        <div className="success-scenes-heading">
          <span>다시 사 먹는 장면</span>
          <h2 id="success-scenes-title">맛은<br />장면으로 남습니다.</h2>
        </div>

        <div className="success-scene-list">
          {scenes.map((scene) => (
            <article key={scene.id} className="success-scene-item">
              <figure>
                <img src={scene.image} alt={scene.alt} />
              </figure>
              <span>{scene.label}</span>
              <h3>{scene.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessScenes;
