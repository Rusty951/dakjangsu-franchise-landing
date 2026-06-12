import './App.css';
import Hero from './components/Hero';
import ShockHook from './components/ShockHook';
import ProblemAnswer from './components/ProblemAnswer';
import SuccessScenes from './components/SuccessScenes';
import MenuProof from './components/MenuProof';
import LocalFitQnA from './components/LocalFitQnA';
import OwnerInterview from './components/OwnerInterview';
import FounderFit from './components/FounderFit';
import MenuShowcase from './components/MenuShowcase';
import OwnerVoice from './components/OwnerVoice';
import LeadCapture from './components/LeadCapture';
import SiteFooter from './components/SiteFooter';
import FloatingActions from './components/FloatingActions';
import PopArtConcept from './components/PopArtConcept';
import StreetHeroConcept from './components/StreetHeroConcept';
import CharacterHeroConcept from './components/CharacterHeroConcept';

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
  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const concept = searchParams.get('concept');
  const isPopArtConcept = concept === 'popart';
  const isStreetHeroConcept = concept === 'street';
  const isCharacterHeroConcept = concept === 'character';
  const landingClassName = 'landing-app';

  const handleKakaoConsultation = () => {
    if (kakaoConsultationUrl && typeof window !== 'undefined') {
      window.open(kakaoConsultationUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    alert('카카오톡 상담 링크는 최종 확정 후 연결합니다.');
  };

  if (isPopArtConcept) {
    return (
      <div className={`${landingClassName} landing-app--popart`}>
        <PopArtConcept onKakaoClick={handleKakaoConsultation} />
        <ShockHook />
        <ProblemAnswer />
        <SuccessScenes />
        <MenuProof onConsultationClick={handleKakaoConsultation} />
        <LocalFitQnA onLocalConsultClick={handleKakaoConsultation} />
        <OwnerInterview />
        <FounderFit />
        <MenuShowcase />
        <OwnerVoice />
        <LeadCapture onKakaoClick={handleKakaoConsultation} />
        <SiteFooter socialLinks={socialLinks} />
        <FloatingActions onKakaoClick={handleKakaoConsultation} contactEmail={contactEmail} />
      </div>
    );
  }

  if (isStreetHeroConcept) {
    return <StreetHeroConcept onKakaoClick={handleKakaoConsultation} />;
  }

  if (isCharacterHeroConcept) {
    return (
      <div className={`${landingClassName} landing-app--hand-product`}>
        <CharacterHeroConcept onKakaoClick={handleKakaoConsultation} />
        <ShockHook />
        <ProblemAnswer />
        <SuccessScenes />
        <MenuProof onConsultationClick={handleKakaoConsultation} />
        <LocalFitQnA onLocalConsultClick={handleKakaoConsultation} />
        <FounderFit />
        <MenuShowcase />
        <OwnerVoice />
        <LeadCapture onKakaoClick={handleKakaoConsultation} />
        <SiteFooter socialLinks={socialLinks} />
        <FloatingActions onKakaoClick={handleKakaoConsultation} contactEmail={contactEmail} />
      </div>
    );
  }

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
