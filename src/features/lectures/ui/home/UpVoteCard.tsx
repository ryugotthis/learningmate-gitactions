import { useGetUpVoteOpinion } from '../../../../entities/lectures/home/opinion/hooks/useGetUpVoteOpinion';
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
  const { data: upVoteData } = useGetUpVoteOpinion({ postId, sort });
  console.log('강의id', postId);
  console.log('여기추천데이터~!!!', upVoteData);
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
