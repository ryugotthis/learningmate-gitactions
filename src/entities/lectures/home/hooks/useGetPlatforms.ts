import { getPlatforms } from '../api/getPlatforms';
import { useQuery } from '@tanstack/react-query';

// ✅ 강의 플랫폼 데이터 훅
export const useGetPlatforms = () => {
  return useQuery({
    queryKey: ['platforms'],
    queryFn: getPlatforms,
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};
