import { useAuthStore } from '../../../../../shared/model/store';

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

export interface OpinionData {
  title: string; // 제목
  reason: string; // 내용
}

export const updateDownVoteOpinion = async ({
  opinionId,
  data,
}: {
  opinionId: number;
  data: OpinionData;
}): Promise<any> => {
  try {
    console.log('추천글 수정', data);
    const response = await apiClient.put(`/down-votes/${opinionId}`, data);
    return response.data;
  } catch (error) {
    console.log('추천글 수정 아이디!!!!!!', opinionId);
    console.log('추천글 수정 데이터!!!!!', data);
    console.error('📌추천글 수정1:', error);
    throw error;
  }
};
