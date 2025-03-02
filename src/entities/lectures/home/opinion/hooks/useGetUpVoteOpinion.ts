import { useQuery } from '@tanstack/react-query';
import { getUpVoteOpinion } from '../api/getUpVoteOpinion';

// ✅ React Query 훅
export const useGetUpVoteOpinion = (postId: number) => {
  return useQuery({
    queryKey: ['upVoteOpinion', postId], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getUpVoteOpinion(postId), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    retry: 1, // ✅ 요청 실패 시 한 번만 재시도
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
