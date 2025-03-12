import { useQuery } from '@tanstack/react-query';
import { getLecturesTitle } from '../api/getLecturesTitle';

// ✅ 강의 상세 정보 훅
export const useGetLectureTitle = (title: string, platform?: string) => {
  return useQuery({
    queryKey: ['lecturesTitle', title, platform], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getLecturesTitle(title, platform), // ✅ API 호출 함수
    // staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    enabled: !!title, //  enabled 옵션으로 입력값이 있을 때만 쿼리 실행

    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
