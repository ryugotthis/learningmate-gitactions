import { useQuery } from '@tanstack/react-query';
import { getUpVoteLikeState } from '../api/getUpVoteLikeState';
import { useAuthStore } from '../../../../../shared/store/authstore';

// ✅ React Query 훅
export const useGetUpVoteLikeState = (opinionId: number) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['upVoteLikeStatus', opinionId], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getUpVoteLikeState(opinionId), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    retry: 1, // ✅ 요청 실패 시 한 번만 재시도
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
    enabled: isLoggedIn, // ✅ 로그인한 경우에만 실행
  });
};
