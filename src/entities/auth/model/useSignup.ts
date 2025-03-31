import { useMutation } from '@tanstack/react-query';
import { signup, SignupPayload } from '../api/signup';
import { useNavigate } from 'react-router-dom';

// 회원가입 훅
export const useSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignupPayload) => signup(data),
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('회원가입 실패2:', error);
    },
  });
};
