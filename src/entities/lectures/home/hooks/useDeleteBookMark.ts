import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useErrorstore } from '../../../auth/model/store';
// import { AxiosError } from 'axios';
import { deleteBookMark } from '../api/DeleteBookMark';

export const useDeleteBookMark = () => {
  const queryClient = useQueryClient();
  // const { setErrorState } = useErrorstore();
  return useMutation({
    mutationFn: (postId: number) => deleteBookMark(postId),

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ['bookmarkState', postId] });

      const previousBookmarkState = queryClient.getQueriesData({
        queryKey: ['bookmarkState', postId],
      });
      queryClient.setQueryData(['bookmarkState', postId], false);
      return { previousBookmarkState };
    },

    onSuccess: (data: any) => {
      console.log('북마크 추가 성공', data);
    },
    onError: (err, postId, context) => {
      console.log('에러:', err);
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(
        ['bookmarkState', postId],
        context?.previousBookmarkState
      );
    },
    // mutation이 성공하든 실패하든 무조건 실행되는 콜백 함수
    onSettled: (postId) => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({ queryKey: ['bookmarkState', postId] });
    },
  });
};
