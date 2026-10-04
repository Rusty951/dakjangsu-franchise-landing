import { assetPath } from '../assetPath';
import './RebrandSpaces.css';

const views = [
  { id: 'facade', label: '외관', title: '매장 외관 시안', alt: '크림색 외벽과 닭장수후라이드 간판, 상부 조명 세 개와 유리 출입구로 구성한 외관 시안', width: 1800, height: 1200 },
  { id: 'main', label: '25평형', title: '25평형 실내 공간 시안', alt: '적주황 벽돌 벽과 원형 스테인리스 테이블, 열린 주방을 배치한 닭장수 25평형 실내 공간 시안', width: 1536, height: 1024 },
];
const source = view => assetPath(`/rebrand/spaces-approved-v1/${view.id}.webp`);

export default function RebrandSpaces() {
  return <section className="rebrand-space-showcase" id="rebrand-operations" aria-labelledby="new-space-title">
    <header className="rebrand-space-showcase-heading">
      <div>
        <p className="rebrand-closing-label">공간 디자인</p>
        <h2 id="new-space-title">닭장수의 <em>새로운 공간</em></h2>
      </div>
      <p>지금 준비 중인 매장 공간의 <br />디자인 시안입니다.</p>
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
