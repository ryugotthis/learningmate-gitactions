import { useAuthStore } from '../../../../shared/model/store';
import axios from 'axios';

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

export interface DemandLectureData {
  title: string; // 제목
  content: string; // 내용
}

export const updateComment = async (
  commentId: number,
  data: DemandLectureData
): Promise<any> => {
  try {
    console.log('수정 댓글 데이터', data);
    const response = await apiClient.put(`/comments/${commentId}`, data);
    console.log('데이터형태', data);
    return response.data;
  } catch (error) {
    console.error('📌 수정 댓글 실패1:', error);
    throw error;
  }
};
