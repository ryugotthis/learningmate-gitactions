// Zustand로 인증 상태 관리
import { create } from 'zustand';

// Zustand를 통해 관리할 인증 상태 타입 정의
interface AuthState {
  accessToken: string | null; // JWT Access Token
  setAccessToken: (token: string) => void; // Access Token 설정 함수
  clearAccessToken: () => void; // Access Token 초기화 함수
}

// Zustand를 사용한 전역 상태 관리
export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null, // 초기 상태는 null
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
}));
// 개발환경에서는 상태를 Debugging하고 실제 배포할 때는 보여지지 않게 하기 위해서는 위처럼 간단하게 분기처리를 통해 설정
// const useStore = create(
//   process.env.NODE_ENV !== 'production' ? devtools(store) : store
// )
