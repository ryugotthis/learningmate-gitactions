import { authApiClient } from '../../../shared/api/authApiClient';

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
  const response = await authApiClient.get(
    `/demand-lectures/my?page=${page}&size=${size}` +
      `${sort === 'desc' ? `&sort=desc` : `&sort=${sort},desc`}`
  );

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
