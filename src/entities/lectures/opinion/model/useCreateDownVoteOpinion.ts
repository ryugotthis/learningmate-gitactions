import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { AxiosError } from 'axios';

import { createDownVoteOpinion } from '../api/createDownVoteOpinion';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}

// postId 다 없애기!
export const useCreateDownVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: OpinionData }) =>
      createDownVoteOpinion({ postId, data }),
    onMutate: async ({ postId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['downVoteOpinion', postId],
      });
      await queryClient.cancelQueries({
        queryKey: ['lecturesDetail', postId],
      });

      const previousDownVoteOpinions = queryClient.getQueriesData({
        queryKey: ['downVoteOpinion', postId],
      });
      const previousLecturesDetail = queryClient.getQueriesData({
        queryKey: ['lecturesDetail', postId],
      });

      queryClient.setQueryData(['downVoteOpinion', postId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [...oldData, data];
        }
        return [data];
      });
      queryClient.setQueryData(['lecturesDetail', postId], (oldData: any) => {
        return { ...oldData, dislikes: oldData.dislikes + 1 };
      });

      return { previousDownVoteOpinions, previousLecturesDetail };
    },

    onError: (error, variables, context) => {
      console.log('에러:', error);
      console.log('변수:', variables);
      // 에러 발생 시 이전 캐시로 롤백
      queryClient.setQueryData(
        ['downVoteOpinion', postId],
        context?.previousDownVoteOpinions
      );
      queryClient.setQueryData(
        ['lecturesDetail', postId],
        context?.previousLecturesDetail
      );
    },

    onSettled: (_, __, variables) => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({
        queryKey: ['downVoteOpinion', postId],
      });
      queryClient.invalidateQueries({
        queryKey: ['lecturesDetail', variables.postId],
      });
    },
  });
};
