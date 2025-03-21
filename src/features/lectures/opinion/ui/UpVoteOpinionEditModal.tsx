// 커스텀 훅
import { useUpdateUpVoteOpinion } from '../../../../entities/lectures/opinion/model';
// 컴포넌트
import { OpinionModal } from './OpinionModal';

export const UpVoteEditOpinionModal = ({
  onClose,
  opinionId,
  opinion,
  postId, // 낙관적 업데이트를 위해 postId를 prop으로 받아야 함
}: {
  onClose: () => void;
  opinionId: number;
  opinion: any;
  postId: number;
}) => {
  const { mutate, isPending } = useUpdateUpVoteOpinion(postId); // 추천 의견 글 수정 update

  return (
    <>
      <OpinionModal
        onClose={onClose}
        opinion={opinion}
        postId={opinionId}
        mutate={mutate}
        isPending={isPending}
        type="추천"
      />
    </>
  );
};
