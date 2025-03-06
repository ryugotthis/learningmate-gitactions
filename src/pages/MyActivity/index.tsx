import { useState } from 'react';
import Header from '../../widgets/header';
import FilterModal from '../../features/lectures/ui/FilterModal';
import FilterSiteIcon from '../../shared/ui/icons/StartIcon.svg';
import SortIcon from '../../shared/ui/icons/RightIcon.svg';
import { LectureCardListMyActivityContainer } from '../../features/lectures/ui/home/LectureCardMyActivityContainer';

interface Sort {
  name: string;
  id: number;
}
const sortList: Sort[] = [
  { name: '추천순', id: 0 },
  { name: '비추천순', id: 1 },
  { name: '최신순', id: 2 },
  { name: '조회 많은 순', id: 3 },
];

export const MyActivity = () => {
  // 정렬 선택
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]);
  // 사이트 버튼 모달창 부분
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 정렬 버튼 부분
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  return (
    <>
      <Header />
      <div className="flex justify-center mt-[100px]">
        <div className="w-[1152px] flex flex-col gap-[24px] ">
          <div className="flex justify-start border-b border-line">
            <div className="px-[36px] py-[12px] border-b-2 border-primary-default text-[20px] tracking-[-0.1em] font-semibold">
              북마크
            </div>
          </div>
          <div className="flex items-center justify-end gap-[8px] ">
            {/* 사이트 필터 버튼 */}
            <div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center h-[48px] px-[24px] gap-[4px] border border-surface-line rounded-4xl"
              >
                <img src={FilterSiteIcon} alt="filter" />
                <p className="text-font-sub font-semibold">사이트</p>
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
                className="flex items-center h-[48px] px-[24px] gap-[4px] border border-surface-line rounded-4xl"
              >
                <p className="text-font-sub font-semibold">
                  {sortSelected.name}
                </p>
                <img src={SortIcon} alt="sort" />
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
          <LectureCardListMyActivityContainer />
        </div>
      </div>
    </>
  );
};
