import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteUpVoteLike } from '../api/deleteUpVoteLike';

export const useDeleteUpVoteLike = (postId: number) => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opinionId: number) => deleteUpVoteLike(opinionId),

    // Optimistic Update: API 요청 전 미리 캐시 업데이트
    // mutation이 실행되기 바로 전에 호출되는 콜백 함수
    onMutate: async (opinionId: number) => {
      // 각 쿼리 캐시 취소 및 이전 상태 저장
      // 데이터를 변경하기 전에 기존 쿼리를 취소 ->  불필요한 데이터 업데이트나 리소스 낭비를 방지

      await queryClient.cancelQueries({
        queryKey: ['upVoteOpinion', postId],
      });
      // postLikesStatus
      await queryClient.cancelQueries({
        queryKey: ['upVoteLikeStatus', opinionId],
      });

      // 기존 상태 스냅샷 저장 (rollback 용)
      // 단일 쿼리일때 getQueryData 여러 쿼리일때 getQueriesData

      const previousUpVoteOpinion = queryClient.getQueriesData({
        queryKey: ['upVoteOpinion', postId],
      });

      const previousUpVoteLikeStatus = queryClient.getQueryData<boolean>([
        'upVoteLikeStatus',
        opinionId,
      ]);

      // Optimistic update: 각 캐시에서 좋아요 수 및 상태 변경 (데이터 구조에 맞게 수정)
      queryClient.setQueryData(['upVoteOpinion', postId], (oldData: any) => {
        console.log('현제 강의 아이디', postId);
        console.log('현재 캐시 데이터:', oldData);
        if (oldData && Array.isArray(oldData.content)) {
          console.log('데이터형태확인', oldData);
          return {
            ...oldData,
            content: oldData.content.map((opinion: any) =>
              opinion.id === opinionId
                ? { ...opinion, likeCount: opinion.likeCount - 1 }
                : opinion
            ),
          };
        }
        return oldData;
      });

      queryClient.setQueryData(['upVoteLikeStatus', opinionId], false);

      // 롤백을 위한 이전 상태 반환
      return {
        previousUpVoteOpinion,

        previousUpVoteLikeStatus,
      };
    },
    // context는 onMutate의 반환값이 onError의 매개변수
    onError: (err, opinionId, context) => {
      // 에러 발생 시 이전 상태로 롤백

      queryClient.setQueryData(
        ['upVoteOpinion', postId],
        context?.previousUpVoteOpinion
      );

      queryClient.setQueryData(
        ['upVoteLikeStatus', opinionId],
        context?.previousUpVoteLikeStatus
      );
    },
    // mutation이 성공하든 실패하든 무조건 실행되는 콜백 함수
    onSettled: (opinionId) => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({ queryKey: ['upVoteOpinion', postId] });

      queryClient.invalidateQueries({
        queryKey: ['upVoteLikeStatus', opinionId],
      });
    },
  });
};
