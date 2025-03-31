// 컴포넌트
import { OpinionUpVoteButton } from '../../../shared/ui';
// 커스텀 훅
import {
  useGetUpVoteLikeState,
  useCreateUpVoteLike,
  useDeleteUpVoteLike,
} from '../../../entities/lectures/opinion/likes/model';

interface UpVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  opinionId: number;
  likes: number;
}

// 추천 버튼의 post,delete,postState mutate 로직 반영
export const UpVoteButtonContainer = ({
  postId,
  opinionId,
  likes,
}: UpVoteButtonProps) => {
  // 추천 포스트 api
  const { mutate: likeMutate } = useCreateUpVoteLike(postId);
  const { mutate: unLikeMutate } = useDeleteUpVoteLike(postId);
  const { data: postLikesStatus } = useGetUpVoteLikeState(opinionId);

  return (
    <>
      {/* 강의 게시글 의견 추천버튼 */}
      <OpinionUpVoteButton
        opinionId={opinionId}
        postId={postId}
        likes={likes}
        isLikeClicked={postLikesStatus}
        likeMutate={likeMutate}
        unLikeMutate={unLikeMutate}
      />
    </>
  );
};
