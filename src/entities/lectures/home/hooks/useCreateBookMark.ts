import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useErrorstore } from '../../../auth/model/store';
import { BookMarkData, createBookMark } from '../api/createBookMark';
import { AxiosError } from 'axios';

export const useCreateBookMark = () => {
  const queryClient = useQueryClient();
  const { setErrorState } = useErrorstore();
  return useMutation({
    mutationFn: (data: BookMarkData) => createBookMark(data),

    onMutate: async (newBookmark: BookMarkData) => {
      const { postId } = newBookmark;
      await queryClient.cancelQueries({ queryKey: ['bookmarkState', postId] });

      const previousBookmarkState = queryClient.getQueriesData({
        queryKey: ['bookmarkState', postId],
      });
      queryClient.setQueryData(['bookmarkState', postId], true);
      return { previousBookmarkState };
    },

    onSuccess: (data: any) => {
      console.log('북마크 추가 성공', data);
    },
    onError: (err, postId, context) => {
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
