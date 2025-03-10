import { OpinionUpVoteButton } from '../../../../shared/ui/Components/OpinionUpVoteButton';

import { useDeleteDownVoteLike } from '../../../../entities/lectures/home/opinion/hooks/useDeleteDownVoteLike';
import { useCreateDownVoteLike } from '../../../../entities/lectures/home/opinion/hooks/useCreateDownVoteLike';
import { useGetDownVoteLikeState } from '../../../../entities/lectures/home/opinion/hooks/useGetDownVoteLikeState ';

interface DownVoteButtonProps {
  // onClick: () => void;
  // isVoteUpClicked: boolean;
  postId: number;
  opinionId: number;
  likes: number;
}

// 추천 버튼의 post,delete,postState mutate 로직 반영
export const DownVoteButtonContainer = ({
  postId,
  opinionId,
  likes,
}: DownVoteButtonProps) => {
  // 추천 포스트 api
  const { mutate: likeMutate } = useCreateDownVoteLike(postId);
  const { mutate: unLikeMutate } = useDeleteDownVoteLike(postId);
  const { data: postLikesStatus } = useGetDownVoteLikeState(opinionId);
  console.log('비추천 데이터 확인', likes);
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
