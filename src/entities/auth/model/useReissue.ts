import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/store/authstore';
import { reissue } from '../api/reissue';
// import { AxiosError } from 'axios'; // AxiosError 타입 추가

let isReissuing = false; // 중복 요청 방지 플래그

export const useReissue = () => {
  const { setAccessToken, clearAccessToken, setIsLoggedIn } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (isReissuing) return; // 이미 요청 중이면 중복 요청 방지
      isReissuing = true;

      try {
        const { accessToken } = await reissue();
        setAccessToken(accessToken);
        return accessToken;
      } finally {
        isReissuing = false; // 요청 완료 후 다시 요청 가능하게 변경
      }
    },
    onError: (error) => {
      console.error('🚨 토큰 갱신 실패2:', error);
      clearAccessToken();
      setIsLoggedIn(false);
    },
  });
};
