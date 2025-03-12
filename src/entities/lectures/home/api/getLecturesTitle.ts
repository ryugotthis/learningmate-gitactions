import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

export const getLecturesTitle = async (
  title: string,
  platform?: string
): Promise<any> => {
  console.log('강의데이터 요청 URL:', `${apiClient.defaults.baseURL}/lectures`);
  const response = await apiClient.get(
    `/lectures/titles?` +
      `${title ? `title=${title}` : ''}` +
      `${platform ? `platform=${platform}` : ''}`
  );

  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력
  console.log('강의데이터 요청 URL:', `${apiClient.defaults.baseURL}/lectures`);

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
