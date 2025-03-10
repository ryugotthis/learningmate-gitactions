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
  const handleVoteUpButton = () => {
    if (isLikeClicked) {
      console.log('좋아요해제');
      unLikeMutate(postId);
    } else {
      likeMutate(postId);
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
