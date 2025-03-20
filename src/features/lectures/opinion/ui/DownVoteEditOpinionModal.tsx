import { useUpdateDownVoteOpinion } from '../../../../entities/lectures/opinion/model/useUpdateDownVoteOpinion ';

import { OpinionModal } from './OpinionModal';

export const DownVoteEditOpinionModal = ({
  onClose,
  opinionId,
  opinion,
  postId, // 낙관적 업데이트를 위해 postId를 prop으로 받음
}: {
  onClose: () => void;
  opinionId: number;
  opinion: any;
  postId: number;
}) => {
  const { mutate, isPending } = useUpdateDownVoteOpinion(postId); // 비추천 의견 수정

  return (
    <>
      <OpinionModal
        onClose={onClose}
        opinion={opinion}
        postId={opinionId}
        mutate={mutate}
        isPending={isPending}
        type="비추천"
      />
    </>
  );
};
