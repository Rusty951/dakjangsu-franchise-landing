import './App.css';
import Hero from './components/Hero';
import ProblemAnswer from './components/ProblemAnswer';
import SuccessScenes from './components/SuccessScenes';
import MenuProof from './components/MenuProof';
import LocalFitQnA from './components/LocalFitQnA';
import OwnerInterview from './components/OwnerInterview';
import FounderFit from './components/FounderFit';
import LeadCapture from './components/LeadCapture';
import SiteFooter from './components/SiteFooter';
import Logo from './components/Logo';
import FloatingActions from './components/FloatingActions';

function App() {
  const handleKakaoConsultation = () => {
    alert("카카오톡 상담 링크는 최종 확정 후 연결합니다.");
  };

  return (
    <div className="landing-app">
      <header className="site-header">
        <Logo />
        <nav className="site-nav" aria-label="페이지 섹션">
          <a href="#answer">브랜드</a>
          <a href="#fried">메뉴</a>
          <a href="#local-fit-qna">지역</a>
          <a href="#founder-fit">창업</a>
          <a href="#lead-capture">상담</a>
        </nav>
      </header>

      <Hero onKakaoClick={handleKakaoConsultation} />
      <ProblemAnswer />
      <SuccessScenes />
      <MenuProof onConsultationClick={handleKakaoConsultation} />
      <LocalFitQnA onLocalConsultClick={handleKakaoConsultation} />
      <OwnerInterview />
      <FounderFit />
      <LeadCapture onKakaoClick={handleKakaoConsultation} />
      <SiteFooter />
      <FloatingActions onKakaoClick={handleKakaoConsultation} />
    </div>
  );
}

export default App;
