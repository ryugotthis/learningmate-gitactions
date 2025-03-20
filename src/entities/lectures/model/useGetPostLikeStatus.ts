import { useAuthStore } from '../../../shared/store/authstore';
import { getPostLikeStatus } from '../api/getPostLikeStatus';
import { useQuery } from '@tanstack/react-query';

// ✅ React Query 훅
export const useGetPostLikeStatus = (postId: number) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['postLikesStatus', postId], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getPostLikeStatus(postId), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    retry: 1, // ✅ 요청 실패 시 한 번만 재시도
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
    enabled: isLoggedIn, // ✅ 로그인한 경우에만 실행
  });
};
