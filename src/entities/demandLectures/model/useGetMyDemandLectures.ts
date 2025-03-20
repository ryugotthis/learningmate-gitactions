// useFetchMyDemandLectures

import { useQuery } from '@tanstack/react-query';
import { getMyDemandLectures } from '../api/getMyDemandLectures';
import { useAuthStore } from '../../../shared/store/authstore';

interface UseFetchLecturesProps {
  page: number;
  size: number;
  sort: string;
}

// ✅ React Query 훅
export const useGetMyDemandLectures = ({
  page = 0,
  size = 10,
  sort = '',
}: UseFetchLecturesProps) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['MyDemandLectures', page, size, sort], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getMyDemandLectures({ page, size, sort }), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    retry: 1, // ✅ 요청 실패 시 한 번만 재시도
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
    enabled: isLoggedIn, // ✅ 로그인한 경우에만 실행
  });
};
