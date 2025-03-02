import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteUpVoteOpinion } from '../api/deleteUpVoteOpinion';

export const useDeleteUpVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (opinionId: number) => deleteUpVoteOpinion(opinionId),
    // onError: (error) => {
    //   console.error('🚨 추천글 삭제 실패2:', error);
    // },

    onMutate: async (opinionId) => {
      await queryClient.cancelQueries({
        queryKey: ['upVoteOpinion', postId],
      });

      const previousUpVoteOpinons = queryClient.getQueriesData({
        queryKey: ['upVoteOpinion', postId],
      });
      queryClient.setQueryData(['upVoteOpinion', postId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((opinion) => opinion.id !== opinionId);
        }
      });
      return { previousUpVoteOpinons };
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 캐시로 롤백
      queryClient.setQueryData(
        ['upVoteOpinion', postId],
        context?.previousUpVoteOpinons
      );
    },

    onSettled: () => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['upVoteOpinion', postId] });
    },
  });
};
