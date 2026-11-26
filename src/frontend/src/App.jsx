import RebrandLanding from './components/RebrandLanding';

const kakaoConsultationUrl = import.meta.env.VITE_KAKAO_CONSULTATION_URL;
const socialLinks = {
  youtube:
    import.meta.env.VITE_YOUTUBE_URL ||
    'https://www.youtube.com/@dakjangsu_official',
  blog: import.meta.env.VITE_NAVER_BLOG_URL || 'https://blog.naver.com/dakjangsu_official',
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/dakjangsu_official_/',
  facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/juwanfood',
};

// 주소에 어떤 값이 붙어도 리브랜딩 화면 하나만 보여준다.
function App() {
  const handleKakaoConsultation = () => {
    if (kakaoConsultationUrl && typeof window !== 'undefined') {
      window.open(kakaoConsultationUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (typeof document !== 'undefined') {
      document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  return <RebrandLanding onKakaoClick={handleKakaoConsultation} socialLinks={socialLinks} />;
}

export default App;
