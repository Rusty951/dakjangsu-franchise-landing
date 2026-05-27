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

function App() {
  const concept =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('concept')
      : null;
  const isPopArtConcept = concept === 'popart';
  const isStreetHeroConcept = concept === 'street';
  const isCharacterHeroConcept = concept === 'character';

  const handleKakaoConsultation = () => {
    alert("카카오톡 상담 링크는 최종 확정 후 연결합니다.");
  };

  if (isPopArtConcept) {
    return (
      <div className="landing-app landing-app--popart">
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
        <SiteFooter />
        <FloatingActions onKakaoClick={handleKakaoConsultation} />
      </div>
    );
  }

  if (isStreetHeroConcept) {
    return <StreetHeroConcept onKakaoClick={handleKakaoConsultation} />;
  }

  if (isCharacterHeroConcept) {
    return (
      <div className="landing-app landing-app--hand-product">
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
        <SiteFooter />
        <FloatingActions onKakaoClick={handleKakaoConsultation} />
      </div>
    );
  }

  return (
    <div className="landing-app">
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
      <SiteFooter />
      <FloatingActions onKakaoClick={handleKakaoConsultation} />
    </div>
  );
}

export default App;
