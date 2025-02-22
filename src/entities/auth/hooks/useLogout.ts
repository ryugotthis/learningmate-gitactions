import { logout } from '../api/logout';
import { useAuthStore } from '../../../shared/model/store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const {
    clearAccessToken,

    setIsLoggedIn,
    isLoggedIn,
    setAccessName,
    clearAccessName,
  } = useAuthStore();
  // const clearAuth = useAuthStore((state) => state.clearAccessToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      if (!isLoggedIn) {
        throw new Error('🚨 이미 로그아웃된 상태입니다.');
      }
      return logout(); // 로그아웃 API 요청
    },
    onSuccess: () => {
      console.log('로그아웃 api 작동');
      clearAccessToken(); // 엑세스 토큰 초기화
      clearAccessName(); // 닉네임 초기화
      setIsLoggedIn(false); // 로그인 상태 false 변경
      console.log('로그아웃후 로그인상태', isLoggedIn); //상태 업데이트가 비동기처리라 바로 반영안됨
      navigate('/login'); // 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error('로그아웃 실패2:', error);
    },
  });
};
