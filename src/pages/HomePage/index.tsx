import { useEffect, useRef, useState } from 'react';
// 컴포넌트
import Header from '../../widgets/header';
import SearchBar from '../../widgets/header/ui/SearchBar';
import HomeLogo from '../../widgets/header/ui/icons/HomeLogo.svg';
import FilterSiteIcon from '../../shared/ui/icons/StartIcon.svg';
import SortIcon from '../../shared/ui/icons/RightIcon.svg';
import FilterModal from '../../widgets/lecture/FilterModal';
import { LectureCardListHomeContainer } from '../../features/lectures/ui/home/LectureCardHomeContainer';
import { MoonLoader } from 'react-spinners';
// 데이터 커스텀 훅
import { useFilterList } from '../../shared/store/filterListStore';
import { useGetPlatforms } from '../../entities/lectures/home/hooks/useGetPlatforms';

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

export const HomePage = () => {
  // 정렬
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]); // 선택된 정렬 상태관리
  const menuRef = useRef<HTMLDivElement>(null); //  정렬 메뉴의 DOM 요소를 참조
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // 정렬 메뉴가 클릭 상태관리

  // 사이트 필터
  const [isModalOpen, setIsModalOpen] = useState(false); // 사이트 필터 버튼 모달창 클릭 상태관리
  const { filterList, clearFilterList } = useFilterList(); //필터 사이트 전역 리스트
  const { data: platforms, isLoading, isError, error } = useGetPlatforms(); // 플랫폼 데이터

  // 페이지 진입 시 사이트 필터 초기화
  useEffect(() => {
    clearFilterList();
  }, []);

  // 정렬 메뉴 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 플랫폼 데이터 에러, 로딩 처리
  if (isError)
    return <div className="text-error">error: {(error as Error).message}</div>;
  if (isLoading)
    return (
      <div className="flex justify-center">
        <MoonLoader size={105} color="#17af6d" />
      </div>
    );

  return (
    <>
      <Header />
      <header className="flex flex-col items-center">
        <div className=" flex justify-between items-center gap-[72px] my-[120px]">
          <div className="hidden lg:block w-[440px] h-[338px]">
            <img src={HomeLogo} alt="homeLogo" className="" />
          </div>
          <div className="flex flex-col gap-[40px] items-center">
            <p className="title-md-600 md:title-lg-600">
              너에게 꼭 맞는 강의를 찾아줄게!
            </p>

            <SearchBar isNaveBar={false} />
          </div>
        </div>
      </header>
      {/* 사이트필터, 정렬버튼 및 본문 */}
      <div className="w-full flex flex-col items-center  pb-[120px]">
        <main className="w-[328px] md:w-[624px] lg:w-[1152px] flex flex-col gap-[40px]">
          {/* 추천강의 및 사이트 필터, 정렬 버튼 */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-[8px] md:gap-[0]">
            <div className="title-md-600 md:title-md-600 lg:title-lg-600">
              추천 강의
            </div>
            <div className="flex justify-end items-center gap-[8px] ">
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
              <div ref={menuRef}>
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  // disabled={isModalOpen}
                  className="flex items-center h-[40px] md:h-[48px] px-[15px] md:px-[24px] gap-[4px] border border-surface-line rounded-4xl"
                >
                  <p className="text-font-sub text-sm-600 md:text-md-600">
                    {sortSelected.name}
                  </p>
                  <img src={SortIcon} alt="sort" />
                </button>
                {isSortDropdownOpen && (
                  <ul className="absolute mt-5 text-sm l-0 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    {sortList.map((sort) => (
                      <li
                        key={sort.id}
                        onClick={() => {
                          setSortSelected(sort);
                          setIsSortDropdownOpen(false);
                        }}
                        className="gap-1 py-3 px-3 cursor-pointer text-font-sub font-bold hover:bg-surface-dark"
                      >
                        {sort.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {/* 선택한 사이트 이름 적용 */}
          {filterList && (
            <ul className="flex">
              {filterList.map((filter, index) => (
                <li
                  key={index}
                  className="border-2 border-primary-default rounded-4xl mx-1 my-1 text-sm font-bold text-primary-default px-3 py-1"
                >
                  {platforms?.map(
                    (platform: any) =>
                      platform.title === filter && platform.title
                  )}
                </li>
              ))}
            </ul>
          )}
          {/* 본문 카드 */}
          <div className="mb-[100px]">
            <LectureCardListHomeContainer sort={sortSelected.query} />
          </div>
        </main>
      </div>
    </>
  );
};
