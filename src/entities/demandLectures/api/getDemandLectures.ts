import { apiClient } from '../../../shared/api/apiClient';
export const getDemandLecture = async ({
  page,

  sort,
}: {
  page: number;

  sort: string;
}): Promise<any> => {
  // console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);

  const response = await apiClient.get(
    `/demand-lectures?page=${page}` +
      `${sort === 'desc' ? `&sort=desc` : `&sort=${sort},desc`}`
  );

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
