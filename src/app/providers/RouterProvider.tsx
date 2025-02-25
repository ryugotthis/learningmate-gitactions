import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';
import App from '../../App';
import { HomePage } from '../../pages/HomePage';
import { LecturesForMe } from '../../pages/LecturesForMe';
import { MyActivity } from '../../pages/MyActivity';
import { LecturesForMeDetail } from '../../pages/LecturesForMeDetail';
import ScrollToTop from '../../shared/ui/ScrollToTop';
import { LecturesForMePost } from '../../pages/LecturesForMePost';
import { TestTiptap } from '../../pages/TestTiptap/inedx';
import { LectureDetail } from '../../pages/LectureDetail';
import { LecturesForMePut } from '../../pages/LecturesForMePut';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* ✅ 모든 페이지 이동 시 최상단으로 이동 */}
      <Routes>
        {/* 기본 경로를 로그인 페이지로 리다이렉트 */}
        <Route
          path="/"
          element={
            <App>
              <HomePage />
            </App>
          }
        />
        <Route
          path="/lecture-detail/:id"
          element={
            <App>
              <LectureDetail />
            </App>
          }
        />
        <Route
          path="/login"
          element={
            <App>
              <LoginPage />
            </App>
          }
        />
        <Route
          path="/signup"
          element={
            <App>
              <SignupPage />
            </App>
          }
        />
        <Route
          path="/lectures-for-me"
          element={
            <App>
              <LecturesForMe />
            </App>
          }
        />
        {/* 상세 페이지 라우트 추가 */}
        <Route
          path="/lectures-for-me/:id"
          element={
            <App>
              <LecturesForMeDetail />
            </App>
          }
        />
        {/* 날강도 글 등록 라우트 추가 */}
        <Route
          path="/lectures-for-me/new"
          element={
            <App>
              <LecturesForMePost />
            </App>
          }
        />
        <Route
          path="/lectures-for-me/edit/:id"
          element={
            <App>
              <LecturesForMePut />
            </App>
          }
        />
        <Route
          path="/my-activity"
          element={
            <App>
              <MyActivity />
            </App>
          }
        />
        <Route
          path="/test"
          element={
            <App>
              <TestTiptap />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
