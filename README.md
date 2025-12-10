# 🎓 러닝메이트 (LearningMate)

## [🌐 데모 사이트 바로가기](https://learningmate.store)

**러닝메이트**는 추천 평가를 기반으로 나에게 꼭 맞는 강의를 연결해주는 서비스입니다.  
수강자는 다양한 평가를 참고해 강의를 선택하고,  
강사는 수요에 맞는 콘텐츠를 기획할 수 있는 **연결 중심의 서비스**입니다.

---

## 📚 About the Project

**러닝메이트**는 팀 프로젝트로 진행된 강의 추천 플랫폼으로,  
**프론트엔드 구조 설계, 인증, 사용자 경험 개선, 성능 최적화, 자동 배포** 등  
다양한 실무 기술을 적용한 프로젝트입니다.

### 주요 목표

- 사용자가 **강의를 쉽게 탐색·추천**을 쉽게 할 수 있는 직관적 UI 제공
- 실무에서 사용하는 구조(인증, API 분리, 무한스크롤 등)를 직접 설계
- 데이터 흐름·성능·배포까지 고려한 전체 개발 사이클 경험

---

## ✨ Features

- **JWT 인증 및 보안 처리**

  - Axios 인터셉터로 Access Token 자동 포함
  - Access/Refresh Token 기반 자동 재발급 구조 구현
  - Refresh Token은 HttpOnly 쿠키로만 관리해 보안 강화

- **이메일 인증 기능**

  - Firebase Cloud Functions에서 인증 코드 생성·발송
  - Firestore 기반 만료 시간 검증으로 안정적인 이메일 인증 흐름 구현

- **회원가입 & 로그인 유효성 검사**

  - React Hook Form으로 실시간 검증
  - 서버 에러와 클라이언트 검증을 통합한 UX 설계

- **API 역할 분리 & 데이터 관리 구조**

  - custom hook으로 API 호출 로직 분리
  - TanStack Query 기반 상태 관리
    - 낙관적 업데이트
    - 무한 스크롤(Infinite Query)
    - 캐싱·동기화 자동화

- **반응형 웹 구현**

  - Tailwind CSS로 PC / Tablet / Mobile 3단계 반응형 레이아웃 구성

- **자동 배포(CD) 파이프라인**

  - GitHub Actions로 자동 빌드 & S3 업로드
  - CloudFront 캐시 무효화로 즉시 최신 버전 반영
  - AWS S3 + Route 53 + EC2 + CloudFront 환경 구성
  - (참고) CI는 향후 확장 예정이며, 현재는 CD 중심 자동화 구현

- **최적화 작업**
  - Lighthouse 성능 점수 약 40% 향상
  - React.lazy와 Suspense로 페이지 코드 스플리팅
  - 에디터(lazy 컴포넌트) 분리
  - 검색 기능에 디바운스 적용 (0.5s)
  - useCallback로 리렌더링 최소화
  - react-helmet-async로 SEO 메타 태그 설정

---

## 📸 Screenshots

### 강의 페이지(홈 페이지)

![홈](./public/images/pc_Homepage_demo.gif)

### 강의 상세 페이지

![강의상세](./public/images/pc_Homepage2_demo.gif)

### 내 활동 페이지

![내활동](./public/images/pc_MyActivityPage_demo.gif)

### 날.강.도 페이지 (나를 위한 강의 도우미)

![날강도](./public/images/pc_DemandPage_demo.gif)

### 마이페이지 / 회원가입 페이지

![마이_회원가입](./public/images/pc_MyPage_Signup_demo.gif)

### 반응형 디자인

#### 태블릿

![태블릿](./public/images/tabelet_demo.gif)

#### 모바일

![모바일](./public/images/mobile_demo.gif)

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, HTML/CSS
- **State Management:** Zustand, Tanstack Query
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **Deployment:** AWS S3, EC2, Route 53, CloudFront
- **CI/CD:** GitHub Actions
- **Etc:** Swagger, Firebase (이메일 인증), 피그마 협업

---

## 👥 팀 구성 (4인)

- 역할: **프론트엔드 전담**
- 기획자 / 디자이너 / 프론트엔드 개발자 / 백엔드 개발자 협업
- 소통 툴: Notion, Swagger, 피그마

---

## 📅 개발 기간

**2025.01 – 2025.03**
