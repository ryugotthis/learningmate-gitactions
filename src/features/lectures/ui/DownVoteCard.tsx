import { useGetDownVoteOpinion } from '../../../entities/lectures/opinion/model/useGetDownVoteOpinion';

import { VoteCard } from './VoteCard';

export const DownVoteCard = ({
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
  const { data: downVoteData } = useGetDownVoteOpinion({ postId, sort }); // 비추천 의견 데이터

  return (
    <>
      <VoteCard
        title="비추천"
        color="error"
        postId={postId}
        opinionData={downVoteData?.content}
        // 더보기 버튼 수 관리
        visibleCount={visibleCount}
        searchText={searchText} // 검색어 관리
      />
    </>
  );
};
