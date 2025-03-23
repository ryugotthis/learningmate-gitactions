import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../api/updateComment';

// export interface DemandLectureCommentData {
//   content: string; // 내용
// }

export const useUpdateComment = (commentId: number) => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    // mutationKey를 통해 업데이트하고자 하는 댓글을 명시적으로 식별합니다.
    mutationKey: ['updateComment', commentId],
    // mutationFn은 하나의 인자만 받을 수 있음
    mutationFn: ({
      commentId,
      data,
    }: {
      commentId: number;
      data: any;
      postId: number;
    }) => updateComment(commentId, data),

    onMutate: async ({ data, postId }) => {
      // 해당 게시글의 댓글 쿼리를 취소 (동시 요청 충돌 방지)
      await queryClient.cancelQueries({
        queryKey: ['demandLectureComments', postId],
      });

      // 이전 댓글 상태를 저장 (에러 발생 시 롤백용)
      const previousComment = queryClient.getQueriesData({
        queryKey: ['demandLectureComments', postId],
      });

      // UI를 즉시 업데이트하여 수정된 것으로 표시 (낙관적 업데이트)
      queryClient.setQueryData(
        ['demandLectureComments', postId],
        (oldData: any) => {
          if (!oldData) return oldData;
          return oldData.map((comment: any) =>
            comment.id === commentId
              ? { ...comment, content: data.content }
              : comment
          );
        }
      );

      // 이후 onError에서 rollback할 수 있도록 이전 상태 반환
      return {
        previousComment,
      };
    },
    onError: (err, postId, context) => {
      console.log('에러:', err);
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(
        ['demandLectureComments', postId],
        context?.previousComment
      );
    },
    onSettled: (postId) => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({
        queryKey: ['demandLectureComments', postId],
      });
    },
  });
};
// onError: (error) => {
//   const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
//   console.log('댓글 수정 실패2:', axiosError.response?.status);
//   if (axiosError.response?.status === 403) {
//     alert('로그인을 해주세요'); // ✅ 403일 때만 alert 표시
//   }
