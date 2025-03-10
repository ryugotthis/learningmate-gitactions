import { useGetPostLikeStatus } from '../../entities/lectures/home/hooks/useGetPostLikeStatus';
import { useCreateLikes } from '../../entities/recomended/hooks/useCreateDemandLectureLikes';
import { useDeleteLikes } from '../../entities/recomended/hooks/useDeleteLikes';
import { UpVoteIcon } from '../../shared/ui/icons/UpVoteIcon';

export const UpVoteButton2 = ({ postId }: { postId: number }) => {
  const { mutate: likeMutate } = useCreateLikes();
  const { mutate: unLikeMutate } = useDeleteLikes();
  const { data: isLikeClicked } = useGetPostLikeStatus(postId);

  const handleVoteUpButton = () => {
    if (isLikeClicked) {
      console.log('좋아요해제');
      unLikeMutate(postId);
    } else {
      likeMutate(postId);
    }
  };
  return (
    <button
      onClick={handleVoteUpButton}
      className={`flex justify-center items-center w-[64px] h-[64px] rounded-full border-2 ${
        isLikeClicked ? 'border-primary-default' : 'border-surface-line'
      } bg-white `}
    >
      <UpVoteIcon
        className={`w-[24px] h-[24px] ${
          isLikeClicked ? 'text-primary-default' : 'text-font-sub'
        }`}
      />
    </button>
  );
};
