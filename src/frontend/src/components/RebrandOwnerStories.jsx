import { useState } from 'react';
import { assetPath } from '../assetPath';
import './RebrandOwnerStories.css';

// Public video captions/descriptions identify the branches, checked 2026-10-04.
// 3D profile portraits are derived from the same interview's illustrations.
const interviews = [
  {
    id: 'LtWcQBXPlDo',
    branch: '부천중동점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/bucheon-jungdong.webp', kind: '3d' },
    topic: '인건비와 운영',
    title: '인건비 때문에 힘들던 사장님이 닭장수후라이드를 선택한 이유',
    summary: '넓은 매장의 인건비와 사람 관리 부담을 겪은 뒤, 혼자 운영할 수 있겠다고 판단한 계기를 들려줍니다.',
    poster: assetPath('/images/dakjangsu-owner-interview-real.png'),
  },
  {
    id: 'tYAbjFWqiJU',
    branch: '강남세곡점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/gangnam-segok.webp', kind: '3d' },
    topic: '업종 전환',
    title: '분식 10년 점주가 닭장수후라이드를 시작한 이유',
    summary: '분식집을 운영하던 점주가 조리 방법과 발주, 본사 물류를 보고 새 업종을 선택한 경험입니다.',
    poster: 'https://i.ytimg.com/vi/tYAbjFWqiJU/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIF4oPTAP&rs=AOn4CLC__Vw_phnlI4ZxPQ1AjYgxzXg6PQ',
  },
  {
    id: 'E1pr_LIQv-k',
    branch: '서울잠실점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/seoul-jamsil.webp', kind: '3d' },
    topic: '두 번째 매장',
    title: '치킨집 창업 2호점까지 열게 된 이유',
    summary: '첫 매장 준비 때 받았던 도움과, 두 번째 매장을 열게 된 계기를 이야기합니다.',
    poster: 'https://i.ytimg.com/vi/E1pr_LIQv-k/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhyIFYoNjAP&rs=AOn4CLCY3QeCou1hlVP5MsC0z1O8WvePZQ',
  },
  {
    id: 'v6ybPKjfPf8',
    branch: '서울문정점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/seoul-munjeong.webp', kind: '3d' },
    topic: '집에서 출퇴근',
    title: '집에서 출근하는 점주가 닭장수후라이드를 선택한 이유',
    summary: '집과 매장이 같은 건물에 있는 점주의 출퇴근과 직원 관리 경험을 들어봅니다.',
    poster: 'https://i.ytimg.com/vi/v6ybPKjfPf8/hq720.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARhlIGQoVjAP&rs=AOn4CLBmXL4pQE9mFF5akBunBGBJWB9JWg',
  },
];

export default function RebrandOwnerStories() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const interview = interviews[selectedIndex];

  const selectInterview = (index) => {
    if (index === selectedIndex) return;
    setIsPlaying(false);
    setSelectedIndex(index);
  };

  return <section className="rebrand-owner-stories" id="rebrand-owner-stories" aria-labelledby="owner-stories-title">
    <header className="rebrand-owner-heading">
      <p className="rebrand-closing-label">실제 점주 인터뷰</p>
      <h2 id="owner-stories-title">먼저 시작한 사장님들의<br /><em>이야기를 들어보세요.</em></h2>
      <p>인건비부터 업종 전환, 두 번째 매장까지.<br />나와 비슷한 고민이 담긴 인터뷰를 골라보세요.</p>
    </header>

    <div className="rebrand-owner-layout">
      <div className="rebrand-owner-choices" role="group" aria-label="점주 인터뷰 선택">
        {interviews.map((item, index) => <button key={item.id} type="button" aria-pressed={selectedIndex === index} aria-controls="owner-interview-player" onClick={() => selectInterview(index)}>
          <span className={`rebrand-owner-avatar${item.profile.kind === '3d' ? ' rebrand-owner-avatar--3d' : ''}`} aria-hidden="true">
            <img src={assetPath(item.profile.src)} alt="" width={item.profile.kind === '3d' ? 256 : 640} height={item.profile.kind === '3d' ? 256 : 360} loading="lazy" style={item.profile.kind === '3d' ? undefined : {
              '--profile-scale': item.profile.scale,
              '--profile-left': .5 - item.profile.x / 360 * item.profile.scale,
              '--profile-top': .5 - item.profile.y / 360 * item.profile.scale,
            }} />
          </span>
          <span className="rebrand-owner-choice-copy">
            <span className="rebrand-owner-choice-branch">{item.branch} 점주</span>
            <span className="rebrand-owner-choice-topic">{item.topic}</span>
          </span>
        </button>)}
      </div>

      <div className="rebrand-owner-feature">
        <div className="rebrand-owner-video" id="owner-interview-player">
          {isPlaying ? <iframe
            key={interview.id}
            src={`https://www.youtube-nocookie.com/embed/${interview.id}?autoplay=1&rel=0&playsinline=1`}
            title={`${interview.branch} 점주 인터뷰`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          /> : <button className="rebrand-owner-play" type="button" onClick={() => setIsPlaying(true)} aria-label={`${interview.branch} 점주 인터뷰 재생`}>
            <img src={interview.poster} alt="" width="1280" height="720" loading="lazy" />
            <span className="rebrand-owner-play-label"><span aria-hidden="true">▶</span>인터뷰 보기</span>
          </button>}
        </div>
        <div className="rebrand-owner-caption" aria-live="polite">
          <h3>{interview.title}</h3>
          <p>{interview.summary}</p>
          <a href={`https://www.youtube.com/watch?v=${interview.id}`} target="_blank" rel="noopener noreferrer">유튜브에서 보기<span className="sr-only">, 새 창</span></a>
        </div>
      </div>

    </div>

    <p className="rebrand-owner-note">각 영상은 해당 점주의 운영 경험입니다. 운영 방식과 결과는 매장마다 다를 수 있습니다.</p>
    <a className="rebrand-owner-consult" href="#lead-capture">내 조건에 맞는 운영 상담하기</a>
  </section>;
}
