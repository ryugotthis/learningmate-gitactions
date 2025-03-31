import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDownVoteLike } from '../api/createDownVoteLike';

export const useCreateDownVoteLike = (postId: number) => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opinionId: number) => createDownVoteLike(opinionId),

    // Optimistic Update: API 요청 전 미리 캐시 업데이트
    // mutation이 실행되기 바로 전에 호출되는 콜백 함수
    onMutate: async (opinionId: number) => {
      // 각 쿼리 캐시 취소 및 이전 상태 저장
      // 데이터를 변경하기 전에 기존 쿼리를 취소 ->  불필요한 데이터 업데이트나 리소스 낭비를 방지

      await queryClient.cancelQueries({
        queryKey: ['downVoteOpinion', postId],
      });
      // postLikesStatus
      await queryClient.cancelQueries({
        queryKey: ['downVoteLikeStatus', opinionId],
      });

      // 기존 상태 스냅샷 저장 (rollback 용)
      // 단일 쿼리일때 getQueryData 여러 쿼리일때 getQueriesData

      const previousDownVoteOpinion = queryClient.getQueriesData({
        queryKey: ['downVoteOpinion', postId],
      });

      const previousDownVoteLikeStatus = queryClient.getQueryData<boolean>([
        'downVoteLikeStatus',
        opinionId,
      ]);

      // Optimistic update: 각 캐시에서 좋아요 수 및 상태 변경 (데이터 구조에 맞게 수정)
      queryClient.setQueryData(['downVoteOpinion', postId], (oldData: any) => {
        if (oldData && Array.isArray(oldData.content)) {
          return {
            ...oldData,
            content: oldData.content.map((opinion: any) =>
              opinion.id === opinionId
                ? { ...opinion, likeCount: opinion.likeCount + 1 }
                : opinion
            ),
          };
        }
        return oldData;
      });

      queryClient.setQueryData(['downVoteLikeStatus', opinionId], true);

      // 롤백을 위한 이전 상태 반환
      return {
        previousDownVoteOpinion,

        previousDownVoteLikeStatus,
      };
    },
    // context는 onMutate의 반환값이 onError의 매개변수
    onError: (err, opinionId, context) => {
      console.log('비추천 좋아요 실패:', err);
      // 에러 발생 시 이전 상태로 롤백

      queryClient.setQueryData(
        ['downVoteOpinion', postId],
        context?.previousDownVoteOpinion
      );

      queryClient.setQueryData(
        ['downVoteLikeStatus', opinionId],
        context?.previousDownVoteLikeStatus
      );
    },
    // mutation이 성공하든 실패하든 무조건 실행되는 콜백 함수
    onSettled: (opinionId) => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({ queryKey: ['downVoteOpinion', postId] });

      queryClient.invalidateQueries({
        queryKey: ['downVoteLikeStatus', opinionId],
      });
    },
  });
};
