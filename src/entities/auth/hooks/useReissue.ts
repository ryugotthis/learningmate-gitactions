import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../../shared/model/store';
import { reissue } from '../api/reissue';
import { AxiosError } from 'axios'; // AxiosError 타입 추가

let isReissuing = false; // 중복 요청 방지 플래그

export const useReissue = () => {
  const {
    setAccessToken,
    setAccessName,
    clearAccessToken,
    clearAccessName,
    setIsLoggedIn,
    isLoggedIn,
  } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      console.log('리이슈시 로그인상태', isLoggedIn);
      if (isReissuing) return; // 이미 요청 중이면 중복 요청 방지
      isReissuing = true;

      try {
        const { accessToken } = await reissue();
        // const { accessToken,name } = await reissue();
        setAccessToken(accessToken);
        // setAccessName(name)
        return accessToken;
      } finally {
        isReissuing = false; // 요청 완료 후 다시 요청 가능하게 변경
      }
    },
    onError: (error) => {
      console.error('🚨 토큰 갱신 실패:', error);
      clearAccessToken();
      // clearAccessName
      setIsLoggedIn(false);

      // AxiosError로 캐스팅하여 response 속성 접근 가능하도록 처리
      // const axiosError = error as AxiosError;

      // 403 Forbidden일 경우에만 로그아웃 처리
      // if (axiosError.response?.status === 403) {
      //   clearAccessToken(); // 상태 초기화 (로그아웃 처리)
      //   setIsLoggedIn(false);
      // }
    },
  });
};
