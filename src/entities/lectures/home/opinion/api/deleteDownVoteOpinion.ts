import axios from 'axios';
import { useAuthStore } from '../../../../../shared/model/store';

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

export const deleteDownVoteOpinion = async (
  opinionId: number
): Promise<any> => {
  try {
    console.log('추천글 삭제');
    const response = await apiClient.delete(`/down-votes/${opinionId}`);
    return response.data;
  } catch (error) {
    console.error('📌 추천글 삭제1:', error);
    throw error;
  }
};
