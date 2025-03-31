import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../api/deleteComment'; // 댓글 삭제 API
import { AxiosError } from 'axios';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // 댓글 삭제 API 호출: commentId만 사용하지만, 후속 업데이트를 위해 postId도 함께 전달
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(commentId),

    // onMutate: 요청 전에 캐시를 낙관적 업데이트합니다.
    onMutate: async ({
      commentId,
      postId,
    }: {
      commentId: number;
      postId: number;
    }) => {
      // 해당 게시글 댓글 쿼리 취소 (queryKey가 ['demandLecture', postId]라고 가정)
      await queryClient.cancelQueries({
        queryKey: ['demandLectureComments', postId],
      });

      // 기존 댓글 데이터를 스냅샷으로 저장
      const previousComments = queryClient.getQueryData<any>([
        'demandLectureComments',
        postId,
      ]);

      // 낙관적 업데이트: 기존 데이터에서 삭제할 댓글을 제거합니다.
      queryClient.setQueryData(
        ['demandLectureComments', postId],
        (oldData: any) => {
          if (!oldData) return oldData;
          // 댓글 목록이 배열
          return oldData.filter((comment: any) => comment.id !== commentId);
        }
      );

      // rollback을 위해 이전 상태를 반환
      return { previousComments };
    },

    // onError: 요청 실패 시 캐시 롤백 및 에러 로그 처리
    onError: (error, variables, context: any) => {
      // Optimistic update 롤백
      queryClient.setQueryData(
        ['demandLectureComments', variables.postId],
        context?.previousComments
      );

      // 추가 에러 로그 출력
      const axiosError = error as AxiosError;
      console.log('댓글 삭제 실패2:', axiosError.response?.status);
    },

    // onSettled: 요청이 끝나면 최신 데이터를 위해 쿼리를 무효화
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['demandLectureComments', variables.postId],
      });
    },
  });
};
