import { useGetPostLikeStatus } from '../../../entities/lectures/model/useGetPostLikeStatus';
import { PostUpVoteButton } from '../../../shared/ui/PostUpVoteButton';
import { useCreateLikes } from '../../../entities/demandLectures/model/useCreateDemandLectureLikes';
import { useDeleteLikes } from '../../../entities/demandLectures/model/useDeleteLikes';

interface UpVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  likes: number;
  // sort?: string;
}

export const UpVoteButtonContainer = ({
  // onClick,
  // isVoteUpClicked,
  postId,
  likes,
}: // sort = 'likes',
UpVoteButtonProps) => {
  // const { mutate } = usePostDemandLectureLikes();

  // const { likedPosts, toggleLike } = useLikeStore();
  // const isLiked = likedPosts instanceof Set && likedPosts.has(postId);
  // 추천 포스트 api
  const { mutate: likeMutate } = useCreateLikes();
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
