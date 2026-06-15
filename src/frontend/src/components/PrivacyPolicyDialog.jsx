import { useEffect } from 'react';

const privacyPolicySections = [
  {
    title: '1. 개인정보 수집 및 이용 목적',
    items: [
      '창업 상담 신청자 확인 및 상담 연락',
      '희망 지역, 창업 시기, 운영 형태에 따른 상담 준비',
      '문의 내용 확인, 상담 이력 관리, 고충 처리',
      '유입 경로 분석을 통한 랜딩 페이지 및 상담 품질 개선'
    ]
  },
  {
    title: '2. 수집하는 개인정보 항목',
    items: [
      '필수항목: 성함, 연락처, 희망 지역, 개인정보 수집 및 이용 동의 여부',
      '선택항목: 창업 시기, 운영 형태, 통화 가능 시간, 남기실 말',
      '자동 수집 항목: 유입 경로, UTM 정보, 접속 경로, 브라우저 정보, 제출 시각'
    ]
  },
  {
    title: '3. 보유 및 이용 기간',
    items: [
      '상담 신청 정보는 상담 완료 후 3년까지 보관할 수 있습니다.',
      '관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관합니다.',
      '정보주체가 삭제를 요청하거나 처리 목적이 달성된 경우 지체 없이 파기합니다.'
    ]
  },
  {
    title: '4. 제3자 제공 및 처리 위탁',
    items: [
      '수집한 개인정보는 상담 목적 범위 내에서만 이용하며, 법령상 근거 또는 별도 동의 없이 제3자에게 제공하지 않습니다.',
      '리드 저장, 알림 발송, 호스팅 등 운영에 필요한 업무를 외부 서비스에 위탁할 수 있으며, 위탁 시 개인정보 보호 의무를 관리합니다.'
    ]
  },
  {
    title: '5. 정보주체의 권리',
    items: [
      '정보주체는 개인정보 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.',
      '요청은 대표전화 1588-2287 또는 상담 채널을 통해 접수할 수 있으며, 확인 후 지체 없이 처리합니다.'
    ]
  },
  {
    title: '6. 개인정보 파기 및 보호 조치',
    items: [
      '전자적 파일은 복구할 수 없는 방식으로 삭제하고, 출력물은 분쇄 또는 이에 준하는 방식으로 파기합니다.',
      '개인정보 접근 권한 관리, 내부 관리, 보안 점검 등 필요한 보호 조치를 시행합니다.'
    ]
  },
  {
    title: '7. 권익침해 구제 방법',
    items: [
      '개인정보침해신고센터: 국번없이 118',
      '개인정보 분쟁조정위원회: 1833-6972',
      '경찰청 사이버수사국: 국번없이 182'
    ]
  }
];

const PrivacyPolicyDialog = ({ onClose }) => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="privacy-policy-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="privacy-policy-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        <div className="privacy-policy-head">
          <span>개인정보 수집 및 이용 동의</span>
          <h3 id="privacy-policy-title">개인정보 처리방침</h3>
          <p>
            닭장수후라이드 창업 상담 신청을 위해 필요한 최소한의 개인정보를 수집하며,
            상담 목적 범위 안에서만 이용합니다.
          </p>
        </div>

        <div className="privacy-policy-body">
          {privacyPolicySections.map((section) => (
            <article className="privacy-policy-section" key={section.title}>
              <h4>{section.title}</h4>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}

          <p className="privacy-policy-source">
            기존 닭장수후라이드 홈페이지의 창업문의 개인정보 수집 및 이용 동의 구조를 기준으로,
            본 랜딩 페이지 상담 폼 항목에 맞춰 정리했습니다.
          </p>
        </div>

        <button className="privacy-policy-close" type="button" onClick={onClose}>
          확인
        </button>
      </section>
    </div>
  );
};

export default PrivacyPolicyDialog;
