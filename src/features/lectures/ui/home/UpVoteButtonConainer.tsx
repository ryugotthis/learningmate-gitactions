import { OpinionUpVoteButton } from '../../../../shared/ui/Components/OpinionUpVoteButton';
import { useCreateUpVoteLike } from '../../../../entities/lectures/home/opinion/hooks/useCreateUpVoteLike';
import { useGetUpVoteLikeState } from '../../../../entities/lectures/home/opinion/hooks/useGetUpVoteLikeState';
import { useDeleteUpVoteLike } from '../../../../entities/lectures/home/opinion/hooks/useDeleteUpVoteLike';

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
  console.log('추천 데이터 확인', likes);
  console.log('클릭 확인', postLikesStatus);
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
