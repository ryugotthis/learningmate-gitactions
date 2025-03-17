import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';
import App from '../../App';
import { HomePage } from '../../pages/HomePage';
import { LecturesForMe } from '../../pages/LecturesForMe';
import { MyActivity } from '../../pages/MyActivity';
import { LecturesForMeDetail } from '../../pages/LecturesForMeDetail';
import ScrollToTop from '../../shared/lib/ScrollToTop';
import { LecturesForMePost } from '../../pages/LecturesForMePost';
import { LectureDetail } from '../../pages/LectureDetail';
import { LecturesForMePut } from '../../pages/LecturesForMePut';
import { MyPage } from '../../pages/MyPage';
import { ErrorPage } from '../../pages/ErrorPage';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/lecture-detail/:id" element={<LectureDetail />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/lectures-for-me" element={<LecturesForMe />} />
          <Route
            path="/lectures-for-me/:id"
            element={<LecturesForMeDetail />}
          />
          <Route path="/lectures-for-me/new" element={<LecturesForMePost />} />
          <Route
            path="/lectures-for-me/edit/:id"
            element={<LecturesForMePut />}
          />
          <Route path="/my-activity" element={<MyActivity />} />
          {/* 매칭되는 경로가 없을 때 ErrorPage 표시 */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
