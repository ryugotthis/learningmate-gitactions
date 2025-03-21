import { useState } from 'react';
// 데이터 커스텀 훅
import { useGetLectures } from '../../../entities/lectures/model';
import { useSearchStore } from '../model/useLectureStore';
import { useFilterList } from '../../../shared/store/filterListStore';
// 컴포넌트
import InfiniteScroll from 'react-infinite-scroller';
import { MoonLoader } from 'react-spinners';
import { LectureCardList } from '../../../widgets/lecture/ui/LectureCardList';

export const LectureCardListHomeContainer = ({ sort }: { sort: string }) => {
  const { filterList } = useFilterList(); // 선택된 플랫폼 필터 리스트
  const { searchTitle: title } = useSearchStore(); // 검색창 제목 검색어
  const {
    // 강의 데이터
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
    isError,
    error,
  } = useGetLectures({
    platforms: filterList,
    sort,
    title,
  });

  const lectures = data?.pages.flatMap((page) => page.data) || []; // 각 페이지의 데이터를 하나의 배열로 합치기

  const [manualLoadTriggered, setManualLoadTriggered] = useState(false); // 더보기 버튼 눌림 상태

  const handleManualLoad = () => {
    // 더보기 버튼누르고 무한쿼리 실행
    fetchNextPage();
    setManualLoadTriggered(true);
  };
  // 강의데이터 에러, 로딩 처리
  if (isError)
    return <div className="text-error">error: {(error as Error).message}</div>;
  if (isPending || isLoading)
    return (
      <div className="flex justify-center">
        <MoonLoader size={105} color="#17af6d" />
      </div>
    );

  return (
    <>
      {manualLoadTriggered ? (
        // 버튼 클릭 후에는 InfiniteScroll로 자동 로드
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage && !isFetchingNextPage}
          loader={<div key="loader">로딩중...</div>}
          useWindow={true}
        >
          <LectureCardList data={lectures} />
        </InfiniteScroll>
      ) : (
        // 초기엔 버튼으로 수동 로드
        <>
          <LectureCardList data={lectures} />
          <div className="mt-[50px] flex justify-center">
            {hasNextPage && (
              <button
                onClick={handleManualLoad}
                disabled={isFetchingNextPage}
                className="h-[48px] px-[24px] border border-line rounded-4xl text-font-sub text-md-600"
              >
                {isFetchingNextPage ? '로딩중...' : '더보기'}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
