import { authApiClient } from '../../../shared/api/authApiClient';
import { useAuthStore } from '../../../shared/store/authstore';
import { reissue } from '../../auth/api/reissue';

export interface BookMarkData {
  postId: number;
}

export const createBookMark = async (data: BookMarkData): Promise<any> => {
  try {
    const response = await authApiClient.post(`/bookmarks`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        //  Refresh Token으로 토큰 재발급
        const { accessToken } = await reissue();
        useAuthStore.getState().setAccessToken(accessToken);

        //  재시도
        const retryResponse = await authApiClient.post(`/bookmarks`, data);
        return retryResponse.data;
      } catch (reissueError) {
        //  재발급 실패 시 로그아웃 처리
        useAuthStore.getState().clearAccessToken();
        useAuthStore.getState().setIsLoggedIn(false);

        // 알림 + 이동
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        window.location.href = '/login'; // navigate 없이 리다이렉트
        throw reissueError;
      }
    }
    console.error('📌북마크 추가 실패1:', error);
    throw error;
  }
};
