import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../App.css';
// 커스텀 훅
import { useSignup } from '../../entities/auth/model/useSignup';
// 컴포넌트
import Header from '../../widgets/header';

import SEO from '../../shared/ui/SEO';
//아이콘
import Logo from '../../features/auth/ui/icons/Logo.svg';
import {
  Visible,
  Invisible,
  CheckBoxCheck,
  CheckBox,
  DeleteClose,
} from '../../features/auth/ui/icons';
// 이메일 검증 메서드
import {
  sendVerificationCode,
  verifyCode,
} from '../../shared/api/firebase'; //이메일 인증 코드 보내기, 검증

const SignupPage = () => {
  const { mutate: signup, isPending, error } = useSignup(); // 로그인 post 커스텀 훅
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 보이는 상태 관리
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // 비밀번호 확인 보이는 상태 관리
  // 유효성 검사
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isValid, errors },
  } = useForm({ mode: 'onChange' });

  const isTermsAccepted = watch('terms'); // 약관 동의 체크 여부 확인
  const nameValue = watch('name'); // 닉네임 입력 값 감지
  const emailValue = watch('email'); // 이메일 입력 값 감지
  const passwordValue = watch('password'); // 비밀번호 입력 값 감지
  const confirmPasswordValue = watch('confirmPassword'); // 비밀번호 확인 입력 값 감지
  const [isAuthCodeVisible, SetAuthCodeVisible] = useState(false); // 인증 코드 입력창 보이기
  // 이메일 인증
  const [code, setCode] = useState(''); // 인증 코드 입력 값
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증 코드 전송 여부
  const [isCodeValid, setIsCodeValid] = useState(false); // ✅ 인증 코드 검증 결과
  const [verificationError, setVerificationError] = useState(''); // 인증 오류 메시지
  const [countdown, setCountdown] = useState(300); // 300초 = 5분
  const [isCounting, setIsCounting] = useState(false); // 타이머 동작 여부

  const onSubmit = (data: any) => {
    // 회원가입 요청
    const { confirmPassword, terms, ...filteredData } = data;
    signup(filteredData); // 회원가입 요청
  };

  // 🔹 인증 코드 요청 (Firebase Cloud Functions 호출)
  const handleSendCode = async () => {
    const email = watch('email'); // 이메일 값받아서 firebase로 보내기
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    SetAuthCodeVisible(true);
    try {
      await sendVerificationCode({ email }); // watch('email') 사용
      setIsCodeSent(true);
      setCountdown(300); // 5분 초기화
      setIsCounting(true); // 카운트다운 시작
      // alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      alert('오류 발생: ' + error);
    }
  };

  // 🔹 사용자가 인증 코드를 입력할 때마다 검증 실행
  useEffect(() => {
    const verify = async () => {
      if (code.length === 6) {
        // 인증 코드는 6자리 숫자
        // 새 코드 입력 시 이전 에러 메시지 초기화
        setVerificationError('');

        try {
          const response = await verifyCode({ email: emailValue, code });
          if (response.data.success) {
            //  응답 데이터 검증
            setIsCodeValid(true);
            setVerificationError(''); // 오류 메시지 초기화
          } else {
            setIsCodeValid(false);
            setVerificationError('잘못된 인증 코드입니다.');
          }
        } catch (error) {
          setIsCodeValid(false);
          setVerificationError('잘못된 인증 코드입니다.');
        }
      } else {
        setIsCodeValid(false);
        setVerificationError('');
      }
    };

    if (isCodeSent) {
      verify();
    }
  }, [code, emailValue, isCodeSent]);

  // 🔹 5분 카운트다운 기능
  useEffect(() => {
    let timer: number; // ✅ 수정!
  if (isCounting && countdown > 0) {
    timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  } else if (countdown === 0) {
    setIsCounting(false);
  }

    return () => clearInterval(timer);
  }, [isCounting, countdown]);
  // 🔹 초를 MM:SS 형식으로 변환하는 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <>
      <SEO
        title="회원가입 - 러닝메이트"
        description="새 계정을 만들고 러닝메이트를 시작하세요!"
        image="Logo.png"
        url="signup"
        type="website"
      />
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
                  : 'border-surface-line '
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
                    ? ' border-surface-line'
                    : errors.email
                    ? 'border-error bg-white'
                    : 'border-surface-line '
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
                  className="w-full pl-5 py-3 bg-white placeholder-placeholder border-none outline-none rounded-4xl flex-1"
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
                onClick={handleSendCode}
                className="py-2 px-5 bg-tertiary text-white font-semibold rounded-4xl hover:bg-font transition whitespace-nowrap"
              >
                {isCodeSent ? '재전송' : '인증 요청'}
              </button>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 pl-2">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          {/* 이메일 인증코드 */}
          {isAuthCodeVisible && (
            <div>
              <label
                htmlFor="authcode"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                인증코드
              </label>
              <div className="relative">
                <div
                  className={`flex items-center border px-[20px] py-[12px] ${
                    isCodeValid
                      ? ' border-surface-line'
                      : verificationError
                      ? 'border-error bg-white'
                      : 'border-surface-line'
                  } rounded-4xl flex-grow`}
                >
                  <input
                    type="text"
                    id="authcode"
                    placeholder="인증 코드 6자리"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setVerificationError('');
                    }}
                    className="w-full border-none outline-none rounded-4xl flex-1"
                  />
                  {/* 제한시간*/}
                  <div className="text-error font-medium tracking-[-0.05em]">
                    {formatTime(countdown)}
                  </div>
                </div>
                {/* 에러 메시지 */}
                <div className="px-[8px] text-font-sub text-sm-400">
                  {verificationError ? (
                    <span className="text-error">
                      인증코드가 잘못됐어! 다시 입력해봐
                    </span>
                  ) : isCodeValid ? (
                    <span className="text-primary">
                      인증이 완료됐어!
                    </span>
                  ) : (
                    <span>인증코드를 보냈어! 이메일을 확인해봐</span>
                  )}
                </div>
              </div>
            </div>
          )}

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
              className="flex items-center text-sm text-font cursor-pointer"
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
            disabled={isPending || !isValid || !isTermsAccepted || !isCodeValid}
            className={`w-full mt-3 py-3 font-semibold rounded-4xl transition
              bg-primary text-white hover:cursor-pointer        
           disabled:bg-disabled disabled:text-font-sub`}
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
export default SignupPage;
