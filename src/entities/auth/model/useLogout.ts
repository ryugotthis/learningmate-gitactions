import { logout } from '../api/logout';
import { useAuthStore } from '../../../shared/store/authstore';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const {
    clearAccessToken,

    setIsLoggedIn,
    isLoggedIn,
  } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!isLoggedIn) {
        throw new Error('🚨 이미 로그아웃된 상태입니다.');
      }
      return logout(); // 로그아웃 API 요청
    },
    onSuccess: () => {
      clearAccessToken(); // 엑세스 토큰 초기화
      setIsLoggedIn(false); // 로그인 상태 false 변경
      navigate('/login'); // 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error('로그아웃 실패2:', error);
    },
  });
};
