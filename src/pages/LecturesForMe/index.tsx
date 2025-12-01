// 리액트 훅
import { useEffect, useRef, useState } from 'react';
// 전역변수
import { useAuthStore } from '../../shared/store/authstore';
// 컴포넌트
import Header from '../../widgets/header';
import { PostLectureForMeButton } from '../../features/demandLectures/ui/PostLecturesForMeButton';
import { LecturesForMECardList } from '../../features/demandLectures/ui/LectureForMeCardList';
// 아이콘
import LecturesForME from '../../features/demandLectures/ui/icons/lecturesForMe.svg';
import { DownArrowIcon } from '../../shared/ui/icons';
import SEO from '../../shared/ui/SEO';

// 정렬
interface Sort {
  name: string;
  id: number;
  query: string;
}
const sortList: Sort[] = [
  { name: '추천순', id: 0, query: 'likes' },
  { name: '최신순', id: 1, query: 'desc' },
  { name: '조회 많은 순', id: 2, query: 'views' },
];

const LecturesForMe = () => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // 정렬 드롭다운 상태 관리
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]); // 정렬 선택 상태 관리
  const menuRef = useRef<HTMLDivElement>(null); // 정렬 메뉴 참조
  const [isMyPosts, setIsMyPosts] = useState(false); // 내 글 보기 상태 관리

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
  }, [isSortDropdownOpen]);
  const { isLoggedIn } = useAuthStore();

  // Header는 props가 없거나 변하지 않는다면 useMemo로 감싸서 재렌더링을 방지
  // const memoizedHeader = useMemo(() => <Header />, []);

  return (
    <>
      <SEO
        title="러닝메이트 - 원하는 강의를 질문하고 추천받아요!"
        description="어떤 강의를 들어야 할지 고민이라면? 질문을 올리고 수강생들의 솔직한 의견을 받아보세요!"
        image="Logo.png"
        url="lectures-for-me"
        type="article"
      />

      <Header />

      <div className="relative w-[328px] md:w-[624px] lg:w-[1152px] mt-[50px] md:mt-[100px]  flex flex-col mx-auto">
        <header className="flex  flex-col gap-[24px] md:gap-[40px]">
          <div className="flex items-center justify-between h-[241px] lg:gap-[60px] px-[16px]  md:p-[32px] bg-surface-dark rounded-[12px]">
            <div className="w-full flex flex-col gap-[6px]">
              <h1 className="text-font title-md-600 md:title-lg-600">
                나를 위한 강의 도우미 게시판
              </h1>
              <p className="text-font-sub text-sm-400 md:text-md-400 ">
                원하는 강의가 없으면 글을 올리고, 같은 강의를 원하는 사람이 추천
                버튼을 눌러 공감해!
                <br />
                이미 알고 있는 강의가 있다면 댓글로 공유하며 함께 정보를 낼름
                가져가자!
                <br />더 이상 헤매지 말고, 날강도처럼 필요한 강의를 빠르게
                챙겨가자!
              </p>
            </div>
            <div className="hidden lg:block ">
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
                      !isMyPosts ? 'bg-surface-dark ' : 'bg-primary'
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
                <span className="text-sm-600 md:text-md-600 text-font-sub">
                  내 글만 보기
                </span>
              </div>
            ) : (
              <div></div>
            )}

            <div className="flex justify-between items-center gap-[12px]">
              <div
                ref={menuRef}
                className="relative text-font-sub text-sm-600 md:text-md-600"
              >
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex gap-[4px] h-[40px] md:h-[48px] focus-within:outline-none justify-center items-center border pl-[24px] pr-[20px] border-surface-line border-opacity-100  text-font-sub rounded-4xl"
                >
                  <p className="whitespace-nowrap">{sortSelected.name}</p>
                  <DownArrowIcon />
                </button>
                {isSortDropdownOpen && (
                  <ul className="absolute w-[121px] mt-[7px] text-[16px] font-medium bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    {sortList.map((sort) => (
                      <li
                        key={sort.id}
                        onClick={() => setSortSelected(sort)}
                        className="py-[12px] px-[16px] cursor-pointer text-font-sub text-md-500 whitespace-nowrap hover:bg-surface-dark"
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
                
              </div>
            </div>
          </div>
         
        </header>

        <main>
          <div className="mt-[20px]">
            <LecturesForMECardList
              isMyPost={isMyPosts}
              sort={sortSelected.query}
            />
          </div>
        </main>
      </div>
    </>
  );
};
export default LecturesForMe;
