// 로그인 페이지 구현
import { useEffect, useState } from 'react';
import { useLogin } from '../../entities/auth/model/useLogin';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// 컴포넌트
import Header from '../../widgets/header';
import SEO from '../../shared/ui/SEO';
// 커스텀 훅
import { useErrorstore } from '../../shared/store/errorStore';
import Logo from '../../features/auth/ui/icons/Logo.svg';
// 아이콘
import { Invisible, Visible } from '../../features/auth/ui/icons';
import { DeleteCloseIcon, FailedIcon } from '../../shared/ui/icons';

const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  // const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // 비밀번호 눈
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onSubmit = (data: any) => {
    const { ...filterData } = data;
    login(filterData);
  };

  const { register, handleSubmit, reset } = useForm();

  //에러상태
  const { errorState, clearErrorState } = useErrorstore();

  // ✅ 에러 상태가 true가 되면 2초 후에 자동 초기화
  useEffect(() => {
    if (errorState) {
      const timer = setTimeout(() => {
        clearErrorState();
      }, 2000); // 2초

      return () => clearTimeout(timer); // 컴포넌트 언마운트 또는 상태 변경 시 clear
    }
  }, [errorState, clearErrorState]);

  return (
    <>
      <SEO
        title="로그인 - 러닝메이트"
        description="러닝메이트 계정으로 로그인하세요."
        image="Logo.png"
        url="login"
        type="website"
      />
      <Header />
      <div className="flex flex-col w-[360px] md:w-[400px] items-center mx-auto gap-[20px] md:gap-[24px] mt-[62.5px] md:mt-[100px]">
        <h1 className="title-sm-600 md:title-md-600">로그인</h1>

        <button className="flex justify-center gap-[8px] items-center w-full h-[48px] bg-kakao  text-black rounded-4xl">
          <img src={Logo} alt="logo" />
          <span className="tracking-[-0.1em] font-semibold">
            카카오로 3초만에 로그인하기
          </span>
        </button>

        <div className="relative flex items-center w-full my-6">
          <div className="flex-grow border-t border-line"></div>
          <span className="mx-4 text-xs text-gray99 tracking-[-0.1em]">
            또는
          </span>
          <div className="flex-grow border-t border-line"></div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-[14px]"
        >
          <div className="flex flex-col gap-[4px]">
            <label
              htmlFor="email"
              className="block text-sm-500 md:font-medium text-font-default md:tracking-[-0.05em]"
            >
              이메일
            </label>
            <div className="w-full h-[48px] px-[20px] py-[12px] flex items-center flex-grow border border-surface-line bg-surface-default rounded-4xl focus-within:border-primary-default">
              {/* 이메일 입력 필드 + X 버튼 */}
              <input
                type="text"
                id="email"
                {...register('email')}
                className=" border-none outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => reset({ email: '' })}
                className=""
              >
                <DeleteCloseIcon />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            <label
              htmlFor="password"
              className="block text-sm-500 md:font-medium text-font-default md:tracking-[-0.05em]"
            >
              비밀번호
            </label>
            <div className="w-full h-[48px] px-[20px] py-[12px] flex items-center flex-grow border border-surface-line bg-surface-default rounded-4xl focus-within:border-primary-default">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                // placeholder="Password"
                id="password"
                {...register('password')}
                className="border-none outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className=""
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
              className="text-sm-400 text-tertiary-default"
            >
              비밀번호 찾기
            </button>
          </div>

          <button
            type="submit"
            className="h-[48px] rounded-4xl bg-primary-default text-white text-md-600"
          >
            로그인
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={() => navigate('/signup')}
            className="h-[48px] rounded-4xl mt-[6px] md:mt-[10px] border border-surface-line text-tertiary-default text-md-600"
          >
            회원가입
          </button>

          {/* <button type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </button> */}
        </form>
        {errorState && (
          <button className="fixed bottom-[50px] flex gap-[6px] md:gap-[6px] items-center rounded-4xl px-[20px] md:px-[24px] py-[8px] md:py-[12px] border-2 border-error text-font-default bg-white">
            <FailedIcon />
            <p className="text-sm-500 md:text-md-500">
              로그인 정보가 정확하지 않은 것 같아
            </p>
          </button>
        )}
      </div>
    </>
  );
};
export default LoginPage;
