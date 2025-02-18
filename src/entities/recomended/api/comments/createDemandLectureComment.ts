import { useAuthStore } from '../../../../shared/model/store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AxiosError } from 'axios';
// UX 개선 에러 알림 라이브러리

import 'react-toastify/dist/ReactToastify.css';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// ✅ 요청 인터셉터 추가 (accessToken 자동 추가)
apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기
  console.log('토큰', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export interface DemandLectureCommentData {
  content: string; // 내용
}

export const createDemandLectureComment = async (
  postId: number,
  data: DemandLectureCommentData
): Promise<any> => {
  try {
    console.log('포스트댓글', data);
    const response = await apiClient.post(`/posts/${postId}/comments`, data);
    return response.data;
  } catch (error) {
    console.error('📌 포스트demandLecture 실패1:', error);
    throw error;
  }
};

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

    onSuccess: (data) => {
      console.log(data, '포스트demandLecture 성공');
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('포스트demandLecture2:', axiosError.response?.status);
      if (axiosError.response?.status === 403) {
        alert('로그인을 해주세요'); // ✅ 403일 때만 alert 표시
      }
    },
  });
};
