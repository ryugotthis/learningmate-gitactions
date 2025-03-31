import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { createLecture } from '../api/createLecture';
import { useNavigate } from 'react-router-dom';

export const useCreateLecture = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (searchText: string) => createLecture({ url: searchText }),

    onSuccess: (data) => {
      navigate(`/lecture-detail/${data.data.id}`); // 강의 추가하고 그 강의상세 게시판으로 이동
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('강의 추가 실패2:', axiosError.response?.status);
    },
  });
};
