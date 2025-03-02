import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { createDownVoteOpinion } from '../api/createDownVoteOpinion';
import { updateUpVoteOpinion } from '../api/updateUpVoteOpinion';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}
export const useUpdateUpVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      opinionId,
      data,
    }: {
      opinionId: number;
      data: OpinionData;
    }) => updateUpVoteOpinion({ opinionId, data }),
    onMutate: async ({
      opinionId,
      data,
    }: {
      opinionId: number;
      data: OpinionData;
    }) => {
      await queryClient.cancelQueries({
        queryKey: ['upVoteOpinion', postId],
      });

      const previousUpVoteOpinions = queryClient.getQueriesData({
        queryKey: ['upVoteOpinion', postId],
      });
      queryClient.setQueryData(['upVoteOpinion', postId], (oldData: any) => {
        if (!oldData) return oldData;
        if (Array.isArray(oldData)) {
          return oldData.map((opinion: any) =>
            opinion.id === opinionId
              ? { ...opinion, title: data.title, content: data.reason }
              : opinion
          );
        }
      });
      return { previousUpVoteOpinions };
    },

    onError: (error, variables, context) => {
      // 에러 발생 시 이전 캐시로 롤백
      queryClient.setQueryData(
        ['upVoteOpinion', postId],
        context?.previousUpVoteOpinions
      );
    },

    onSettled: () => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['upVoteOpinion', postId] });
    },
  });
};
