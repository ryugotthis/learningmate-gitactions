import { UpIcon } from '../icons/UpIcon';

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
export const OpinionUpVoteButton = ({
  // onClick,
  // isVoteUpClicked,
  opinionId,
  likes,
  isLikeClicked,
  likeMutate,
  unLikeMutate,
}: UpVoteButtonProps) => {
  const handleVoteUpButton = () => {
    // console.log('추천버튼클릭상태:', isLiked);
    if (isLikeClicked) {
      console.log('좋아요해제');
      unLikeMutate(opinionId);
    } else {
      likeMutate(opinionId);
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
