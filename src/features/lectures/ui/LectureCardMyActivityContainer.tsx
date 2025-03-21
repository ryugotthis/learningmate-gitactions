import { useEffect, useState } from 'react';
// 데이터 커스텀 훅
import { useGetBookMark } from '../../../entities/bookmarks/model';
import { useAuthStore } from '../../../shared/store/authstore';
// 컴포넌트
import Pagination from '../../demandLectures/ui/Pagination';
import { useFilterList } from '../../../shared/store/filterListStore';
import { MoonLoader } from 'react-spinners';
import { LectureCardList } from '../../../widgets/lecture/ui/LectureCardList';

export const LectureCardListMyActivityContainer = ({
  sort,
}: {
  sort: string;
}) => {
  const { isLoggedIn } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { filterList } = useFilterList();
  const {
    data: lectureData,
    isPending,
    isLoading,
    isError,
    error,
  } = useGetBookMark({
    sort,
    page: currentPage - 1,
    platforms: filterList,
  });
  useEffect(() => {
    setTotalPages(lectureData?.totalPages || 0);
  }, [lectureData]); // ✅ `data`가 변경될 때 실행

  return (
    <>
      {/* 로그인 상태에 따라 데이터 api 상태 정의 */}
      {isLoggedIn ? (
        isError ? (
          <div className="text-error">error: {(error as Error).message}</div>
        ) : isPending || isLoading ? (
          <div className="flex justify-center">
            <MoonLoader size={105} color="#17af6d" />
          </div>
        ) : lectureData ? (
          <>
            <LectureCardList data={lectureData.content} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-[186px] md:h-[600px] p-[10px] text-font-sub text-md-400">
            북마크를 등록해줘
          </div>
        )
      ) : (
        <div className="flex justify-center items-center h-[186px] md:h-[600px] p-[10px] text-font-sub text-md-400">
          로그인을 해줘
        </div>
      )}
    </>
  );
};
