import { useAuthStore } from '../../../shared/model/store';
import { reissue } from '../api/reissue';

export const useReissue = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAuth = useAuthStore((state) => state.clearAccessToken);

  const makeReissue = async (): Promise<any> => {
    try {
      const { accessToken } = await reissue();
      setAccessToken(accessToken);
    } catch (error) {
      console.error('토큰 갱신 실패2:', error);
      clearAuth(); // 상태 초기화 (로그아웃 처리)
      throw error; // 상위 호출자에게 에러 전달
    }
  };
  return makeReissue;
};
