// App 컴포넌트
import { Outlet } from 'react-router-dom';
import './App.css';
import { useReissue } from './entities/auth/model/useReissue';
import { useAuthStore } from './shared/store/authstore';
import { useEffect } from 'react';
import { useLogout } from './entities/auth/model/useLogout';
const App = ({ children }: { children?: React.ReactNode }) => {
  const { mutateAsync: reissueToken } = useReissue(); // 토큰 갱신 훅
  const { accessToken, isLoggedIn, setIsLoggedIn } = useAuthStore(); // 저장된 토큰, 로그인 상태
  const { mutate: logout } = useLogout();

  // 새로고침시 토큰 재발급 받기
  useEffect(() => {
    const refreshTokenOnLoad = async () => {
      if (!isLoggedIn) return; // 로그인 상태가 아닐 경우 실행 안 함
      if (!accessToken) {
        console.log('🔄 새로고침 감지: accessToken 없음 → 재발급 시도');
        try {
          await reissueToken(); // ✅ mutateAsync() 사용하여 실행
          console.log('✅ accessToken 갱신 완료');
        } catch (error) {
          console.error('🚨 새로고침 시 토큰 갱신 실패, 로그아웃 처리 필요');
          setIsLoggedIn(false); // 로그아웃 상태 변경
          logout(); // 로그아웃 api 실행
        }
      }
    };

    refreshTokenOnLoad();
  }, [accessToken]); // ✅ accessToken이 없을 때 실행

  return (
    <div>
      <main>{children || <Outlet />}</main>
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default App;
