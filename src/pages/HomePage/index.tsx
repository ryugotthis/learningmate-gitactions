import { useAuthStore } from '../../shared/model/store';
import { useLogout } from '../../entities/auth/hooks/useLogout';
import { useCustomGetApi } from '../../entities/auth/hooks/useCustomApi';
// import { useReissue } from '../../entities/auth/hooks/useReissue';
import { useReissue } from '../../entities/auth/api/test';
import { reissue } from '../../entities/auth/api/reissue';

import Header from '../../widgets/header';
import SearchBar from '../../widgets/header/ui/SearchBar';
import HomeLogo from '../../widgets/header/ui/icons/HomeLogo.svg';
import FilterSiteIcon from '../../shared/ui/icons/StartIcon.svg';
import SortIcon from '../../shared/ui/icons/RightIcon.svg';
import { useState } from 'react';
import FilterModal from '../../features/filter/ui/FilterModal';
import { useFilterList } from '../../entities/filter/model/store';

interface Lecture {
  name: string;
  id: number;
}

const allLectures: Lecture[] = [
  { name: '패스트캠퍼스', id: 0 },
  { name: '유데미', id: 1 },
  { name: '콜로소', id: 2 },
  { name: '인프런', id: 3 },
  { name: '클래스101', id: 4 },
  { name: '노마드코더', id: 5 },
  { name: '제로베이스', id: 6 },
  { name: '코드스테이츠', id: 7 },
  { name: '생활코딩', id: 8 },
  { name: '멋쟁이사자처럼', id: 9 },
];

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

export const HomePage = () => {
  const { accessToken } = useAuthStore();
  const useCustomGetApiMutation = useCustomGetApi();
  const useLogoutMutation = useLogout();

  // 정렬 선택
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]);

  // 로그아웃 테스트
  const logout = () => {
    if (accessToken) useLogoutMutation.mutate();
    else console.log('엑세스 토큰없음 로그인안했음');
  };
  // getCustomApi 테스트
  const tryGetCustomApi = (url: string) => {
    if (accessToken) useCustomGetApiMutation.mutate(url);
    else console.log('엑세스 토큰없어서 접근불가');
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

  return (
    <>
      <Header />
      <div className="container w-2/3 flex flex-col mx-auto">
        <header className="flex items-center justify-between h-100 mt-10 bg-white">
          <div>
            <img src={HomeLogo} alt="homeLogo" className="max-w-90" />
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-8 font-bold text-2xl">
              너에게 꼭 맞는 강의를 찾아줄게!
            </p>
            <div className="border-[0.15rem] border-secondary-default p-[0.05rem] rounded-full">
              <div className="border-[0.15rem] border-secondary-default p-[0.05rem] rounded-full">
                <div className="border-[0.15rem] border-secondary-default  rounded-full">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="mt-25">
          <div className="flex justify-between">
            <div className="font-bold text-2xl">추천강의</div>
            <div className="flex items-center gap-3 ">
              {/* 사이트 필터 버튼 */}
              <div className="">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-4 py-3 border border-surface-line rounded-4xl"
                >
                  <img src={FilterSiteIcon} alt="filter" className="mr-1" />
                  <p className="text-font-sub-default font-bold cursor-pointer">
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

              {/* 추천 버튼 */}
              <div className="">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  // disabled={isModalOpen}
                  className=" flex focus-within:outline-none items-center px-4 py-3 border border-surface-line border-opacity-100  text-font-sub-default rounded-4xl"
                >
                  <p className="text-font-sub-default font-bold cursor-pointer">
                    {sortSelected.name}
                  </p>
                  <img src={SortIcon} alt="sort" className="pl-1" />
                </button>
                {isSortDropdownOpen && (
                  <ul className="absolute mt-5 text-sm l-0 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    {sortList.map((sort) => (
                      <li
                        key={sort.id}
                        onClick={() => setSortSelected(sort)}
                        className="gap-1 py-3 px-3 cursor-pointer text-font-sub-default font-bold hover:bg-surface-dark"
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
              {filterList.map((filter) => (
                <li className="border-2 border-primary-default rounded-4xl mx-1 my-1 text-sm font-bold text-primary-default px-3 py-1">
                  {allLectures.map(
                    (lecture) => lecture.id === filter && lecture.name
                  )}
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>

      <div>{accessToken}</div>
      <button onClick={logout}>{accessToken ? '로그아웃' : '로그인'}</button>
      <button onClick={testReissue}>사용자정보가져오기</button>
    </>
  );
};
