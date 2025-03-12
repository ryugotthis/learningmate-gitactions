import { useAuthStore } from '../../shared/model/store';
import { useLogout } from '../../entities/auth/hooks/useLogout';
import { reissue } from '../../entities/auth/api/reissue';

import Header from '../../widgets/header';
import SearchBar from '../../widgets/header/ui/SearchBar';
import HomeLogo from '../../widgets/header/ui/icons/HomeLogo.svg';
import FilterSiteIcon from '../../shared/ui/icons/StartIcon.svg';
import SortIcon from '../../shared/ui/icons/RightIcon.svg';
import { useState } from 'react';
import FilterModal from '../../features/lectures/ui/FilterModal';
import { useFilterList } from '../../entities/filter/model/store';
import { useGetPlatforms } from '../../entities/lectures/home/hooks/useGetPlatforms';

import { LectureCardListHomeContainer } from '../../features/lectures/ui/home/LectureCardHomeContainer';

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
  const { accessToken } = useAuthStore();
  const useLogoutMutation = useLogout();

  // 정렬 선택
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]);

  // 로그아웃 테스트
  const logout = () => {
    if (accessToken) useLogoutMutation.mutate();
    else console.log('엑세스 토큰없음 로그인안했음');
  };

  const testReissue = async () => {
    try {
      const result = await reissue(); // reissue 함수 호출
      console.log('reissue 성공:', result); // 결과 출력
    } catch (error) {
      console.error('reissue 실패:', error);
    }
  };

  // 사이트 버튼 모달창 부분
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 정렬 버튼 부분
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  //필터 사이트 전역 리스트
  const { filterList } = useFilterList();

  const { data: platforms } = useGetPlatforms();
  console.log('플랫폼데이터', platforms);
  console.log('h2');

  return (
    <>
      {/* <div>{isLoading && <p>⏳ 로딩 중...</p>}</div>
      <div>{isError && <p>❌ 오류 발생: {error.message}</p>}</div> */}
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
              <div className="">
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
          </div>
          {filterList && (
            <ul className="flex">
              {filterList.map((filter, index) => (
                <li
                  key={index}
                  className="border-2 border-primary-default rounded-4xl mx-1 my-1 text-sm font-bold text-primary-default px-3 py-1"
                >
                  {platforms.map(
                    (platform: any) => platform.id === filter && platform.title
                  )}
                </li>
              ))}
            </ul>
          )}
          {/* 본문 카드 */}
          <div className="mb-[100px]">
            <LectureCardListHomeContainer sort={sortSelected.query} />
            {/* <LectureCardList /> */}
          </div>

          <button>더보기</button>
        </main>
      </div>

      {/* <div>{accessToken}</div> */}
      <button onClick={logout}>{accessToken ? '로그아웃' : '로그인'}</button>
      <button onClick={testReissue}>사용자정보가져오기</button>
    </>
  );
};
