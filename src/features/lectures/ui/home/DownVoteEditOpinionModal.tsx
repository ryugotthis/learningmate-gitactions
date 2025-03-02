import { useUpdateDownVoteOpinion } from '../../../../entities/lectures/home/opinion/hooks/useUpdateDownVoteOpinion ';

import { OpinionModal } from './OpinionModal';

export const DownVoteEditOpinionModal = ({
  onClose,
  opinionId, // postId를 prop으로 받아야 합니다.
  opinion,
  postId, // 낙관적 업데이트를 위해
}: {
  onClose: () => void;
  opinionId: number;
  opinion: any;
  postId: number;
}) => {
  // usePostUpVoteOpinion 훅에서 반환하는 mutate 함수를 사용합니다.
  const { mutate, isPending } = useUpdateDownVoteOpinion(postId);
  console.log('의견 수정 아이디', opinionId);

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
