import './RebrandLanding.css';
import { assetPath } from '../assetPath';
import LeadCapture from './LeadCapture';
import SiteFooter from './SiteFooter';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import { useEffect, useRef, useState } from 'react';
import RebrandScrollStory from './RebrandScrollStory';
import RebrandClosing from './RebrandClosing';
import RebrandContactActions, { RebrandPhoneLink } from './RebrandContactActions';
import { rebrandMetaEntries, rebrandShareMeta } from '../utils/rebrandShareMeta.mjs';
import './RebrandRefinement.css';
import './RebrandImpact.css';
import './JangsuLiftMotion.css';
import './RebrandBenefitReadability.css';
import './RebrandJourney.css';
import './RebrandHeroOffer.css';
import './RebrandEditorial.css';
import './RebrandPortraitStory.css';
import './RebrandLayout.css';
import './RebrandCharacterScale.css';
import './RebrandContactActions.css';

const RebrandLanding = ({ onKakaoClick, socialLinks }) => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const conditionsRef = useRef(null);
  const openConditions = () => { if (conditionsRef.current) conditionsRef.current.open = true; };

  useEffect(() => {
    const previousTitle = document.title;
    const previous = rebrandMetaEntries.map(([attribute, key, content]) => {
      const element = document.querySelector(`meta[${attribute}="${key}"]`);
      const value = element?.getAttribute('content');
      element?.setAttribute('content', content);
      return { element, value };
    });
    document.title = rebrandShareMeta.title;
    return () => {
      document.title = previousTitle;
      previous.forEach(({ element, value }) => {
        if (element && value !== null) element.setAttribute('content', value);
      });
    };
  }, []);

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
          <a href="#rebrand-operations">매장 공간</a>
          <a href="#rebrand-owner-stories">점주 이야기</a>
          <a href="#rebrand-faq">자주 묻는 질문</a>
          <RebrandPhoneLink className="rebrand-header-phone" section="rebrand_header" />
          <a href="#lead-capture" className="rebrand-header-cta">
            <span>창업 상담</span>
          </a>
        </nav>
      </header>

      <main>
        <RebrandScrollStory onConditionsClick={openConditions} />
        <RebrandClosing conditionsRef={conditionsRef} />

        <LeadCapture onKakaoClick={onKakaoClick} rebrandCopy hideKakao />
      </main>

      <SiteFooter socialLinks={socialLinks} onPrivacyClick={() => setIsPrivacyOpen(true)} />
      <RebrandContactActions />
      {isPrivacyOpen && <PrivacyPolicyDialog onClose={() => setIsPrivacyOpen(false)} />}
    </div>
  );
};

export default RebrandLanding;
