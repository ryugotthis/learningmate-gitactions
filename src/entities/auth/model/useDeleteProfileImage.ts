import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProfileImage } from '../api/deleteProfileImage';

// 컨텍스트 타입 정의
type MutationContext = {
  previousUser: unknown;
};

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProfileImage(),

    onSuccess: (data) => {
      console.log(data, '이미지 삭제 성공');
    },
    onMutate: async (): Promise<MutationContext> => {
      await queryClient.cancelQueries({ queryKey: ['getUser'] });

      const previousUser = queryClient.getQueriesData({
        queryKey: ['getUser'],
      });

      queryClient.setQueryData(['getUser'], (oldData: any) => {
        return { ...oldData, profileImage: null };
      });
      return { previousUser };
    },
    onError: (err, _, context: MutationContext | undefined) => {
      // 에러 발생 시 이전 상태로 롤백
      console.log('에러:', err);
      if (context) {
        queryClient.setQueryData(['getUser'], context.previousUser);
      }
    },
    // mutation이 성공하든 실패하든 무조건 실행되는 콜백 함수
    onSettled: () => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
  });
};
