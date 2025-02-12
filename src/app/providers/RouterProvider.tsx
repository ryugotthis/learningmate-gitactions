import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { SignupPage } from '../../pages/SignupPage';
import App from '../../App';
import { HomePage } from '../../pages/HomePage';
import { LecturesForMe } from '../../pages/LecturesForMe';
import { MyActivity } from '../../pages/MyActivity';

export const RouterProvider = () => {
  return (
    <BrowserRouter>
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
        <Route
          path="/my-activity"
          element={
            <App>
              <MyActivity />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
