import './Logo.css';

const Logo = () => {
  return (
    <a className="brand-logo-link" href="#top" aria-label="닭장수후라이드 홈">
      <img
        className="brand-logo-image"
        src="/brand/dakjangsu-logo-full-color.png"
        alt="닭장수후라이드"
      />
    </a>
  );
};

export default Logo;
