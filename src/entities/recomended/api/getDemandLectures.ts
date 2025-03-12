// import { useAuthStore } from '../../../shared/model/store';
// import { useNavigate } from 'react-router-dom';
// import { useMutation } from '@tanstack/react-query';

// import axios from 'axios';

// export const apiClient = axios.create({
//   baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true, // 쿠키를 포함한 요청 허용
// });

// ✅ 요청 인터셉터 추가 (accessToken 자동 추가)
// apiClient.interceptors.request.use((config) => {
//   const { accessToken } = useAuthStore.getState(); // ✅ 상태에서 직접 가져오기
//   console.log('토큰', accessToken);
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// export const fetchDemandLecture = async () => {
//   try {
//     const response = await apiClient.get('/demand-lectures');
//     return response.data;
//   } catch (error) {
//     console.error('📌 요청 실패:', error);
//     throw error;
//   }
// };

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

export const getDemandLecture = async ({
  page,

  sort,
}: {
  page: number;

  sort: string;
}): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
  const response = await apiClient.get(
    `/demand-lectures?page=${page}` + `${sort ? `&sort=${sort},desc` : ''}`
  );
  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
