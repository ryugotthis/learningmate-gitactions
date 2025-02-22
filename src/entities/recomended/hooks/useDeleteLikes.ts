import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { deleteLikes } from '../api/deleteLikes';

export const useDeleteLikes = () => {
  // const navigate = useNavigate();
  deleteLikes;
  return useMutation({
    mutationFn: (postId: number) => deleteLikes(postId),

    onSuccess: (data) => {
      console.log(data, '포스트날강도 추천 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('포스트날강도 추천2:', axiosError.response?.status);
    },
  });
};
