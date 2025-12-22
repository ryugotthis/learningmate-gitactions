import { getPlatforms } from '../api/getPlatforms';
import { useQuery } from '@tanstack/react-query';

// ✅ 강의 플랫폼 데이터 훅
export const useGetPlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: getPlatforms,
    staleTime: Infinity, // 데이터가 영원히 신선하게 유지
    refetchOnWindowFocus: false,
    retry: false, // 실패 시 재시도 안 함
  });
};
