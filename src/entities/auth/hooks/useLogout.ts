import { logout } from '../api/logout';
import { useAuthStore } from '../../../shared/model/store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAccessToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout, // 서버에 로그아웃 요청
    onSuccess: () => {
      clearAuth(); // 엑세스 토큰 초기화
      navigate('/login'); // 로그인 페이지로 이동
    },
    onError: (error) => {
      console.error('로그아웃 실패2:', error);
    },
  });
};
