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

    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('날강도 글 생성 실패2:', axiosError.response?.status);
    },
  });
};
