import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

export const getLectures = async ({
  pageParam,
  platform,
  title,
  sort = 'likes',
}: {
  pageParam?: number;
  platform?: string;
  title?: string | null;
  sort?: string;
}): Promise<any> => {
  console.log('타입', sort);
  console.log(
    '🟨🟨❤🟨🟨강의데이터 요청 URL:',
    `${apiClient.defaults.baseURL}/lectures?size=9&page=0` +
      `${platform ? `&platform=${encodeURIComponent(platform)}` : ''}` +
      `${title ? `&title=${encodeURIComponent(title)}` : ''}` +
      `${sort === 'desc?' ? `&sort=desc` : `&sort=${sort},desc`}`
  );
  const response = await apiClient.get(
    `/lectures?size=9&page=${pageParam}` +
      `${platform ? `&platform=${encodeURIComponent(platform)}` : ''}` +
      `${title ? `&title=${encodeURIComponent(title)}` : ''}` +
      `${sort === 'desc' ? `&sort=desc` : `&sort=${sort},desc`}`
  );

  console.log('🥰test API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data; // ✅ 올바르게 `data`만 반환
};
