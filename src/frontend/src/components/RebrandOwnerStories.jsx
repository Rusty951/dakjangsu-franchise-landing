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
    title: '“이건 나 혼자 해도 되겠다는 생각이 드는 거예요.”',
    summary: '인건비와 사람 관리 부담을 겪던 부천중동점 점주의 선택 계기입니다.',
    poster: assetPath('/rebrand/owner-posters/source-3d-v1/bucheon-jungdong.webp'),
  },
  {
    id: 'tYAbjFWqiJU',
    branch: '강남세곡점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/gangnam-segok.webp', kind: '3d' },
    topic: '업종 전환',
    title: '“저희는 발주만 하는 시스템이라…”',
    summary: '분식집을 10년 운영한 강남세곡점 점주가 경험한 본사 물류와 발주 방식입니다.',
    poster: assetPath('/rebrand/owner-posters/source-3d-v1/gangnam-segok.webp'),
  },
  {
    id: 'E1pr_LIQv-k',
    branch: '서울잠실점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/seoul-jamsil.webp', kind: '3d' },
    topic: '두 번째 매장',
    title: '“직원들이나 대표님들이 많이 도와주셨어요.”',
    summary: '서울잠실점 점주가 첫 창업 준비에서 받은 도움과 두 번째 출점의 계기를 들려줍니다.',
    poster: assetPath('/rebrand/owner-posters/source-3d-v1/seoul-jamsil.webp'),
  },
  {
    id: 'v6ybPKjfPf8',
    branch: '서울문정점',
    profile: { src: '/rebrand/owner-profiles/3d-v1/seoul-munjeong.webp', kind: '3d' },
    topic: '집에서 출퇴근',
    title: '“저는 여기 1층이 치킨집이고 5층이 저희 집입니다.”',
    summary: '서울문정점 점주가 같은 건물에서 출퇴근하며 매장을 관리하는 이야기입니다.',
    poster: assetPath('/rebrand/owner-posters/source-3d-v1/seoul-munjeong.webp'),
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
      <h2 id="owner-stories-title">먼저 시작한 사장님의<br /><em>이야기를 들어보세요.</em></h2>
      <p>인건비, 업종 전환, 두 번째 매장까지.</p>
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
