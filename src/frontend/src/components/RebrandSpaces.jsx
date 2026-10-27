import { assetPath } from '../assetPath';
import './RebrandSpaces.css';

const views = [
  { id: 'facade', label: '외관', title: '매장 외관 시안', alt: '크림색 외벽과 닭장수후라이드 간판, 유리창 너머로 적주황 벽돌 실내와 후면 주방이 보이는 외관 시안', width: 1536, height: 1024 },
  { id: 'main', label: '18평형', title: '18평형 실내 공간 시안', alt: '적주황 벽돌 벽과 검정 바닥, 원형 스테인리스 테이블과 후면 주방을 배치한 닭장수 18평형 실내 공간 시안', width: 1536, height: 1024 },
];
const source = view => assetPath(`/rebrand/spaces-18p-v2/${view.id}.webp`);

export default function RebrandSpaces() {
  return <section className="rebrand-space-showcase" id="rebrand-operations" aria-labelledby="new-space-title">
    <header className="rebrand-space-showcase-heading">
      <div>
        <p className="rebrand-closing-label">공간 디자인</p>
        <h2 id="new-space-title">닭장수의 <em>공간</em></h2>
      </div>
    </header>
    <div className="rebrand-space-pair">
      {views.map(view => <figure key={view.id} className="rebrand-space-view">
        <div className="rebrand-space-image">
          <img src={source(view)} alt={view.alt} width={view.width} height={view.height} loading="lazy" />
        </div>
        <figcaption><strong>{view.title}</strong></figcaption>
      </figure>)}
    </div>
    <p className="rebrand-space-showcase-note">실제 배치와 마감은 점포 조건에 따라 달라질 수 있습니다.</p>
  </section>;
}
