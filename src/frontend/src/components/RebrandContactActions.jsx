import { useEffect, useState } from 'react';
import { franchiseKakaoUrl, franchisePhoneHref, franchisePhoneNumber } from '../utils/rebrandContact';
import { trackEvent } from '../utils/tracking';

export const RebrandPhoneLink = ({ className = '', label = '창업 문의', section, callout = false }) => (
  <a className={`rebrand-phone-link ${className}`} href={franchisePhoneHref}
    aria-label={`${label} ${franchisePhoneNumber}, 전화 연결`}
    onClick={() => trackEvent('click_phone', { section })}>
    <span>{callout ? '창업 문의' : label}</span>
    <strong>{franchisePhoneNumber}</strong>
  </a>
);

const RebrandContactActions = () => {
  const [placement, setPlacement] = useState({ top: 92, hidden: true });

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 1024px)');
    const header = document.querySelector('.rebrand-header');
    let frame = 0;

    const isOnScreen = element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
    };
    const measure = () => {
      frame = 0;
      const active = document.activeElement;
      const editing = compactQuery.matches && active?.matches('input, textarea, select, [contenteditable="true"]');
      const videoVisible = [...document.querySelectorAll('.rebrand-owner-stories iframe')].some(isOnScreen);
      const dialogOpen = Boolean(document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]'));
      const top = Math.max(0, header?.getBoundingClientRect().bottom ?? 80) + 12;
      const hidden = Boolean(editing || videoVisible || dialogOpen);
      setPlacement(current => current.top === top && current.hidden === hidden ? current : { top, hidden });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(measure); };
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['open'] });
    const resize = new ResizeObserver(schedule);
    if (header) resize.observe(header);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('focusin', schedule);
    document.addEventListener('focusout', schedule);
    schedule();
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('focusin', schedule);
      document.removeEventListener('focusout', schedule);
    };
  }, []);

  return (
    <a className="rebrand-kakao-float" href={franchiseKakaoUrl} target="_blank" rel="noopener noreferrer"
      aria-label="카카오톡으로 창업 상담하기, 새 창" aria-hidden={placement.hidden} inert={placement.hidden}
      data-hidden={placement.hidden} style={{ '--contact-top': `${placement.top}px` }}
      onClick={() => trackEvent('click_kakao', { section: 'rebrand_floating_contact' })}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 5.2c-4.4 0-8 2.7-8 6.1 0 2.2 1.5 4.1 3.7 5.2l-.7 2.4 3-1.5c.6.1 1.3.2 2 .2 4.4 0 8-2.7 8-6.2s-3.6-6.2-8-6.2Z" />
      </svg>
      <span>카카오톡</span>
    </a>
  );
};

export default RebrandContactActions;
