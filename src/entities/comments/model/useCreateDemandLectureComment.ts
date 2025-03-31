import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createDemandLectureComment } from '../api/createDemandLectureComment';

export interface DemandLectureCommentData {
  content: string; // 내용
}

export const useCreateDemandLectureComment = () => {
  // const navigate = useNavigate();

  return useMutation({
    // mutationFn은 하나의 인자만 받을 수 있음
    mutationFn: ({
      postId,
      data,
    }: {
      postId: number;
      data: DemandLectureCommentData;
    }) => createDemandLectureComment(postId, data),

    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('댓글 등록 실패2:', axiosError.response?.status);
      if (axiosError.response?.status === 403) {
        alert('로그인을 해주세요'); // 403일 때만 alert 표시
      }
    },
  });
};
