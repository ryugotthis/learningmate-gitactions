import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteDownVoteOpinion } from '../api/deleteDownVoteOpinion';

export const useDeleteDownVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opinionId: number) => deleteDownVoteOpinion(opinionId),
    // onError: (error) => {
    //   console.error('🚨 추천글 삭제 실패2:', error);
    // },

    onMutate: async (opinionId) => {
      await queryClient.cancelQueries({
        queryKey: ['downVoteOpinion', postId],
      });

      const previousDownVoteOpinions = queryClient.getQueriesData({
        queryKey: ['downVoteOpinion', postId],
      });
      queryClient.setQueryData(['downVoteOpinion', postId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((opinion) => opinion.id !== opinionId);
        }
      });
      return { previousDownVoteOpinions };
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 캐시로 롤백
      queryClient.setQueryData(
        ['downVoteOpinion', postId],
        context?.previousDownVoteOpinions
      );
    },

    onSettled: () => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['downVoteOpinion', postId] });
    },
  });
};
