import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateComment } from '../api/comments/updateComment';

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
      // 각 쿼리 캐시 취소 및 이전 상태 저장
      await queryClient.cancelQueries({
        queryKey: ['demandLectureComments', postId],
      });

      // const previousMyDemandLecture = queryClient.getQueryData(['myDemandLecture']);
      const previousComment = queryClient.getQueriesData({
        queryKey: ['demandLectureComments', postId],
      });

      // Optimistic update: 각 캐시에서 좋아요 수 및 상태 변경 (데이터 구조에 맞게 수정)
      queryClient.setQueryData(
        ['demandLectureComments', postId],
        (oldData: any) => {
          console.log('전체', oldData);
          console.log('부분', data);
          console.log('여기 아이디', commentId);
          if (!oldData) return oldData;
          return oldData.map((comment: any) =>
            comment.id === commentId
              ? { ...comment, content: data.content }
              : comment
          );
        }
      );

      // 롤백을 위한 이전 상태 반환
      return {
        previousComment,
      };
    },
    onError: (err, postId, context) => {
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
