import { useGetPostLikeStatus } from '../../entities/lectures/home/hooks/useGetPostLikeStatus';
import { useDeleteLikes } from '../../entities/recomended/hooks/useDeleteLikes';
import { useCreateLikes } from '../../entities/recomended/hooks/useCreateDemandLectureLikes';

import { PostUpVoteButton } from '../../shared/ui/Components/PostUpVoteButton';

interface UpVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  likes: number;
  sort: string;
}

export const UpVoteButtonContainer = ({
  // onClick,
  // isVoteUpClicked,
  postId,
  likes,
  sort,
}: UpVoteButtonProps) => {
  // const { mutate } = usePostDemandLectureLikes();

  // const { likedPosts, toggleLike } = useLikeStore();
  // const isLiked = likedPosts instanceof Set && likedPosts.has(postId);
  // 추천 포스트 api
  const { mutate: likeMutate } = useCreateLikes(sort);
  const { mutate: unLikeMutate } = useDeleteLikes();
  const { data: postLikesStatus } = useGetPostLikeStatus(postId);

  return (
    <>
      <PostUpVoteButton
        postId={postId}
        likes={likes}
        isLikeClicked={postLikesStatus}
        likeMutate={likeMutate}
        unLikeMutate={unLikeMutate}
      />
    </>
  );
};
