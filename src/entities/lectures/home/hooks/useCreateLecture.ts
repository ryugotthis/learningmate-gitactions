import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { createLecture } from '../api/createLecture';
import { useNavigate } from 'react-router-dom';

export const useCreateLecture = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (searchText: string) => createLecture({ url: searchText }),

    onSuccess: (data) => {
      console.log(data, '강의 추가 성공');
      // navigate(`/lecture-detail/${data.id}`)
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('강의 추가 실패2:', axiosError.response?.status);
    },
  });
};
