import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { createDownVoteOpinion } from '../api/createDownVoteOpinion';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}
export const useCreateDownVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: OpinionData }) =>
      createDownVoteOpinion({ postId, data }),
    onMutate: async ({ postId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['downVoteOpinion', postId],
      });

      const previousDownVoteOpinions = queryClient.getQueriesData({
        queryKey: ['downVoteOpinion', postId],
      });
      queryClient.setQueryData(['downVoteOpinion', postId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [...oldData, data];
        }
        return [data];
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
