import { useGetDownVoteOpinion } from '../../../../entities/lectures/home/opinion/hooks/useGetDownVoteOpinion';

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
  const { data: downVoteData } = useGetDownVoteOpinion({ postId, sort });
  console.log('비추천 글확인!!:', downVoteData);

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
