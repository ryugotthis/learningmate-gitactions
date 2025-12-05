import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/store/authstore';
import { reissue } from '../api/reissue';
import { AxiosError } from 'axios'; // AxiosError 타입 추가



export const useReissue = () => {
  const { setAccessToken, clearAccessToken, setIsLoggedIn } = useAuthStore();

  return useMutation({
    mutationKey: ['reissue'],
    mutationFn: async () => {
      const { accessToken } = await reissue();
      setAccessToken(accessToken);
      return accessToken;
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      console.error('🚨 토큰 갱신 실패2:', axiosError);
      clearAccessToken();
      setIsLoggedIn(false);
    },
  });
};
