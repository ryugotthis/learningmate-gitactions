import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProfileImage } from '../api/createProfileImage';

export const useCreateProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: any) => createProfileImage(formData),

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['getUser'] });

      const previousUser = queryClient.getQueriesData({
        queryKey: ['getUser'],
      });
      queryClient.setQueryData(['getUser'], (oldData: any) => {
        return { ...oldData, profileImage: data };
      });
      return { previousUser };
    },
    onError: (err, context) => {
      // 에러 발생 시 이전 상태로 롤백
      console.log('이미지 추가 실패2:', err);
      queryClient.setQueryData(['getUser'], context?.previousUser);
    },
    // mutation이 성공하든 실패하든 무조건 실행되는 콜백 함수
    onSettled: () => {
      // 최신 데이터를 위해 무효화 (혹은 refetch)
      queryClient.invalidateQueries({ queryKey: ['getUser'] });
    },
  });
};
