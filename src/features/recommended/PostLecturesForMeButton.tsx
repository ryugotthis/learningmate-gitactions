import { useNavigate } from 'react-router-dom';
import PlusIcon from '../../widgets/header/ui/icons/PlusIcon';
import { useReissue } from '../../entities/auth/hooks/useReissue';
import { useAuthStore } from '../../shared/model/store';

export const PostLectureForMeButton = () => {
  const navigate = useNavigate();
  const { mutate } = useReissue();
  const { isLoggedIn } = useAuthStore();

  const handlePostLectureForMeButton = () => {
    if (!isLoggedIn) {
      console.log('🚨 로그아웃 상태입니다. 로그인 페이지로 이동합니다.');
      navigate('/login'); // ✅ 로그아웃 상태면 로그인 페이지로 이동
      return;
    }

    mutate(undefined, {
      onSuccess: () => {
        console.log('🔹 리이슈 성공! 글 등록 페이지로 이동합니다.');
        navigate('/lectures-for-me/new'); // ✅ 성공 시 글쓰기 페이지 이동
      },
      onError: (error) => {
        console.error('🚨 리이슈 실패:', error);
        navigate('/login'); // ✅ 리이슈 실패 시 로그인 페이지로 이동
      },
    });
  };

  // const navigate = useNavigate();
  //리이슈 api 받아오기
  // const { mutate } = usePostDemandLectureLikes();
  return (
    <>
      <button
        onClick={handlePostLectureForMeButton}
        className="flex items-center h-[48px] gap[4px] px-[24px] py-[12px] text-white bg-primary-default rounded-4xl"
      >
        <PlusIcon className=" mr-1" />
        <p className="text-[16px] font-semibold cursor-pointer">글 등록</p>
      </button>
    </>
  );
};
