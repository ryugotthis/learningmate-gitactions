import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { AxiosError } from 'axios';
import { createUpVoteOpinion } from '../api/createUpVoteOpinion';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}
export const useCreateUpVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: OpinionData }) =>
      createUpVoteOpinion({ postId, data }),
    onMutate: async ({ postId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['upVoteOpinion', postId],
      });
      await queryClient.cancelQueries({
        queryKey: ['lecturesDetail', postId],
      });

      const previousUpVoteOpinions = queryClient.getQueriesData({
        queryKey: ['upVoteOpinion', postId],
      });
      const previousLecturesDetail = queryClient.getQueriesData({
        queryKey: ['lecturesDetail', postId],
      });

      queryClient.setQueryData(['upVoteOpinion', postId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [...oldData, data];
        }
        return [data];
      });
      queryClient.setQueryData(['lecturesDetail', postId], (oldData: any) => {
        return { ...oldData, likes: oldData.likes + 1 };
      });

      return { previousUpVoteOpinions, previousLecturesDetail };
    },

    onError: (error, variables, context) => {
      console.log('추천 의견 등록 실패:', error);
      console.log('변수:', variables);
      // 에러 발생 시 이전 캐시로 롤백
      queryClient.setQueryData(
        ['upVoteOpinion', postId],
        context?.previousUpVoteOpinions
      );
      queryClient.setQueryData(
        ['lecturesDetail', postId],
        context?.previousLecturesDetail
      );
    },

    onSettled: () => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['upVoteOpinion', postId] });
      queryClient.invalidateQueries({ queryKey: ['lecturesDetail', postId] });
    },
  });
};
