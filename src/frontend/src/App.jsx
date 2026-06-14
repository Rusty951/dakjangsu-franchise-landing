import './App.css';
import Hero from './components/Hero';
import ShockHook from './components/ShockHook';
import ProblemAnswer from './components/ProblemAnswer';
import MenuProof from './components/MenuProof';
import OwnerInterview from './components/OwnerInterview';
import FounderFit from './components/FounderFit';
import MenuShowcase from './components/MenuShowcase';
import LeadCapture from './components/LeadCapture';
import SiteFooter from './components/SiteFooter';
import FloatingActions from './components/FloatingActions';

const kakaoConsultationUrl = import.meta.env.VITE_KAKAO_CONSULTATION_URL;
const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'money8881@hanmail.net';
const socialLinks = {
  youtube:
    import.meta.env.VITE_YOUTUBE_URL ||
    'https://www.youtube.com/@%EB%8B%AD%EC%9E%A5%EC%88%98%ED%9B%84%EB%9D%BC%EC%9D%B4%EB%93%9C',
  blog: import.meta.env.VITE_NAVER_BLOG_URL || 'https://blog.naver.com/dakjangsu78',
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/dakjangsu_official_/'
};

function App() {
  const landingClassName = 'landing-app';

  const handleKakaoConsultation = () => {
    if (kakaoConsultationUrl && typeof window !== 'undefined') {
      window.open(kakaoConsultationUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    alert('카카오톡 상담 링크는 최종 확정 후 연결합니다.');
  };

  return (
    <div className={landingClassName}>
      <div className="opening-flow">
        <Hero onKakaoClick={handleKakaoConsultation} />
        <ProblemAnswer />
      </div>
      <ShockHook />
      <MenuProof onConsultationClick={handleKakaoConsultation} />
      <OwnerInterview />
      <FounderFit />
      <MenuShowcase />
      <LeadCapture onKakaoClick={handleKakaoConsultation} />
      <SiteFooter socialLinks={socialLinks} />
      <FloatingActions onKakaoClick={handleKakaoConsultation} contactEmail={contactEmail} />
    </div>
  );
}

export default App;
