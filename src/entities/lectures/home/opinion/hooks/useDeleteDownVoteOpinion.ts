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
          return oldData.filter((opinion) => opinion.id !== opinionId);
        }
      });
      queryClient.setQueryData(['lecturesDetail', postId], (oldData: any) => {
        return { ...oldData, dislikes: oldData.dislikes - 1 };
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

    onSettled: () => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['downVoteOpinion', postId] });
      queryClient.invalidateQueries({
        queryKey: ['lecturesDetail', postId],
      });
    },
  });
};
