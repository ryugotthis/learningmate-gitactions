// Zustand로 에러 상태 관리
import { create } from 'zustand';

// Zustand를 통해 관리할 인증 상태 타입 정의
interface ErrorState {
  errorState: boolean; // 에러 상태
  errorMessage?: string; // 에러 메시지
  setErrorMessage: (message: string) => void; // 에러 설정 함수
  clearErrorState: () => void; // 에러 초기화 함수
}

// Zustand를 사용한 전역 상태 관리
export const useErrorstore = create<ErrorState>((set) => ({
  errorState: false, // 초기 상태는 false
  errorMessage: '',
  setErrorMessage: (message) => set({ errorState: true,errorMessage: message }), // 에러 상태 설정:
  clearErrorState: () => set({ errorState: false, errorMessage: '' }), // 에러 상태 초기화
}));
