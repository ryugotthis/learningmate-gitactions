import { useMutation } from '@tanstack/react-query';
import { createDemandLecture } from '../api/createDemandLecture';
import { AxiosError } from 'axios';

export interface DemandLectureData {
  title: string; // 제목
  content: any; // 내용
}
export const useCreateDemandLecture = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: DemandLectureData) => createDemandLecture(data),

    onSuccess: (data) => {
      console.log(data, '포스트demandLecture 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('포스트demandLecture2:', axiosError.response?.status);
    },
  });
};
