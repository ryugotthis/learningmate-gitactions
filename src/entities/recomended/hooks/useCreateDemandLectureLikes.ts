import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLikes } from '../api/createLikes';

export const useCreateLikes = () => {
  // const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => createLikes(postId),

    // Optimistic Update: API 요청 전 미리 캐시 업데이트
    // mutation이 실행되기 바로 전에 호출되는 콜백 함수
    onMutate: async (postId: number) => {
      // 각 쿼리 캐시 취소 및 이전 상태 저장
      // 데이터를 변경하기 전에 기존 쿼리를 취소 ->  불필요한 데이터 업데이트나 리소스 낭비를 방지
      await queryClient.cancelQueries({ queryKey: ['MyDemandLectures'] });
      await queryClient.cancelQueries({
        queryKey: ['demandLectureDetailItem', postId],
      });
      await queryClient.cancelQueries({ queryKey: ['demandLectures'] });
      // postLikesStatus
      await queryClient.cancelQueries({
        queryKey: ['postLikesStatus', postId],
      });

      // 기존 상태 스냅샷 저장 (rollback 용)
      // 단일 쿼리일때 getQueryData 여러 쿼리일때 getQueriesData
      const previousDemandLecture = queryClient.getQueriesData({
        queryKey: ['MyDemandLectures'],
      });
      const previousDetailItem = queryClient.getQueriesData({
        queryKey: ['demandLectureDetailItem', postId],
      });
      const previousMyDemandLecture = queryClient.getQueriesData({
        queryKey: ['demandLectures'],
      });
      const previousLikeStatus = queryClient.getQueryData<boolean>([
        'postLikesStatus',
        postId,
      ]);

      // Optimistic update: 각 캐시에서 좋아요 수 및 상태 변경 (데이터 구조에 맞게 수정)
      queryClient.setQueryData(['demandLecture'], (oldData: any) => {
        if (oldData) {
          return { ...oldData, likes: oldData.likes + 1 };
        }
        return oldData;
      });
      queryClient.setQueryData(
        ['demandLectureDetailItem', postId],
        (oldData: any) => {
          if (oldData) {
            return { ...oldData, likes: oldData.likes + 1 };
          }
          return oldData;
        }
      );
      queryClient.setQueryData(['myDemandLecture'], (oldData: any) => {
        if (oldData) {
          return { ...oldData, likes: oldData.likes + 1 };
        }
        return oldData;
      });
      queryClient.setQueryData(['postLikesStatus', postId], true);

      // 롤백을 위한 이전 상태 반환
      return {
        previousDemandLecture,
        previousDetailItem,
        previousMyDemandLecture,
        previousLikeStatus,
      };
    },
    // context는 onMutate의 반환값이 onError의 매개변수
    onError: (err, postId, context) => {
      // 에러 발생 시 이전 상태로 롤백
      queryClient.setQueryData(
        ['demandLecture'],
        context?.previousDemandLecture
      );
      queryClient.setQueryData(
        ['demandLectureDetailItem', postId],
        context?.previousDetailItem
      );
      queryClient.setQueryData(
        ['myDemandLecture'],
        context?.previousMyDemandLecture
      );
      queryClient.setQueryData(
        ['postLikesStatus', postId],
        context?.previousLikeStatus
      );
    },
    // mutation이 성공하든 실패하든 무조건 실행되는 콜백 함수
    onSettled: (postId) => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({ queryKey: ['MyDemandLectures'] });
      queryClient.invalidateQueries({
        queryKey: ['demandLectureDetailItem', postId],
      });
      queryClient.invalidateQueries({ queryKey: ['demandLectures'] });
      queryClient.invalidateQueries({ queryKey: ['postLikesStatus', postId] });
    },
  });
};
