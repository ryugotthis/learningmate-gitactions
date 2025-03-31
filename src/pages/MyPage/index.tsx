import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
// 컴포넌트
import Header from '../../widgets/header';
import SEO from '../../shared/ui/SEO';
// 커스텀 훅
import { useGetUser } from '../../entities/auth/model/useGetUser ';
import { useCreateProfileImage } from '../../entities/auth/model/useCreateProfileImage';
import { useDeleteProfileImage } from '../../entities/auth/model/useDeleteProfileImage';
import { useUpdatePassword } from '../../entities/auth/model/useUpdatePassword';
import { useLogout } from '../../entities/auth/model/useLogout';
// 아이콘
import { ProfileIcon } from '../../shared/ui/icons';
import { PhotoRegisterIcon } from './ui/icons/PhotoRegisterIcon';
import { Visible, Invisible } from '../../features/auth/ui/icons';

const MyPage = () => {
  const [isToggled, setIsToggled] = useState(false); // 프로필 이미지 바꾸기 토글

  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 눈
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // 비밀번호 확인 눈
  const { data } = useGetUser(); // 사용자 정보 데이터
  const [user, setUser] = useState(data);
  // 버튼 요소에 접근하기 위한 ref 생성
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  // 파일 input 요소에 접근하기 위한 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createProfileImage } = useCreateProfileImage(); // 프로파일 이미지 변경 mutate
  const { mutate: deleteProfileImage } = useDeleteProfileImage(); // 프로파일 이미지 삭제
  const { mutate: updatePassword } = useUpdatePassword(); // 비밀번로 변경
  const { mutate: logout } = useLogout(); // 로그아웃

  // "이미지 등록" li 클릭 시 파일 선택 창 열기
  const handleImageRegisterClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageDelete = () => {
    deleteProfileImage();
  };

  // 파일 선택 후 처리
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // FormData 객체 생성 및 파일 추가
      const formData = new FormData();
      formData.append('profileImage', file);

      // FormData의 내용을 확인하기 위한 코드
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // useMutation의 mutate 함수 호출하여 이미지 업로드 API 요청
      createProfileImage(formData);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        // 버튼 요소가 존재하고, 클릭된 요소가 그 내부에 포함되어 있지 않다면
        toggleButtonRef.current && // 버튼 요소가 존재하는지
        !toggleButtonRef.current.contains(event.target as Node) // 클릭 이벤트가 발생한 요소(event.target)가 버튼 요소 내부에 있는지
      ) {
        setIsToggled(false);
      }
    };
    // 프로파일 이미지 변경 버튼을 제외한 나머지에 클릭했을때 메뉴 숨기기 위해 사용
    document.addEventListener('mousedown', handleClickOutside); // 브라우저의 전체 문서(document)에 "mousedown" 이벤트 리스너를 등록
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); //  이벤트 리스너를 제거
    };
  }, []);

  useEffect(() => {
    console.log('유저데이터', data);
    setUser(data);
  }, [data]);

  const onSubmit = (data: any) => {
    const { newPassword } = data;

    // e.preventDefault();
    updatePassword({ password: newPassword });
    logout();
  };
  const {
    register,
    handleSubmit,
    // reset,
    watch,
    formState: { isValid, errors },
  } = useForm({ mode: 'onChange' });
  // const newPasswordValue = watch('newPassword'); // 비밀번호 입력 값 감지
  // const confirmNewPasswordValue = watch('confirmNewPassword'); // 비밀번호 확인 입력 값 감지

  return (
    <div>
      <SEO
        title="마이페이지 - 러닝메이트"
        description="마이페이지"
        image="Logo.png"
        url="my-page"
        type="website"
      />
      {/* <div onClick={() => setIsToggled(false)}> */}
      <Header />
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-[40px] md:gap-0 justify-between w-[328px] md:w-[600px] md:h-[800px] mt-[40px] md:mt-[100px] px-[16px] py-[40px] md:px-[40px] bg-white border-0 md:border md:border-line md:rounded-[12px] md:shadow-sm">
          <div className="flex flex-col gap-[40px] md:gap-[60px]">
            <h1 className="title-md-600 md:title-lg-600">마이페이지</h1>

            {/* 프로필 이미지 섹션 */}
            <div className="flex flex-col md:flex-row md:items-center gap-[8px] md:gap-[32px]">
              <span className="text-sm-400 md:text-lg-500 text-font-default">
                프로필 이미지
              </span>
              <div
                className=""

                // onClick={handleProfileClick}
              >
                <div className="relative w-[100px]">
                  {user?.profileImage ? (
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden ">
                      <img
                        src={user?.profileImage}
                        alt="프로필 이미지"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    // 기본 이미지가 없을 때 ProfileIcon을 사용
                    <ProfileIcon className="object-cover w-full h-full" />
                  )}
                  <button
                    ref={toggleButtonRef}
                    onClick={() => setIsToggled(true)}
                    className="absolute bottom-0 right-0"
                  >
                    {/* 숨긴 파일 input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept="image/*"
                    />

                    <PhotoRegisterIcon className=" text-font-sub" />
                    {isToggled && (
                      <>
                        <ul className="absolute top-0 left-0 ml-[40px] w-[121px] py-[8px] rounded-[12px] text-font-sub tracking-[-0.05em] bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                          {/* "이미지 등록" li 클릭 시 파일 선택 창을 트리거 */}
                          <li
                            onClick={handleImageRegisterClick}
                            className="px-[16px] py-[10px]"
                          >
                            이미지 등록
                          </li>
                          <li
                            onClick={handleImageDelete}
                            className="px-[16px] py-[10px]"
                          >
                            기본 이미지
                          </li>
                        </ul>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 닉네임 / 이메일 입력 섹션 */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-[16px] md:gap-[12px]"
            >
              <div className="flex flex-col md:flex-row gap-[8px] md:gap-[32px] h-[48px] md:items-center">
                <label className="w-[120px] tracking-[-0.05em] text-font-sub">
                  닉네임
                </label>
                <span className="tracking-[-0.05em] font-semibold text-font-default">
                  {user?.name}
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-[8px] md:gap-[32px] h-[48px] md:items-center">
                <label className="w-[120px] tracking-[-0.05em] text-font-sub">
                  이메일
                </label>
                <span className="tracking-[-0.05em] font-semibold text-font-default">
                  {user?.email}
                </span>
              </div>
              <div className="flex flex-col md:flex-row gap-[8px] md:gap-[32px] md:h-[48px] md:items-center">
                <label
                  htmlFor="password"
                  className="w-[120px] tracking-[-0.05em] text-font-sub"
                >
                  기존 비밀번호
                </label>
                <div className="flex flex-1 border border-line px-[20px] py-[12px] rounded-4xl">
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    // value={currentPassword}
                    // onChange={(e) => setCurrentPassword(e.target.value)}
                    id="password"
                    className="flex-1"
                    placeholder="기존 비밀번호"
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
              <div className="flex flex-col md:flex-row gap-[8px] md:gap-[32px] md:h-[48px]  md:items-center">
                <label
                  htmlFor="new-password"
                  className="w-[120px] tracking-[-0.05em] text-font-sub"
                >
                  새 비밀번호
                </label>
                <div className="flex-1 flex flex-col gap-[8px]">
                  <div className="flex border border-line px-[20px] py-[12px] rounded-4xl">
                    <input
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      // value={newPassword}
                      // onChange={(e) => setNewPassword(e.target.value)}
                      id="new-password"
                      className="flex-1"
                      placeholder="새 비밀번호"
                      {...register('newPassword', {
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
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setIsNewPasswordVisible(!isNewPasswordVisible)
                      }
                      className=""
                    >
                      <img
                        src={isNewPasswordVisible ? Invisible : Visible}
                        alt="visible"
                      />
                    </button>
                  </div>
                  {/* 에러 메시지 */}

                  {errors.newPassword && (
                    <p className="text-error text-[14px] px-[8px] tracking-[-0.05em]">
                      {String(errors.newPassword.message)}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-[8px] md:gap-[32px] md:h-[48px] md:items-center">
                <label
                  htmlFor="confirm-password"
                  className="w-[120px] tracking-[-0.05em] text-font-sub"
                >
                  새 비밀번호 확인
                </label>
                <div className="flex-1 flex flex-col gap-[8px]">
                  <div className="flex  border border-line px-[20px] py-[12px] rounded-4xl">
                    <input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      id="confirm-password"
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                      className="flex-1"
                      placeholder="새 비밀번호 확인"
                      {...register('confirmNewPassword', {
                        required: '비밀번호 확인은 필수 입력이야!',
                        validate: (value) =>
                          value === watch('newPassword') ||
                          '비밀번호를 다시 한 번 확인해줘 😀',
                      })}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className=""
                    >
                      <img
                        src={isConfirmPasswordVisible ? Invisible : Visible}
                        alt="visible"
                      />
                    </button>
                  </div>
                  {/* 에러 메시지 */}
                  {errors.confirmNewPassword && (
                    <p className="text-error text-[14px] px-[8px] tracking-[-0.05em]">
                      {String(errors.confirmNewPassword.message)}
                    </p>
                  )}
                </div>
              </div>

              {/* 비밀번호 변경 버튼 */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!isValid}
                  // onClick={handleChangePassword}
                  className="h-[40px] px-[24px] border-2 border-primary-default text-primary-default rounded-4xl font-semibold text-[14px]"
                >
                  비밀번호 변경
                </button>
              </div>
            </form>
          </div>
          {/* 회원탈퇴 버튼 */}
          <div className="flex items-center justify-end">
            <button
              // onClick={handleWithdraw}
              className="h-[40px] px-[24px] text-font-sub text-[14px] font-semibold"
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
