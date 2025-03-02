import { useCreateUpVoteOpinion } from '../../../../entities/lectures/home/opinion/hooks/useCreateUpVoteOpinion';
import { OpinionModal } from './OpinionModal';

export const UpVoteOpinionModal = ({
  onClose,
  postId, // postId를 prop으로 받아야 합니다.
}: {
  onClose: () => void;
  postId: number;
}) => {
  // usePostUpVoteOpinion 훅에서 반환하는 mutate 함수를 사용합니다.
  const { mutate, isPending } = useCreateUpVoteOpinion(postId);

  return (
    <>
      <OpinionModal
        onClose={onClose}
        postId={postId}
        mutate={mutate}
        isPending={isPending}
        type="추천"
      />
    </>
  );
};
