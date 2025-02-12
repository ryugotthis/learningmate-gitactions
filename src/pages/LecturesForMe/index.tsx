import Header from '../../widgets/header';
import LecturesForME from '../../entities/lectures/ui/icons/lecturesForMe.svg';
import SortIcon from '../../shared/ui/icons/RightIcon.svg';
import PlusIcon from '../../widgets/header/ui/icons/PlusIcon';
import { useState } from 'react';
import { LecturesForMECardList } from '../../features/lectures/ui/LectureForMeCardList';
import { useDemandLecture } from '../../entities/lectures/hooks/useDemandLecture';
import { usePostDemandLecture } from '../../entities/lectures/api/postDemandLecture';
interface Sort {
  name: string;
  id: number;
}
const sortList: Sort[] = [
  { name: '추천순', id: 0 },
  { name: '최신순', id: 1 },
  { name: '조회 많은 순', id: 2 },
];
export const LecturesForMe = () => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  // 정렬 선택
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]);
  const [isMyPosts, setIsMyPosts] = useState(false);

  // 강의 데이터 조회

  const { data: lecturesForME, isLoading, isError, error } = useDemandLecture();
  console.log('보자보자', lecturesForME);

  // 강의 포스트 테스트
  const {
    mutate,
    isPending,
    isError: demandIsError,
    error: demandError,
  } = usePostDemandLecture();
  const [testData, setTestData] = useState({
    title: '테스트 강의',
    content: '이 강의는 테스트입니다.',
  });

  return (
    <>
      <Header />
      {isLoading && <p>⏳ 로딩 중...</p>}
      {isError && <p>❌ 오류 발생: {error.message}</p>}
      {/* 데이터가 올바르게 로드되었는지 확인 */}
      {lecturesForME && Array.isArray(lecturesForME) ? (
        <div>
          {lecturesForME.map((platform) => (
            <div key={platform.id}>
              <h3>{platform.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>⚠️ 데이터가 올바르게 로드되지 않았습니다.</p>
      )}
      <div className="container w-2/3 flex flex-col mx-auto">
        <header className=" my-20 p-7 flex items-center justify-between bg-surface-dark">
          <div>
            <h1 className="text-3xl font-black">
              나를 위한 강의 도우미 게시판
            </h1>
            <p className="mt-4 text-sm text-font-sub-default">
              원하는 강의가 없으면 글을 올리고, 같은 강의를 원하는 사람이 추천
              버튼을 눌러 공감해!
              <br />
              이미 알고 있는 강의가 있다면 댓글로 공유하며 함께 정보를 낼름
              가져가자!
              <br />더 이상 헤매지 말고, 날강도처럼 필요한 강의를 빠르게
              챙겨가자!
            </p>
          </div>
          <div>
            <img src={LecturesForME} alt="lectures-for-me" />
          </div>
        </header>
        <main>
          {/* 필터 글 등록 버튼 */}
          <div className="flex justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              {/* 내 글만 보기 토글버튼 */}
              <button
                onClick={() => setIsMyPosts(!isMyPosts)}
                className="cursor-pointer"
              >
                {/* container */}
                <div
                  className={`relative w-[56px] h-[30px] transition-colors ${
                    !isMyPosts ? 'bg-surface-dark ' : 'bg-primary-default'
                  }  rounded-2xl`}
                >
                  {/* circle */}
                  <div
                    className={`absolute top-[5px] ${
                      isMyPosts ? 'translate-x-[31px]' : 'translate-x-[5px]'
                    } w-[20px] h-[20px] rounded-[50%] bg-white transition-transform duration-300`}
                  ></div>
                </div>
              </button>
              <span className="text-xs text-font-sub-default font-bold">
                내 글만 보기
              </span>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className=" flex focus-within:outline-none items-center px-4 py-3 border border-surface-line border-opacity-100  text-font-sub-default rounded-4xl"
                >
                  <p className="text-font-sub-default text-sm font-bold cursor-pointer">
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

              <div>
                <button
                  onClick={() => mutate(testData)}
                  className="flex items-center px-4 py-3 text-white bg-primary-default rounded-4xl"
                >
                  {/* <img src={Add} alt="add" className="mr-1" /> */}
                  <PlusIcon className=" mr-1" />
                  <p className="text-sm font-bold cursor-pointer">글 등록</p>
                </button>
              </div>
            </div>
          </div>
          {isPending ? '⏳ 요청 중...' : ' 글 등록 테스트'}
          {demandIsError && (
            <p className="text-red-500">❌ 오류 발생: {demandError?.message}</p>
          )}
          v
          <div className="mt-2">
            <LecturesForMECardList />
            {/* 카드 */}
            <div className="flex p-5 border border-surface-line">
              <button className="flex flex-col items-center mr-5 text-sm border border-surface-line rounded-4xl py-4 px-2 gap-1">
                <span>up</span>
                <span>102K</span>
              </button>
              <div>
                <h2>Javascript 기초보고 응용할 만한 영상</h2>
                <p className="mt-2 mb-5 text-xs">
                  Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트
                  해보려하는데 도움되는 강의 있을까요?
                </p>
                <div className="text-xs flex gap-5">
                  <span>25.02.01</span>
                  <span>1.2K</span>
                  <span>2</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
