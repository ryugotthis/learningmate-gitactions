import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { createProfileImage } from '../api/createProfileImage';

export const useCreateProfileImage = () => {
  return useMutation({
    mutationFn: (formData: any) => createProfileImage(formData),

    onSuccess: (data) => {
      console.log(data, '이미지 추가 성공');
      // navigate(`/lecture-detail/${data.id}`)
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('이미지 추가 실패2:', axiosError.response?.status);
    },
  });
};
