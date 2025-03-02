import Header from '../../widgets/header';
import LecturesForME from '../../entities/lectures/ui/icons/lecturesForMe.svg';
import SortIcon from '../../shared/ui/icons/RightIcon.svg';
import PlusIcon from '../../widgets/header/ui/icons/PlusIcon';
import { useState } from 'react';
import { LecturesForMECardList } from '../../features/recommended/LectureForMeCardList';
import { useGetDemandLecture } from '../../entities/recomended/hooks/useGetDemandLecture';
// import { usePostDemandLecture } from '../../entities/recomended/api/createDemandLecture';

import { useAuthStore } from '../../shared/model/store';
import { PostLectureForMeButton } from '../../features/recommended/PostLecturesForMeButton';
import { useCreateDemandLecture } from '../../entities/recomended/hooks/useCreateDemandLecture';
import Pagination from '../../features/recommended/Pagination';
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

  const handleMyPost = () => {
    () => setIsMyPosts(!isMyPosts);
  };

  // 강의 데이터 조회

  // const { data: lecturesForME, isLoading, isError, error } = useDemandLecture({
  //   page: 15,
  //   size: 10,
  //   sort: 'desc',
  // });
  // console.log('보자보자', lecturesForME);

  // 강의 포스트 테스트
  // const {
  //   mutate,
  //   isPending,
  //   isError: demandIsError,
  //   error: demandError,
  // } = usePostDemandLecture();

  // const [testData, setTestData] = useState({
  //   title: 'Javascript 기초보고 응용할 만한 영상',
  //   content:
  //     'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
  // });
  const { isLoggedIn } = useAuthStore();
  console.log('로그인 체크', isLoggedIn);
  console.log('클릭체크1', isMyPosts);
  return (
    <>
      <Header />
      {/* {isLoading && <p>⏳ 로딩 중...</p>}
      {isError && <p>❌ 오류 발생: {error.message}</p>} */}
      {/* 데이터가 올바르게 로드되었는지 확인 */}
      {/* {lecturesForME && Array.isArray(lecturesForME) ? (
        <div>
          {lecturesForME.map((platform) => (
            <div key={platform.id}>
              <h3>{platform.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>⚠️ 데이터가 올바르게 로드되지 않았습니다.</p>
      )} */}

      <div className="relative lg:w-[1152px] mt-[100px] md:w-[624px] flex flex-col mx-auto">
        <header className="flex flex-col gap-[40px]">
          <div className="flex items-center justify-between md:h-[241px] lg:gap-[60px] p-[32px] bg-surface-dark rounded-[12px]">
            <div className="w-full flex flex-col gap-[6px]">
              <h1 className="text-[32px] font-black md:tracking-[-0.1em] lg:tracking-normal">
                나를 위한 강의 도우미 게시판
              </h1>
              <p className="text-[16px] text-font-sub md:leading-[140%] md:tracking-[-0.15em] lg:leading-normal lg:tracking-normal">
                원하는 강의가 없으면 글을 올리고, 같은 강의를 원하는 사람이 추천
                버튼을 눌러 공감해!
                <br />
                이미 알고 있는 강의가 있다면 댓글로 공유하며 함께 정보를 낼름
                가져가자!
                <br />더 이상 헤매지 말고, 날강도처럼 필요한 강의를 빠르게
                챙겨가자!
              </p>
            </div>
            <div className="lg:block md:hidden">
              <img src={LecturesForME} alt="lectures-for-me" />
            </div>
          </div>
          {/* 필터 글 등록 버튼 */}
          <div className="flex justify-between items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-[10px]">
                {/* 내 글만 보기 토글버튼 */}

                <button
                  onClick={() => setIsMyPosts(!isMyPosts)}
                  className="cursor-pointer"
                >
                  {/* container */}
                  <div
                    className={`flex items-center w-[46px] h-[24px] transition-colors ${
                      !isMyPosts ? 'bg-surface-dark ' : 'bg-primary-default'
                    }  rounded-2xl`}
                  >
                    <div className="flex items-center w-full h-full rounded-2xl m-[3px]">
                      {/* circle */}
                      <div
                        className={`${
                          isMyPosts ? 'translate-x-[22px]' : 'translate-x-[0px]'
                        } w-[18px] h-[18px] rounded-[50%] bg-white transition-transform duration-300`}
                      ></div>
                    </div>
                  </div>
                </button>
                <span className="text-[16px] text-font-sub font-bold">
                  내 글만 보기
                </span>
              </div>
            ) : (
              <div></div>
            )}

            <div className="flex justify-between items-center gap-[12px]">
              <div className="relative">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className=" flex gap-[4px] h-[48px] focus-within:outline-none items-center px-[24px] border border-surface-line border-opacity-100  text-font-sub-default rounded-4xl"
                >
                  <p className="text-font-sub text-[16px] font-semibold cursor-pointer">
                    {sortSelected.name}
                  </p>
                  <img src={SortIcon} alt="sort" />
                </button>
                {isSortDropdownOpen && (
                  <ul className="absolute w-[121px] mt-[7px] text-[16px] font-medium bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    {sortList.map((sort) => (
                      <li
                        key={sort.id}
                        onClick={() => setSortSelected(sort)}
                        className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
                      >
                        {sort.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* 글 등록 버튼 */}
              <div>
                <PostLectureForMeButton />
                {/* <button
                  onClick={() => mutate(testData)}
                  className="flex items-center px-4 py-3 text-white bg-primary-default rounded-4xl"
                >
                  <PlusIcon className=" mr-1" />
                  <p className="text-sm font-bold cursor-pointer">글 등록</p>
                </button> */}
              </div>
            </div>
          </div>
          {/* {isPending ? '⏳ 요청 중...' : ' 글 등록 테스트'}
          {demandIsError && (
            <p className="text-red-500">❌ 오류 발생: {demandError?.message}</p>
          )} */}
        </header>

        <main>
          <div className="mt-2">
            <LecturesForMECardList isMyPost={isMyPosts} />
          </div>
        </main>
      </div>
    </>
  );
};
