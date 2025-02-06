// //로그인 훅
import { useMutation } from '@tanstack/react-query';
import { login, LoginPayload } from '../api/login';
import { useAuthStore } from '../../../shared/model/store';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useErrorstore } from '../model/store';

// 로그인 훅
export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken); //상태 업데이트 함수 가져오기
  const navigate = useNavigate();
  const { setErrorState } = useErrorstore();
  return useMutation({
    mutationFn: (data: LoginPayload) => login(data),

    onSuccess: (data) => {
      console.log(data, '로그인성공후 홈페이지이동');
      navigate('/');
      setAccessToken(data.data.accessToken);
    },
    onError: (error) => {
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('로그인 실패2:', axiosError.response?.status);
      setErrorState(String(axiosError.response?.status));
    },
  });
};
