import { authApiClient } from '../../../shared/api/authApiClient';

export const getBookMark = async ({
  sort,
  page,
  platforms,
}: {
  sort: string;
  page: number;
  platforms?: string[];
}): Promise<any> => {
  console.log('북마크 요청:', `${authApiClient.defaults.baseURL}/bookmarks`);
  const platformsQuery = platforms
    ? `&platforms=${platforms.map(encodeURIComponent).join(',')}`
    : '';
  console.log('플랫폼확인', platformsQuery, platforms);
  const sortQuery =
    sort === 'desc' ? `&sort=createTime,desc` : `&sort=${sort},desc`;
  const url = `/bookmarks?size=9&page=${page}${platformsQuery}${sortQuery}`;
  // const url = `/bookmarks?size=9&page=${page}`;
  const response = await authApiClient.get(url);
  console.log('요청 URL:', authApiClient.defaults.baseURL + url);

  console.log('📌 북마크 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
