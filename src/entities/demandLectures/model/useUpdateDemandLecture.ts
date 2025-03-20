import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { updateDemandLecture } from '../api/updateDemandLecture';

export interface DemandLectureData {
  title: string; // 제목
  content: any; // 내용
}
export const useUpdateDemandLecture = () => {
  // const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: number;
      data: DemandLectureData;
    }) => updateDemandLecture(postId, data),

    onSuccess: (data) => {
      console.log(data, '수정 demandLecture 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('수정 demandLecture2:', axiosError.response?.status);
    },
  });
};
