import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { deleteLecturesForMe } from '../api/deleteLectureForMe';

export const useDeleteLectureForMe = () => {
  // const navigate = useNavigate();
  return useMutation({
    mutationFn: (postId: number) => deleteLecturesForMe(postId),

    onSuccess: (data) => {
      console.log(data, '날강도 삭제 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('날강도 삭제 실패2:', axiosError.response?.status);
    },
  });
};
