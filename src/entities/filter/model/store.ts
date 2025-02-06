import { create } from 'zustand';

// ✅ Zustand에서 사용할 상태 타입 정의
interface FilterState {
  filterList: number[]; // ✅ `number[]` 타입의 배열 (필요에 따라 string[] 등으로 변경 가능)
  setFilterList: (filter: number[]) => void; // ✅ `setFilterList`의 매개변수 타입 명시
  clearFilterList: () => void; // ✅ 필터 초기화 함수
}

// ✅ Zustand 상태 생성
export const useFilterList = create<FilterState>((set) => ({
  filterList: [], // 초기 상태: 빈 배열
  setFilterList: (filter) => set({ filterList: filter }), // 상태 업데이트 함수
  clearFilterList: () => set({ filterList: [] }), // 필터 초기화 함수
}));
