// //로그인 훅
import { useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useErrorstore } from '../model/store';
import { updatePassword, newPassword } from '../api/updatePassword';

// 로그인 훅
export const useUpdatePassword = () => {
  const navigate = useNavigate();
  const { setErrorState } = useErrorstore();
  return useMutation({
    mutationFn: (data: newPassword) => updatePassword(data),

    onSuccess: (data) => {
      console.log(data, '비밀번호 변경 성공후 로그인 페이지 이동');

      navigate('/login');
    },
    onError: (error) => {
      console.log('에러확인', error);
      const axiosError = error as AxiosError; // ✅ TypeScript가 AxiosError로 인식하게 변환
      console.log('비밀번호 변경 실패2:', axiosError.response?.status);
      setErrorState(String(axiosError.response?.status));
    },
  });
};
