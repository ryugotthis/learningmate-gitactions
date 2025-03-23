// 컴포넌트
import { PostUpVoteButton } from '../../../shared/ui/PostUpVoteButton';
// 커스텀 훅

import {
  useCreateLikes,
  useDeleteLikes,
  useGetPostLikeStatus,
} from '../../../entities/likes/model';

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
