// useFetchMyDemandLectures

import { useQuery } from '@tanstack/react-query';
import { fetchMyDemandLectures } from '../api/fetchMyDemandLectures';

interface UseFetchLecturesProps {
  page: number;
  size: number;
  sort: string;
}

// ✅ React Query 훅
export const useFetchMyDemandLectures = ({
  page = 0,
  size = 10,
  sort = '',
}: UseFetchLecturesProps) => {
  return useQuery({
    queryKey: ['MyDemandLectures', page, size, sort], // ✅ 쿼리 키 (캐싱)
    queryFn: () => fetchMyDemandLectures({ page, size, sort }), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    retry: 1, // ✅ 요청 실패 시 한 번만 재시도
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
