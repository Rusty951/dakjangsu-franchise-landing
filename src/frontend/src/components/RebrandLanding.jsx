import './RebrandLanding.css';
import { assetPath } from '../assetPath';
import LeadCapture from './LeadCapture';
import SiteFooter from './SiteFooter';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import { useEffect, useRef, useState } from 'react';
import RebrandScrollStory from './RebrandScrollStory';
import RebrandClosing from './RebrandClosing';
import './RebrandRefinement.css';
import './RebrandImpact.css';
import './JangsuLiftMotion.css';
import './RebrandBenefitReadability.css';
import './RebrandJourney.css';
import './RebrandHeroOffer.css';
import './RebrandEditorial.css';
import './RebrandPortraitStory.css';

const RebrandLanding = ({ onKakaoClick, socialLinks }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const conditionsRef = useRef(null);
  const openConditions = () => { if (conditionsRef.current) conditionsRef.current.open = true; };

  useEffect(() => {
    const revealLinkedConditions = () => {
      if (window.location.hash === '#rebrand-benefits' && conditionsRef.current) {
        conditionsRef.current.open = true;
        conditionsRef.current.scrollIntoView({ block: 'start' });
      }
    };
    revealLinkedConditions();
    window.addEventListener('hashchange', revealLinkedConditions);
    return () => window.removeEventListener('hashchange', revealLinkedConditions);
  }, []);

  return (
    <div className="rebrand-page" id="top">
      <a className="rebrand-skip" href="#rebrand-story">본문 바로가기</a>
      <header className="rebrand-header" data-menu-open={isMenuOpen} onKeyDown={event => {
        if (event.key === 'Escape' && isMenuOpen) {
          setIsMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}>
        <a href="#top" className="rebrand-logo" aria-label="닭장수후라이드 가맹 안내 첫 화면">
          <img src={assetPath('/rebrand/bi-warm-ink.png')} alt="닭장수후라이드 和" width="512" height="128" />
        </a>
        <button ref={menuButtonRef} className="rebrand-menu-toggle" type="button" aria-controls="rebrand-navigation" aria-expanded={isMenuOpen} aria-label={isMenuOpen ? '페이지 메뉴 닫기' : '페이지 메뉴 열기'} onClick={() => setIsMenuOpen(open => !open)}>메뉴</button>
        <nav id="rebrand-navigation" aria-label="페이지 메뉴" onClick={event => {
          if (event.target.closest('a')) setIsMenuOpen(false);
        }}>
          <a href="#rebrand-story">창업 혜택</a>
          <a href="#rebrand-menu">메뉴</a>
          <a href="#rebrand-faq">자주 묻는 질문</a>
          <a href="#lead-capture" className="rebrand-header-cta">창업 상담</a>
        </nav>
      </header>

      <main>
        <RebrandScrollStory onConditionsClick={openConditions} />
        <RebrandClosing conditionsRef={conditionsRef} />

        <LeadCapture onKakaoClick={onKakaoClick} rebrandCopy hideKakao />
      </main>

      <SiteFooter socialLinks={socialLinks} onPrivacyClick={() => setIsPrivacyOpen(true)} />
      {isPrivacyOpen && <PrivacyPolicyDialog onClose={() => setIsPrivacyOpen(false)} />}
    </div>
  );
};

export default RebrandLanding;
