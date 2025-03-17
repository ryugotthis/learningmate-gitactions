import { authApiClient } from '../../../shared/api/authApiClient';

export const getBookmarkState = async (postId: number): Promise<any> => {
  // console.log(
  //   '강의데이터 요청 URL:',
  //   `${apiClient.defaults.baseURL}/bookmarks/${postId}/exists`
  // );
  const response = await authApiClient.get(`/bookmarks/exist?postId=${postId}`);

  // console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력

  return response.data.data; // ✅ 올바르게 `data`만 반환
};
