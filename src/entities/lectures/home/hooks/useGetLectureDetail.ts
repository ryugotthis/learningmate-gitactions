import { useQuery } from '@tanstack/react-query';
// import { getLectures } from '../api/getLectures';
import { getLectureDetail } from '../api/getLectureDetail';
// import { fetchLectures } from '../api/FetchLectures';

// ✅ React Query 훅
export const useGetLectureDetail = (postId: number) => {
  return useQuery({
    queryKey: ['lecturesDetail', postId], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getLectureDetail(postId), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지

    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
