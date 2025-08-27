# ⚡️ KaiaPay: Send Stablecoin Like You Send a Text Message - Earn DeFi Yields, No Hassle

<div align="center">
  <img src="public/kaiapay-logo.svg" alt="KaiaPay Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.3.3-646CFF?logo=vite)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![Viem](https://img.shields.io/badge/Viem-2.34.0-000000?logo=ethereum)](https://viem.sh/)
</div>

### 핵심 가치

- **간편한 송금**: 휴대폰 번호, KaiaPay ID, 지갑 주소 등 다양한 방법으로 송금
- **일상 결제 연결**: 암호화폐를 실생활에서 바로 사용 가능
- **보안성**: Privy 인증과 스마트 컨트랙트를 통한 안전한 거래
- **사용자 경험**: 직관적이고 아름다운 모바일 우선 디자인

## 주요 기능

### 송금 서비스

- **링크 공유 송금**: 링크를 통해 간편하게 송금
- **휴대폰 번호 송금**: 전화번호만으로 빠른 송금
- **KaiaPay ID 송금**: 사용자 ID로 즉시 송금
- **지갑 주소 송금**: 직접 지갑 주소 입력으로 송금

### 자금 관리

- **페이머니 충전**: USDT 등 암호화폐를 페이머니로 전환
- **잔액 조회**: 실시간 잔액 및 거래 내역 확인
- **스마트 월렛**: Privy 기반 안전한 지갑 관리

### 특별 기능

- **럭키박스**: 송금 시 랜덤 보상 시스템
- **KaiaPay 카드**: 애플페이, 삼성페이 연동 가상/실물 카드
- **수수료 우대**: KaiaPay 사용자 간 거래 시 수수료 혜택

### 보안 및 인증

- **Privy 인증**: Web3 기반 사용자 인증
- **스마트 컨트랙트**: KaiaChain 기반 안전한 거래
- **지갑 연결**: Kaia 지갑 연동

## 🛠기술 스택

### Frontend

- **React 19.1.0** - 최신 React 기능을 활용한 사용자 인터페이스
- **TypeScript 5.8.3** - 타입 안전성을 보장하는 개발 환경
- **Vite 6.3.3** - 빠른 개발 서버와 빌드 도구
- **Tailwind CSS 4.1.4** - 유틸리티 기반 CSS 프레임워크

### Blockchain & Web3

- **Viem 2.34.0** - Ethereum 타입스크립트 인터페이스
- **Privy 2.21.4** - Web3 사용자 인증 및 지갑 관리
- **KaiaChain** - 한국형 블록체인 네트워크
- **Permissionless** - 계정 추상화 및 스마트 월렛

### 상태 관리 & 데이터

- **TanStack Query 5.85.5** - 서버 상태 관리 및 캐싱
- **React Hook Form 7.62.0** - 폼 상태 관리
- **React Router 7.8.2** - 클라이언트 사이드 라우팅

### 개발 도구

- **Orval** - OpenAPI 스키마 기반 코드 생성
- **ESLint & Prettier** - 코드 품질 및 포맷팅

## 시작하기

### 필수 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn 패키지 매니저
- KaiaChain 네트워크 접근 권한

### 설치 및 실행

1. **저장소 클론**

```bash
git clone https://github.com/your-username/kaiapay-web.git
cd kaiapay-web
```

2. **의존성 설치**

```bash
npm install
```

3. **환경 변수 설정**

```bash
# .env 파일 생성 및 설정
cp .env.example .env
```

4. **개발 서버 실행**

```bash
npm run dev
```

5. **브라우저에서 확인**

```
http://localhost:5173
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 타입 체크
npm run typecheck
```

## 📁 프로젝트 구조

```
kaiapay-web/
├── app/                          # 메인 애플리케이션 코드
│   ├── components/               # 재사용 가능한 컴포넌트
│   │   ├── home/                # 홈 화면 관련 컴포넌트
│   │   ├── fill/                # 충전 관련 컴포넌트
│   │   ├── transactions/        # 거래 내역 관련 컴포넌트
│   │   └── icons/               # 아이콘 컴포넌트
│   ├── routes/                  # 페이지 라우트
│   │   ├── home/                # 홈 화면
│   │   ├── send/                # 송금 화면
│   │   ├── fill/                # 충전 화면
│   │   ├── kaiapay-card/        # 카드 서비스
│   │   └── luckybox/            # 럭키박스 기능
│   ├── hooks/                   # 커스텀 훅
│   ├── contexts/                # React Context
│   ├── stores/                  # 상태 관리 스토어
│   ├── lib/                     # 유틸리티 및 설정
│   └── types/                   # TypeScript 타입 정의
├── public/                      # 정적 자산
├── scripts/                     # 빌드 및 배포 스크립트
└── dist/                        # 빌드 출력 디렉토리
```

## 주요 컴포넌트

### 홈 화면 (Home)

- 잔액 표시 및 통화 선택
- 주요 액션 버튼 (충전, 송금, 받기)
- 최근 거래 내역
- 스마트 월렛 상태 확인

### 송금 시스템 (Send)

- 다양한 송금 방법 제공
- 금액 입력 및 확인
- 수수료 계산 및 표시
- 거래 상태 추적

### 충전 시스템 (Fill)

- Kaia 지갑 연결
- USDT 잔액 확인
- 페이머니 충전 프로세스
- 거래 승인 및 완료

### 럭키박스 (LuckyBox)

- 송금 시 랜덤 보상
- 보상 히스토리
- 사용 방법 안내

## API 및 외부 서비스

### Kaia Chain 통합

- **RPC 엔드포인트**: Kaia Chain 메인넷 연결 (ThirdWeb)
- **스마트 컨트랙트**: USDT 토큰 및 페이머니 시스템
- **가스비 최적화**: Fee Delegation 및 Paymaster (ThirdWeb)

### Privy 인증

- **Web3 로그인**: 다양한 지갑 지원
- **스마트 월렛**: 자동 지갑 생성 및 관리
- **사용자 프로필**: KaiaPay ID 및 설정 관리

## 반응형 디자인

- **모바일 우선**: 모바일 사용자 경험 최적화
- **크로스 플랫폼**: iOS, Android, 웹 브라우저 호환
- **다크 테마**: 눈에 편한 다크 모드 디자인

## 보안 기능

- **Privy 인증**: 안전한 Web3 로그인
- **스마트 컨트랙트 검증**: Kaia Chain 기반 안전한 거래
- **지갑 연결 보안**: Kaia 지갑 보안 표준 준수
- **데이터 암호화**: 민감한 정보 보호

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

---

<div align="center">
  <p>Made with by KaiaPay Team</p>
  <p>Send Stablecoin Like You Send a Text Message - Earn DeFi Yields, No Hassle!</p>
</div>
