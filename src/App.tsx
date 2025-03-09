// App 컴포넌트
import './App.css';
import { useReissue } from './entities/auth/hooks/useReissue';
import { useErrorstore } from './entities/auth/model/store';
import { useAuthStore } from './shared/model/store';
import { useEffect } from 'react';
const App = ({ children }: { children: React.ReactNode }) => {
  // const accessToken = useAuthStore((state) => state.accessToken);
  const { mutateAsync: reissueToken } = useReissue(); // ✅ 토큰 갱신 훅
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { accessToken, isLoggedIn } = useAuthStore();

  // 새로고침시 토큰 재발급 받기
  useEffect(() => {
    const refreshTokenOnLoad = async () => {
      console.log('새로고침시 로그인상태', isLoggedIn);
      console.log('새로도침시 accessToken유무', accessToken);
      if (!isLoggedIn) return; // 로그인 상태가 아닐 경우 실행 안 함
      if (!accessToken) {
        console.log('🔄 새로고침 감지: accessToken 없음 → 재발급 시도');
        try {
          await reissueToken(); // ✅ mutateAsync() 사용하여 실행
          console.log('✅ accessToken 갱신 완료');
        } catch (error) {
          console.error('🚨 새로고침 시 토큰 갱신 실패, 로그아웃 처리 필요');
          // setIsLoggedIn(false)
        }
      } else {
        console.log('✅ 새로고침 감지: 기존 accessToken 유지됨', accessToken);
      }
    };

    refreshTokenOnLoad();
  }, [accessToken]); // ✅ accessToken이 없을 때 실행

  return (
    <div>
      <main>{children}</main>
      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
};

export default App;
