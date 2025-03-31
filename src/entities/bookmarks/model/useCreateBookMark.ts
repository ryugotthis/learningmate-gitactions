import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BookMarkData, createBookMark } from '../api/createBookMark';

export const useCreateBookMark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookMarkData) => createBookMark(data),

    onMutate: async (newBookmark: BookMarkData) => {
      const { postId } = newBookmark;
      // 해당 게시글의 북마크 상태 쿼리를 취소 (동시 요청 충돌 방지)
      await queryClient.cancelQueries({ queryKey: ['bookmarkState', postId] });

      // 이전 북마크 상태를 저장 (에러 발생 시 롤백용)
      const previousBookmarkState = queryClient.getQueriesData({
        queryKey: ['bookmarkState', postId],
      });
      // UI를 즉시 업데이트하여 북마크된 것으로 표시 (낙관적 업데이트)
      queryClient.setQueryData(['bookmarkState', postId], true);
      // 이후 onError에서 rollback할 수 있도록 이전 상태 반환
      return { previousBookmarkState };
    },

    onError: (err, postId, context) => {
      // 에러 발생 시 이전 상태로 롤백
      console.log('북마크 추가 실패2:', err);
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
