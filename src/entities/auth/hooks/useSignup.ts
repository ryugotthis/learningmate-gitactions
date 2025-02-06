import { useMutation } from '@tanstack/react-query';
import { signup, SignupPayload } from '../api/signup';

// 회원가입 훅
export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupPayload) => signup(data),
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },
    onError: (error) => {
      console.error('회원가입 실패2:', error);
    },
  });
};
