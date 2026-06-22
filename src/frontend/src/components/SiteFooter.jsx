import './SiteFooter.css';
import { trackEvent } from '../utils/tracking';

const socialChannels = [
  {
    id: 'youtube',
    label: '유튜브',
    className: 'youtube',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M28.4 9.7c-.3-1.2-1.3-2.1-2.5-2.4C23.7 6.8 16 6.8 16 6.8s-7.7 0-9.9.5C4.9 7.6 4 8.5 3.6 9.7 3.2 11.9 3.2 16 3.2 16s0 4.1.4 6.3c.4 1.2 1.3 2.1 2.5 2.4 2.2.5 9.9.5 9.9.5s7.7 0 9.9-.5c1.2-.3 2.2-1.2 2.5-2.4.4-2.2.4-6.3.4-6.3s0-4.1-.4-6.3Z" />
        <path className="icon-cutout" d="m13.4 19.8 6.4-3.8-6.4-3.8v7.6Z" />
      </svg>
    )
  },
  {
    id: 'blog',
    label: '블로그',
    className: 'blog',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7.2 7.2h17.6c1.7 0 3 1.3 3 3v10.9c0 1.7-1.3 3-3 3h-6.5L16 28l-2.3-3.9H7.2c-1.7 0-3-1.3-3-3V10.2c0-1.7 1.3-3 3-3Z" />
      </svg>
    )
  },
  {
    id: 'instagram',
    label: '인스타그램',
    className: 'instagram',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="6.3" y="6.3" width="19.4" height="19.4" rx="5.4" />
        <circle className="icon-cutout" cx="16" cy="16" r="5.1" />
        <circle className="icon-dot" cx="21.6" cy="10.5" r="1.5" />
      </svg>
    )
  }
];

const SiteFooter = ({ socialLinks = {}, onPrivacyClick }) => {
  const handleSocialClick = (channelId) => {
    const eventName = {
      instagram: 'click_instagram',
      youtube: 'click_youtube',
      blog: 'click_blog',
    }[channelId];

    if (!eventName) {
      return;
    }

    trackEvent(eventName, { section: 'site_footer', channel: channelId });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-company">
          <div className="footer-company-copy">
            <p className="footer-company-name">주식회사 주완푸드</p>
            <div className="footer-company-info">
              <p>
                <span>대표번호 : 1588-2287</span>
                <span>팩스 : 02-6954-2217</span>
              </p>
              <p>(04726) 서울특별시 성동구 금호산길 60 3층&nbsp;&nbsp;|&nbsp;&nbsp;대표자 : 송민화</p>
              <p>사업자등록번호 : 646-88-01502</p>
            </div>
            {onPrivacyClick && (
              <button className="footer-policy-link" type="button" onClick={onPrivacyClick}>
                개인정보처리방침
              </button>
            )}
            <p className="footer-copyright">Copyright@2017 dakjangsu all rights reserved</p>
          </div>
          <div className="footer-social" aria-label="공식 채널 아이콘">
            {socialChannels.map((channel) => {
              const href = socialLinks[channel.id];
              const className = `footer-social-icon ${channel.className}`;

              if (!href) {
                return (
                  <span key={channel.label} className={className} role="img" aria-label={channel.label}>
                    {channel.icon}
                  </span>
                );
              }

              return (
                <a
                  key={channel.label}
                  className={className}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${channel.label} 새 창으로 열기`}
                  onClick={() => handleSocialClick(channel.id)}
                >
                  {channel.icon}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
