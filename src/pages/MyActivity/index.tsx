import { useEffect, useState } from 'react';
// 컴포넌트
import Header from '../../widgets/header';
import FilterModal from '../../features/filter/ui/FilterModal';
import FilterSiteIcon from '../../shared/ui/icons/StartIcon.svg';
import { LectureCardListMyActivityContainer } from '../../features/lectures/ui/LectureCardMyActivityContainer';
import SEO from '../../shared/ui/SEO';
// 아이콘
import { DownArrowIcon } from '../../shared/ui/icons';
// 커스텀 훅
import { useFilterList } from '../../shared/store/filterListStore';
import { useGetPlatforms } from '../../entities/lectures/model';

interface Sort {
  name: string;
  id: number;
  query: string;
}
const sortList: Sort[] = [
  { name: '추천순', id: 0, query: 'likes' },
  { name: '비추천순', id: 1, query: 'dislikes' },
  { name: '최신순', id: 2, query: 'desc' },
  { name: '조회 많은 순', id: 3, query: 'views' },
];

const MyActivity = () => {
  // 정렬 선택
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]);
  // 사이트 버튼 모달창 부분
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 정렬 버튼 부분

  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const { filterList, clearFilterList } = useFilterList();
  const { data: platforms } = useGetPlatforms();
  useEffect(() => {
    // 페이지 진입 시 필터 초기화
    clearFilterList();
  }, []);
  return (
    <>
      <SEO
        title="마이 액티비티 - 러닝메이트"
        description="내가 북마크한 강의와 활동을 확인하세요."
        image="Logo.png"
        url="my-activity"
        type="website"
      />
      <Header />
      <div className="flex justify-center mt-[100px]">
        <div className="w-[328px] md:w-[624px] lg:w-[1152px] flex flex-col gap-[24px] ">
          <div className="flex justify-start border-b border-line">
            <div className="px-[36px] py-[12px] border-b-2 border-primary text-[20px] tracking-[-0.1em] font-semibold">
              북마크
            </div>
          </div>
          <div className="flex items-center justify-end gap-[8px] ">
            {/* 사이트 필터 버튼 */}
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center h-[40px] px-[15px] md:h-[48px] md:px-[24px] gap-[4px] border border-surface-line rounded-4xl"
              >
                <img src={FilterSiteIcon} alt="filter" />
                <p className="text-font-sub text-sm-600 md:text-md-600">
                  사이트
                </p>
              </button>
              {/* 모달 열기 */}
              {isModalOpen && (
                <FilterModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>

            {/* 정렬 버튼 */}
            <div className="">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                // disabled={isModalOpen}
                className="flex items-center h-[40px] md:h-[48px] px-[15px] md:px-[24px] gap-[4px] border border-surface-line rounded-4xl"
              >
                <p className="text-font-sub text-sm-600 md:text-md-600">
                  {sortSelected.name}
                </p>
                <DownArrowIcon className="text-font-sub" />
              </button>
              {isSortDropdownOpen && (
                <ul className="absolute mt-5 text-sm l-0 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                  {sortList.map((sort) => (
                    <li
                      key={sort.id}
                      onClick={() => setSortSelected(sort)}
                      className="gap-1 py-3 px-3 cursor-pointer text-font-sub font-bold hover:bg-surface-dark"
                    >
                      {sort.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* 사이트 필터 목록 */}
          {filterList && (
            <ul className="flex">
              {filterList.map((filter, index) => (
                <li
                  key={index}
                  className="border-2 border-primary rounded-4xl mx-1 my-1 text-sm font-bold text-primary px-3 py-1"
                >
                  {platforms?.map(
                    (platform: any) =>
                      platform.title === filter && platform.title
                  )}
                </li>
              ))}
            </ul>
          )}
          <LectureCardListMyActivityContainer sort={sortSelected.query} />
        </div>
      </div>
    </>
  );
};
export default MyActivity;
