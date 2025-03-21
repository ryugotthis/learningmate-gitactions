// 커스텀 훅
import { useGetUpVoteOpinion } from '../../../entities/lectures/opinion/model';
// 컴포넌트
import { VoteCard } from './VoteCard';

export const UpVoteCard = ({
  postId,
  visibleCount,
  searchText,
  sort,
}: {
  postId: number;
  visibleCount: number;
  searchText: string;
  sort: string;
}) => {
  const { data: upVoteData } = useGetUpVoteOpinion({ postId, sort }); // 추천 글 데이터

  const opinionData = upVoteData?.content;

  return (
    <>
      <VoteCard
        title="추천"
        color="primary-default"
        postId={postId}
        opinionData={opinionData}
        // 더보기 버튼 수 관리
        visibleCount={visibleCount}
        searchText={searchText} // 검색어 관리
      />
    </>
  );
};
