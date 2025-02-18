import { fetchPlatforms } from '../api/fetchPlatforms';
import { useQuery } from '@tanstack/react-query';

// ✅ React Query 훅
export const useFetchPlatforms = () => {
  return useQuery({
    queryKey: ['platforms'], // ✅ 쿼리 키 (캐싱)
    queryFn: fetchPlatforms, // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지

    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
