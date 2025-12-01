import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '@/App';
import { ROUTES } from './routes';
import ScrollToTop from '@/shared/lib/ScrollToTop';

// ✅ 📌 페이지 컴포넌트를 동적 import하여 코드 스플리팅 적용
// React.lazy()를 사용하면, 초기 로딩 시 모든 페이지를 한 번에 불러오는 대신,
// 사용자가 해당 경로에 접근할 때만 필요한 JS 파일이 로드됨
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const LecturesForMe = lazy(() => import('@/pages/LecturesForMe'));
const MyActivity = lazy(() => import('@/pages/MyActivity'));
const LecturesForMeDetail = lazy(
  () => import('@/pages/LecturesForMeDetail')
);
const LecturesForMePost = lazy(() => import('@/pages/LecturesForMePost'));
const LectureDetail = lazy(() => import('@/pages/LectureDetail'));
const LecturesForMePut = lazy(() => import('@/pages/LecturesForMePut'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));

// ✅ 📌 Suspense로 비동기 로딩 처리
// React.lazy()를 사용하면 해당 컴포넌트가 비동기로 로드되므로,
// Suspense를 사용하여 로딩 중일 때 표시할 UI를 설정해야 함
export const RouterProvider = () => {
  return (
    <BrowserRouter>
      {/* ✅ 스크롤 위치 초기화 (페이지 이동 시 항상 맨 위로 스크롤) */}
      <ScrollToTop />

      {/* ✅ Suspense를 사용하여 로딩 중일 때 UI를 표시 */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<App />}>
            {/* ✅ 메인 페이지 */}
            <Route path={ROUTES.HOME} element={<HomePage />} />

            {/* ✅ 마이페이지 */}
            <Route path={ROUTES.MY_PAGE} element={<MyPage />} />

            {/* ✅ 강의 상세 페이지 (id 동적 라우팅) */}
            <Route path={ROUTES.LECTURE_DETAIL} element={<LectureDetail />} />

            {/* ✅ 로그인 및 회원가입 페이지 */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

            {/* ✅ 내가 선택한 강의 리스트 */}
            <Route path={ROUTES.LECTURES_FOR_ME} element={<LecturesForMe />} />

            {/* ✅ 특정 강의 상세 페이지 */}
            <Route
              path={ROUTES.LECTURES_FOR_ME_DETAIL}
              element={<LecturesForMeDetail />}
            />

            {/* ✅ 강의 등록 페이지 */}
            <Route
              path={ROUTES.LECTURES_FOR_ME_NEW}
              element={<LecturesForMePost />}
            />

            {/* ✅ 강의 수정 페이지 */}
            <Route
              path={ROUTES.LECTURES_FOR_ME_EDIT}
              element={<LecturesForMePut />}
            />

            {/* ✅ 내가 작성한 활동 페이지 */}
            <Route path={ROUTES.MY_ACTIVITY} element={<MyActivity />} />

            {/* ✅ 404 페이지 (경로가 없을 경우) */}
            <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
