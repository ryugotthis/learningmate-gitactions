import { useFetchPostLikeStatus } from '../../entities/lectures/hooks/useFetchPostLikeStatus';
import { useDeleteLikes } from '../../entities/recomended/hooks/useDeleteLikes';
import { usePostDemandLectureLikes } from '../../entities/recomended/hooks/usePostDemandLectureLikes';
import { useLikeStore } from '../../shared/model/store';
import { UpIcon } from '../../shared/ui/icons/UpIcon';

interface UpVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  likes: number;
}

export const UpVoteButton = ({
  // onClick,
  // isVoteUpClicked,
  postId,
  likes,
}: UpVoteButtonProps) => {
  // const { mutate } = usePostDemandLectureLikes();

  // const { likedPosts, toggleLike } = useLikeStore();
  // const isLiked = likedPosts instanceof Set && likedPosts.has(postId);
  // 추천 포스트 api
  const { mutate: likeMutate } = usePostDemandLectureLikes();
  const { mutate: unlikeMutate } = useDeleteLikes();
  const { data: postLikesStatus } = useFetchPostLikeStatus(postId);

  console.log('상태가궁그매', `포스트번호는${postId}`, postLikesStatus);
  const handleVoteUpButton = (postId: number) => {
    // console.log('추천버튼클릭상태:', isLiked);
    if (postLikesStatus) {
      console.log('좋아요해제');
      unlikeMutate(postId);
    } else {
      likeMutate(postId);
    }
    // toggleLike(postId);
    // console.log('추천버튼클릭상태 처리후:', isLiked);
  };
  return (
    <>
      <button
        onClick={() => handleVoteUpButton(postId)}
        className={`flex w-[64px] h-[92px] flex-col justify-center gap-1 items-center text-sm border-2 rounded-4xl cursor-pointer ${
          postLikesStatus ? 'border-primary-default' : 'border-surface-line'
        }`}
      >
        <UpIcon className="text-surface-line w-3" />
        <span>{likes}</span>
      </button>
    </>
  );
};
