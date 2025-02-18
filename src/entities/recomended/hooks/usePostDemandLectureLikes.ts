import { useMutation } from '@tanstack/react-query';
import { postDemandLectureLikes } from '../api/createDemandLectureLikes';
import { AxiosError } from 'axios';

export const usePostDemandLectureLikes = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId: number) => postDemandLectureLikes(postId),

    onSuccess: (data) => {
      console.log(data, '포스트날강도 추천 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('포스트날강도 추천2:', axiosError.response?.status);
    },
  });
};
