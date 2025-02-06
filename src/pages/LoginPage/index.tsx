// 로그인 페이지 구현
import { useRef, useState } from 'react';
import { useLogin } from '../../entities/auth/hooks/useLogin';
import Logo from '../../entities/auth/ui/icons/Logo.svg';
import Visible from '../../entities/auth/ui/icons/Visible.svg';
import Invisible from '../../entities/auth/ui/icons/Unvisible.svg';
import DeleteClose from '../../entities/auth/ui/icons/DeleteClose.svg';
import Header from '../../widgets/header';
import Failed from '../../shared/ui/icons/Failled.svg';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useErrorstore } from '../../entities/auth/model/store';

export const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  // const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   login(formData); // 로그인 요청
  // };

  // 비밀번호 눈
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (data: any) => {
    const { ...filterData } = data;
    login(filterData);
  };

  const { register, handleSubmit, reset } = useForm();

  //에러상태
  const { errorState } = useErrorstore();

  return (
    <>
      <Header />
      <div className="container flex flex-col items-center mx-auto mt-10 max-w-md py-10 px-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">로그인</h2>

        <button className="flex justify-center w-full py-3 px-4 bg-logo text-black rounded-4xl">
          <img src={Logo} alt="logo" />
          <span className="ml-3 font-bold">카카오로 3초만에 로그인하기</span>
        </button>

        <div className="relative flex items-center w-full my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-xs text-gray-500">또는</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일
            </label>
            <div className="flex items-center flex-grow border border-surface-line bg-surface-dark rounded-4xl">
              {/* 이메일 입력 필드 + X 버튼 */}
              <input
                type="text"
                id="email"
                {...register('email')}
                className="w-full pl-5 py-3 border-none outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => reset({ email: '' })}
                className="px-5"
              >
                <img src={DeleteClose} alt="deleteClose" />
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <div className="flex w-full rounded-4xl border border-surface-line bg-surface-dark flex-grow">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                // placeholder="Password"
                id="password"
                {...register('password')}
                className="pl-5 py-3 border-none outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="px-5"
              >
                <img
                  src={isPasswordVisible ? Invisible : Visible}
                  alt="visible"
                />
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                console.log('비밀번호 찾기');
              }}
              className="text-xs text-tertiary-default"
            >
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit"
            className="rounded-4xl bg-primary-default px-4 py-3 mt-2 text-white font-bold"
          >
            로그인
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => navigate('/signup')}
            className="rounded-4xl px-4 py-3 border border-tertiary-default text-tertiary-default font-bold"
          >
            회원가입
          </button>

          {/* <button type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </button> */}
        </form>
        {errorState && (
          <button className="flex mt-10 rounded-4xl px-4 py-3 border-2 border-error text-font-default font-bold">
            <img src={Failed} alt="failed" className="mr-2" />
            <p>로그인 정보가 정확하지 않은 것 같아</p>
          </button>
        )}
      </div>
    </>
  );
};
