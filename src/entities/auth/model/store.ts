// Zustand로 에러 상태 관리
import { create } from 'zustand';

// Zustand를 통해 관리할 인증 상태 타입 정의
interface ErrorState {
  errorState: string | null; // 에러 상태
  setErrorState: (token: string) => void; // 에러 설정 함수
  clearErrorState: () => void; // 에러 초기화 함수
}

// Zustand를 사용한 전역 상태 관리
export const useErrorstore = create<ErrorState>((set) => ({
  errorState: null, // 초기 상태는 null
  setErrorState: (error) => set({ errorState: error }),
  clearErrorState: () => set({ errorState: null }),
}));
