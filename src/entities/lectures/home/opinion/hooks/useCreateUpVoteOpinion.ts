// import { useMutation } from '@tanstack/react-query';

// import { AxiosError } from 'axios';
// import { createUpVoteOpinion } from '../api/createUpVoteOpinion';

// export interface OpinionData {
//   title: string; // 제목
//   reason: string; // 내용
// }
// export const useCreateUpVoteOpinion = () => {
//   // const navigate = useNavigate();
//   return useMutation({
//     mutationFn: ({ postId, data }: { postId: number; data: OpinionData }) =>
//       createUpVoteOpinion({ postId, data }),

//     onSuccess: (data) => {
//       console.log(data, '추천의견추가 post 성공');
//     },
//     onError: (error) => {
//       const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
//       console.log('추천의견추가 post 실패2:', axiosError.response?.status);
//     },
//   });
// };

import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { AxiosError } from 'axios';
import { createUpVoteOpinion } from '../api/createUpVoteOpinion';

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}
export const useCreateUpVoteOpinion = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, data }: { postId: number; data: OpinionData }) =>
      createUpVoteOpinion({ postId, data }),
    onMutate: async ({ postId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['upVoteOpinion', postId],
      });

      const previousUpVoteOpinons = queryClient.getQueriesData({
        queryKey: ['upVoteOpinion', postId],
      });
      queryClient.setQueryData(['upVoteOpinion', postId], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [...oldData, data];
        }
        return [data];
      });
      return { previousUpVoteOpinons };
    },

    onError: (error, variables, context) => {
      console.log('에러:', error);
      console.log('변수:', variables);
      // 에러 발생 시 이전 캐시로 롤백
      queryClient.setQueryData(
        ['upVoteOpinion', postId],
        context?.previousUpVoteOpinons
      );
    },

    onSettled: () => {
      // 서버의 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['upVoteOpinion', postId] });
    },
  });
};
