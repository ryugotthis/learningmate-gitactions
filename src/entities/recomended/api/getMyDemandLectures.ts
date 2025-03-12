// fetchMyDemandLectures
import axios from 'axios';
import { useAuthStore } from '../../../shared/model/store';

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

interface MyDemandLecturesProps {
  page: number;
  size: number;
  sort: string;
}

export const getMyDemandLectures = async ({
  page,
  size,
  sort = 'likes',
}: MyDemandLecturesProps): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
  const response = await apiClient.get(
    `/demand-lectures/my?page=${page}&size=${size}` +
      `${sort ? `&sort=${sort},desc` : ''}`
  );

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
