// App 컴포넌트
import { Outlet } from 'react-router-dom';
import './App.css';
import { useReissue } from './entities/auth/model/useReissue';
import { useAuthStore } from './shared/store/authstore';
import { useEffect } from 'react';
import { useLogout } from './entities/auth/model/useLogout';
import { useIsMutating } from '@tanstack/react-query';
const App = () => {
  const { mutateAsync: reissueToken } = useReissue(); // 토큰 갱신 훅
  const { accessToken, isLoggedIn, setIsLoggedIn, isAuthReady, setAuthReady } =
    useAuthStore(); // 저장된 토큰, 로그인 상태
  const { mutate: logout } = useLogout();

  //  현재 ['reissue'] mutation이 돌고 있는지 체크
  const isReissuing =
    useIsMutating({ mutationKey: ['reissue'] }) > 0; // mutation이 얼마나 돌고 있는지 수치로 반환

  // 새로고침시 토큰 재발급 받기
  // 의존성 최소화를 위해 의도적으로 exhaustive-deps 규칙 끔
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const refreshTokenOnLoad = async () => {
      if (!isLoggedIn) {
        // 로그인이 안되어 있는 경우
        setAuthReady(); // 토큰 재발급 필요없으니 허용 상태로
        return; // 토큰 발급 없이 반환
      }
      if (!accessToken && !isReissuing) {
        //  로그인 후 새로고침 감지: accessToken 없음 → 재발급 시도;
        try {
          await reissueToken(); // 토큰 재발급
        } catch (error) {
          console.error('🚨 새로고침 시 토큰 갱신 실패, 로그아웃 처리 필요');
          setIsLoggedIn(false); // 로그아웃 상태 변경
          logout(); // 로그아웃 api 실행
        }
      }
      setAuthReady();
    };

    refreshTokenOnLoad();
  }, [accessToken,isLoggedIn]); 

  // 준비 안 되었으면 아무것도 렌더링하지 않음
  if (!isAuthReady) return <div>Loading...</div>;

  return (
    <div>
      <main><Outlet /></main>
      <footer>
        <p>© 2025 Learningmate app </p>
      </footer>
    </div>
  );
};

export default App;
