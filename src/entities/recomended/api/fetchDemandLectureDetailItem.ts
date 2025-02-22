import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

export const fetchDemandLectureDetailItem = async (
  postId: number
): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
  const response = await apiClient.get(`/demand-lectures/${postId}`);

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
