import { useReissue } from '../../../entities/auth/hooks/useReissue';
import { useAuthStore } from '../../store/authstore';
import { UpIcon } from '../icons/UpIcon';

interface UpVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  likes: number;

  isLikeClicked: any;
  likeMutate: any;
  unLikeMutate: any;
}

export const PostUpVoteButton = ({
  // onClick,
  // isVoteUpClicked,
  postId,
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
            unLikeMutate(postId);
          } else {
            likeMutate(postId);
          }
        },
        onError: (error) => {
          // reissue 실패 시 페이지 이동 (예: 로그인 페이지)
          console.error('reissue 실패', error);
          alert('로그인이 필요해');
        },
      });
    }
    if (isLoggedIn) {
      // reissue 호출
      reissue(undefined, {
        onSuccess: () => {
          // reissue가 성공하면, 현재 토글 상태에 따라 북마크 생성 또는 삭제
          if (isLikeClicked) {
            console.log('좋아요해제');
            unLikeMutate(postId);
          } else {
            likeMutate(postId);
          }
        },
        onError: (error) => {
          // reissue 실패 시 페이지 이동 (예: 로그인 페이지)
          console.error('reissue 실패', error);
          alert('로그인이 필요해');
        },
      });
    }
  };
  return (
    <>
      <button
        onClick={handleVoteUpButton}
        className={`flex w-[52px] md:w-[64px] h-[68px] md:h-[92px] flex-col justify-center gap-1 items-center border-2 rounded-4xl ${
          isLikeClicked ? 'border-primary-default' : 'border-surface-line'
        }`}
      >
        <UpIcon className="text-surface-line w-3" />
        <span className="text-sm-600 md:text-md-600">{likes}</span>
      </button>
    </>
  );
};
