import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { deleteLecturesForMe } from '../api/deleteLectureForMe';

export const useDeleteLectureForMe = () => {
  return useMutation({
    mutationFn: (postId: number) => deleteLecturesForMe(postId),

    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('날강도 게시글 삭제 실패2:', axiosError.response?.status);
    },
  });
};
