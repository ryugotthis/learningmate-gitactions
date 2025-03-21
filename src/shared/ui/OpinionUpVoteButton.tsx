// 커스텀 훅
import { useReissue } from '../../entities/auth/model/useReissue';
import { useAuthStore } from '../store/authstore';
// 아이콘
import { UpIcon } from './icons';

interface UpVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  likes: number;
  opinionId: number;
  isLikeClicked: any;
  likeMutate: any;
  unLikeMutate: any;
}

// 강의 게시글의 추천글을 위한 버튼
const OpinionUpVoteButton = ({
  // onClick,
  // isVoteUpClicked,
  opinionId,
  likes,
  isLikeClicked,
  likeMutate,
  unLikeMutate,
}: UpVoteButtonProps) => {
  const { isLoggedIn } = useAuthStore();
  const { mutate: reissue } = useReissue();
  const handleVoteUpButton = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요해');
    }
    if (isLoggedIn) {
      // reissue 호출
      reissue(undefined, {
        onSuccess: () => {
          // reissue가 성공하면, 현재 토글 상태에 따라 북마크 생성 또는 삭제
          if (isLikeClicked) {
            console.log('좋아요해제');
            unLikeMutate(opinionId);
          } else {
            likeMutate(opinionId);
          }
          // 토글 상태 업데이트
          // setIsToggled((prev) => !prev);
          // console.log('북마크 요청 postId:', postId);
        },
        onError: (error) => {
          // reissue 실패 시 페이지 이동 (예: 로그인 페이지)
          console.error('reissue 실패', error);
          alert('로그인이 필요해');
        },
      });
    }

    // toggleLike(postId);
    // console.log('추천버튼클릭상태 처리후:', isLiked);
  };
  return (
    <>
      <button
        onClick={handleVoteUpButton}
        className={`flex w-[52px] md:w-[64px] h-[68px] md:h-[92px] flex-col justify-center gap-1 items-center border-2 rounded-4xl cursor-pointer ${
          isLikeClicked ? 'border-primary-default' : 'border-surface-line'
        }`}
      >
        <UpIcon className="text-surface-line w-[24px]" />
        <span className="text-sm-600 md:text-md-600">{likes}</span>
      </button>
    </>
  );
};
export default OpinionUpVoteButton;
