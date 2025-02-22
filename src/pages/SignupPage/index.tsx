import { useRef, useState } from 'react';
import { useSignup } from '../../entities/auth/hooks/useSignup';
import '../../App.css';
import Visible from '../../entities/auth/ui/icons/Visible.svg';
import Invisible from '../../entities/auth/ui/icons/Unvisible.svg';
import Logo from '../../entities/auth/ui/icons/Logo.svg';
import DeleteClose from '../../entities/auth/ui/icons/DeleteClose.svg';
import CheckBox from '../../entities/auth/ui/icons/Checkbox.svg';
import CheckBoxCheck from '../../entities/auth/ui/icons/CheckboxCheck.svg';
import { useForm } from 'react-hook-form';
import Header from '../../widgets/header';

export const SignupPage = () => {
  const { mutate: signup, isPending, error } = useSignup();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const onSubmit = (data: any) => {
    const { confirmPassword, terms, ...filteredData } = data;
    // const modifiedData = {
    //   ...filteredData,
    //   userId: email,
    // };
    console.log('회원가입보낸데이터', filteredData);
    // e.preventDefault();

    signup(filteredData); // 회원가입 요청
  };
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm({ mode: 'onChange' });

  const isTermsAccepted = watch('terms'); // 약관 동의 체크 여부 확인
  const nameValue = watch('name'); // 닉네임 입력 값 감지
  const emailValue = watch('email'); // 이메일 입력 값 감지
  const passwordValue = watch('password'); // 비밀번호 입력 값 감지
  const confirmPasswordValue = watch('confirmPassword'); // 비밀번호 확인 입력 값 감지

  return (
    <>
      <Header />
      <div className="container flex flex-col items-center mx-auto mt-10 max-w-lg py-10 px-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">회원가입</h2>
        <button className="flex justify-center w-full py-3 px-4 bg-logo text-black rounded-4xl hover:bg-yellow-600 transition mb-6">
          <img src={Logo} alt="logo" />
          <span className="ml-3 font-bold">카카오로 간편 회원가입</span>
        </button>

        <div className="relative flex items-center w-full my-6">
          {/* 선 */}
          <div className="flex-grow  border-t border-line"></div>
          {/* 가운데 텍스트 */}
          <span className="mx-4 text-gray-400 text-xs">또는</span>
          {/* 선 */}
          <div className="flex-grow border-t border-line"></div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              닉네임
            </label>
            <input
              type="text"
              id="name"
              placeholder="한글, 영문 소문자, 숫자 2-20자"
              {...register('name', {
                required: '닉네임을 입력해주세요!',
                pattern: {
                  value: /^[a-z0-9가-힣]{2,20}$/,
                  message: '닉네임은 한글, 영문 소문자, 숫자로 2-20자여야 해!',
                },
              })}
              className={`w-full py-3 pl-5 border rounded-4xl placeholder-placeholder outline-none transition
              ${
                !nameValue
                  ? 'bg-white border-surface-line'
                  : errors.name
                  ? 'border-error bg-white'
                  : 'border-surface-line bg-surface-dark'
              }`}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1 pl-2">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              이메일
            </label>
            <div className="flex gap-2">
              {/* 이메일 입력 필드 + X 버튼 */}
              <div
                className={`flex items-center border ${
                  !emailValue
                    ? 'bg-white border-surface-line'
                    : errors.email
                    ? 'border-error bg-white'
                    : 'border-surface-line bg-surface-dark'
                } rounded-4xl flex-grow`}
              >
                <input
                  type="text"
                  id="email"
                  placeholder="learningmate@gmail.com"
                  // value={formData.userId}
                  {...register('email', {
                    required: '이메일은 필수 입력입니다.',
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: '이메일 형식에 맞지 않습니다.',
                    },
                  })}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, userId: e.target.value })
                  // }
                  className="w-full pl-5 py-3 placeholder-placeholder border-none outline-none rounded-4xl flex-1"
                />

                {/* X 버튼 */}
                <button
                  type="button"
                  onClick={() => reset({ email: '' })}
                  className="px-3 text-gray-500 hover:text-black"
                >
                  <img src={DeleteClose} alt="deleteClose" />
                </button>
              </div>

              {/* 인증 요청 버튼 */}
              <button
                type="button"
                className="py-2 px-5 bg-tertiary-default text-white font-semibold rounded-4xl hover:bg-blue-600 transition whitespace-nowrap"
              >
                인증 요청
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 pl-2">
                {String(errors.email.message)}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              비밀번호
            </label>
            <div className="relative">
              <div
                className={`flex items-center border ${
                  !passwordValue
                    ? 'bg-white border-surface-line'
                    : errors.password
                    ? 'border-error bg-white'
                    : 'border-surface-line bg-surface-dark'
                } rounded-4xl flex-grow`}
              >
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="영문 소문자, 숫자, 특수문자 모두 포함 8-20자"
                  {...register('password', {
                    required: '비밀번호는 필수 입력이야!',
                    minLength: {
                      value: 8,
                      message:
                        '비밀번호는 8-20자의 영문 소문자,숫자,특수문자로 써야 해!',
                    },
                    maxLength: {
                      value: 20,
                      message:
                        '비밀번호는 8-20자의 영문 소문자,숫자,특수문자로 써야 해!',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&^])[a-z\d@$!%*#?&^]{8,20}$/,
                      message:
                        '비밀번호는 8-20자의 영문 소문자,숫자,특수문자로 써야 해!',
                    },
                  })}
                  className="w-full pl-5 py-3 border-none outline-none rounded-4xl placeholder-placeholder flex-1"
                />
                {/* 눈 버튼 */}
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="px-3 cursor-pointer"
                >
                  <img
                    src={isPasswordVisible ? Invisible : Visible}
                    alt="visibleIcon"
                  />
                </button>
              </div>
              {/* 에러 메시지 */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 pl-2">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-bold text-gray-700 mb-1"
            >
              비밀번호 확인
            </label>
            <div className="relative">
              <div
                className={`flex items-center border ${
                  !confirmPasswordValue
                    ? 'bg-white border-surface-line'
                    : errors.confirmPassword
                    ? 'border-error bg-white'
                    : 'border-surface-line bg-surface-dark'
                } rounded-4xl flex-grow`}
              >
                <input
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  id="confirm-password"
                  placeholder="비밀번호를 확인해주세요"
                  {...register('confirmPassword', {
                    required: '비밀번호 확인은 필수 입력이야!',
                    validate: (value) =>
                      value === watch('password') ||
                      '비밀번호를 다시 한 번 확인해줘 😀',
                  })}
                  className="w-full pl-5 py-3 border-none outline-none rounded-4xl placeholder-placeholder flex-1"
                />
                {/* 눈 버튼 */}
                <button
                  type="button"
                  onClick={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  className="px-3 cursor-pointer"
                >
                  <img
                    src={isConfirmPasswordVisible ? Invisible : Visible}
                    alt="visibleIcon"
                  />
                </button>
              </div>
              {/* 에러 메시지 */}
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 pl-2">
                  {String(errors.confirmPassword.message)}
                </p>
              )}
            </div>
          </div>

          {/* 약관 동의 체크박스 */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="terms"
              className="flex items-center text-sm text-font-default cursor-pointer"
            >
              <input
                type="checkbox"
                id="terms"
                {...register('terms', {
                  required: '약관에 동의해야 회원가입이 가능합니다.',
                })}
                className="peer hidden"
              />
              <span className="peer-checked:hidden">
                <img src={CheckBox} alt="Unchecked box" />
              </span>
              <span className="hidden peer-checked:inline">
                <img src={CheckBoxCheck} alt="Checked box" />
              </span>
              <span className="ml-2">
                저는 <span className="underline">러닝메이트의 서비스약관</span>,{' '}
                <span className="underline">개인정보 보호정책</span>에
                동의합니다.
              </span>
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1 pl-2">
                {String(errors.terms.message)}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending || !isValid || !isTermsAccepted}
            className={`w-full mt-3 py-3 font-semibold rounded-4xl transition
              bg-primary-default text-white hover:cursor-pointer        
           disabled:bg-disabled disabled:text-font-sub-default`}
          >
            {isPending ? 'Signing up...' : '회원가입'}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4">
            회원가입 실패: {error.message}
          </p>
        )}
      </div>
    </>
  );
};
