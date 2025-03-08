import axios from 'axios';
import { useAuthStore } from '../../../shared/model/store';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'multipart/form-data',
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

export const createProfileImage = async (formData: any): Promise<any> => {
  try {
    const response = await apiClient.post(`/users/profile-image`, formData);
    return response.data;
  } catch (error) {
    console.log('데이터형태', formData);
    console.error('📌이미지 추가 실패1:', error);
    throw error;
  }
};
