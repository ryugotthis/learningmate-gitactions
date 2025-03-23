// Zustand로 인증 상태 관리
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Zustand를 통해 관리할 인증 상태 타입 정의
interface AuthState {
  accessToken: string | null; // JWT Access Token
  isLoggedIn: boolean; // 로그인 상태 여부
  setAccessToken: (token: string) => void; // Access Token 설정 함수
  clearAccessToken: () => void; // Access Token 초기화 함수(로그아웃)
  setIsLoggedIn: (status: boolean) => void; // 로그인 상태를 직접 변경할 수 있는 함수
}

// Zustand를 사용한 전역 상태 관리
// `isLoggedIn`만 `localStorage`에 저장
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null, // 초기 상태는 null
      isLoggedIn: false, // 로그인 상태 추가
      accessName: null, // 닉네임 추가
      setAccessToken: (token) => {
        console.log('✅ accessToken 저장됨:', token);
        set({ accessToken: token, isLoggedIn: !!token }); //  token이 있으면 isLoggedIn = true
      },
      clearAccessToken: () => {
        console.log('🚨 accessToken 초기화됨 (로그아웃)');
        set({ accessToken: null, isLoggedIn: false });
      },

      setIsLoggedIn: (status) => {
        console.log('✅ 로그인 상태 변경:', status);
        set({ isLoggedIn: status });
      },
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key 이름
      partialize: (state) => ({ isLoggedIn: state.isLoggedIn }), // isLoggedIn만 저장
    }
  )
);
// 개발환경에서는 상태를 Debugging하고 실제 배포할 때는 보여지지 않게 하기 위해서는 위처럼 간단하게 분기처리를 통해 설정
// const useStore = create(
//   process.env.NODE_ENV !== 'production' ? devtools(store) : store
// )
