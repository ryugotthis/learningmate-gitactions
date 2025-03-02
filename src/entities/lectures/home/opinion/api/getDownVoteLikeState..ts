import axios from 'axios';
import { useAuthStore } from '../../../../../shared/model/store';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기
  console.log('토큰', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export const getDownVoteLikeState = async (opinionId: number): Promise<any> => {
  console.log(
    '강의데이터 요청 URL:',
    `${apiClient.defaults.baseURL}/down-votes/${opinionId}/like/exists`
  );
  const response = await apiClient.get(`/down-votes/${opinionId}/like/exists`);

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
