import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDownVoteOpinion } from '../api/updateDownVoteOpinion';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}
export const useUpdateDownVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      opinionId,
      data,
    }: {
      opinionId: number;
      data: OpinionData;
    }) => updateDownVoteOpinion({ opinionId, data }),
    onMutate: async ({
      opinionId,
      data,
    }: {
      opinionId: number;
      data: OpinionData;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ['downVoteOpinion', postId],
      });

      const previousDownVoteOpinions = queryClient.getQueriesData({
        queryKey: ['downVoteOpinion', postId],
      });
      queryClient.setQueryData(['downVoteOpinion', postId], (oldData: any) => {
        if (!oldData) return oldData;
        if (Array.isArray(oldData)) {
          return oldData.map((opinion: any) =>
            opinion.id === opinionId
              ? { ...opinion, title: data.title, content: data.reason }
              : opinion
          );
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
