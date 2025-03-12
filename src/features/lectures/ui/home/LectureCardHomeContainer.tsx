import { useState } from 'react';
import { useGetLectures } from '../../../../entities/lectures/home/hooks/useGetLectures';
import { LectureCardList } from '../LectureCardList';
import InfiniteScroll from 'react-infinite-scroller';
import { useSearchStore } from '../../model/useLectureStore';

export const LectureCardListHomeContainer = ({ sort }: { sort: string }) => {
  // const { data: lecture } = useGetLectures();
  // console.log('강의모든 데이터:', lecture);
  const { searchTitle: title } = useSearchStore(); // 검색창 제목 검색어
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetLectures({ sort, title });
  // 각 페이지의 데이터를 하나의 배열로 합치기
  const lectures = data?.pages.flatMap((page) => page.data) || [];

  // 최초 로드 후 상태를 결정할 state
  const [manualLoadTriggered, setManualLoadTriggered] = useState(false);

  const handleManualLoad = () => {
    fetchNextPage();
    setManualLoadTriggered(true);
  };

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
                {isFetchingNextPage ? 'Loading...' : '더보기'}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};
