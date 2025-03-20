import All from './icons/All.svg';
import Udemy from '../../../shared/ui/icons/Udemy.svg';
import Infren from '../../../shared/ui/icons/Infren.svg';
import FastCampus from '../../../shared/ui/icons/FastCampus.svg';
import Class101 from '../../../shared/ui/icons/Class101.svg';
import Coloso from '../../../shared/ui/icons/Coloso.svg';
import Dropdown from './icons/Polygon.svg';
import Notice from './icons/Notice.svg';
import PlusIcon from './icons/PlusIcon';
import Search from './icons/Search.svg';
import DeleteClose from '../../../shared/ui/icons/DeleteClose.svg';
import { useEffect, useRef, useState } from 'react';
import { useCreateLecture } from '../../../entities/lectures/model/useCreateLecture';
import { useGetLectureTitle } from '../../../entities/lectures/model/useGetLecturesTitle';
import { useSearchStore } from '../../../features/lectures/model/useLectureStore';
import { LoadingSpinner } from '../../../shared/ui/LoadingSpinner';
import { useReissue } from '../../../entities/auth/model/useReissue';
import { useAuthStore } from '../../../shared/store/authstore';

interface Option {
  value: string;
  label: string;
  imgSrc: string;
}

const options: Option[] = [
  { value: 'all', label: '전체', imgSrc: All },
  { value: 'udemy', label: '유데미', imgSrc: Udemy },
  { value: 'infren', label: '인프런', imgSrc: Infren },
  { value: 'closo', label: '콜로소', imgSrc: Coloso },
  { value: 'class101', label: '클래스101', imgSrc: Class101 },
  { value: 'fastcampus', label: '패스트캠퍼스', imgSrc: FastCampus },
];
interface SearchBarProps {
  isNaveBar: boolean;
}
const SearchBar: React.FC<SearchBarProps> = ({ isNaveBar }) => {
  const [selectedPlatform, SetSelectedPlatform] = useState<Option>(options[0]); // 선택된 플랫폼 메뉴
  const [isPlatformOpen, setIsPlatformOpen] = useState<Boolean>(false); // 플랫폼 메뉴창 상태 관리
  const dropdownRef = useRef<HTMLDivElement>(null); // 플랫폼 드롭다운 감지

  const [searchText, setSearchText] = useState<string>(''); // 검색창 텍스트
  const searchDropdownRef = useRef<HTMLDivElement>(null); // 검색어 추천 드롭다운 감지
  const inputRef = useRef<HTMLInputElement>(null); // 검색 입력창 감지 x 버튼 누른후 포커스 유지위해
  const [isInputFocused, setIsInputFocused] = useState(false); // 포커스시 메뉴 보여줌
  // 권한 검증
  const { mutate: reissue } = useReissue();
  const { isLoggedIn } = useAuthStore();
  // 강의 생성 mutate
  const { mutate: createLecture, isPending: createLectureLoading } =
    useCreateLecture(); // 강의 등록 mutate 함수
  const { data: titleData } = useGetLectureTitle(
    searchText,
    selectedPlatform.label
  ); // 검색어 목록 데이터
  const { setSearchTitle } = useSearchStore(); // 검색어 저장할 전역변수, 홈페이지 강의 목록에 보내 줌

  // 메뉴 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsPlatformOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleCreateLecture = () => {
    if (!isLoggedIn) alert('로그인이 필요해');
    if (isLoggedIn) {
      reissue(undefined, {
        onSuccess: () => {
          createLecture(searchText, {
            onError: () => {
              alert('강의 생성에 실패했어');
            },
          });
          setSearchText('');
        },
        onError: () => {
          alert('강의등록 실패! 다시 시도해줘');
        },
      });
    }
  };

  return (
    <>
      {/* 강의 등록 요청 로딩 중일때 로딩 스피너 표시 */}
      {createLectureLoading ? <LoadingSpinner /> : ''}
      {/* {createLectureError ? alert('강의 생성에 실패했어') : ''} */}

      <div
        className={`${
          isNaveBar && 'border-none p-0'
        } border-[0.15rem] border-secondary-default p-[0.05rem] rounded-full`}
      >
        <div
          className={`${
            isNaveBar && 'border-none p-0'
          } border-[0.15rem] border-secondary-default p-[0.05rem] rounded-full`}
        >
          <div
            className={`relative flex gap-[18px] w-[312px] md:w-[608px] lg:w-[640px] h-[56px] px-[16px] py-[12px] items-center border border-line rounded-4xl bg-surface-dark flex-grow ${
              isNaveBar
                ? 'focus-within:border-2 focus-within:border-primary-default'
                : 'border-secondary-default border-[0.15rem]'
            } `}
          >
            {/* 플랫폼 드롭다운 버튼 */}
            <div ref={dropdownRef} className=" ">
              <button
                className={`w-[42px] md:w-[125px] flex justify-between items-center text-sm text-font-default border-line  cursor-pointer focus:outline-none`}
                onClick={() => setIsPlatformOpen(!isPlatformOpen)}
              >
                <div className="flex items-center gap-[6px] ">
                  <img
                    src={selectedPlatform.imgSrc}
                    alt={selectedPlatform.label}
                  />
                  <span className="hidden md:block md:text-sm-400">
                    {selectedPlatform.label}
                  </span>
                </div>

                <img src={Dropdown} alt="dropdown" />
              </button>

              {/* 플랫폼 드롭다운 리스트 */}
            </div>
            {isPlatformOpen && (
              <ul className="absolute top-[66px] text-[14px] left-0 w-[136px] bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] ">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className="flex gap-1 py-3 px-3 cursor-pointer hover:bg-surface-dark"
                    onMouseDown={() => {
                      SetSelectedPlatform(option);
                      setIsPlatformOpen(false);
                    }}
                  >
                    <img src={option.imgSrc} alt={option.label} />
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* 입력 필드 */}
            <div className="flex-1 flex">
              <input
                type="text"
                ref={inputRef} // input 요소에 ref 연결
                value={searchText}
                placeholder="강의명 또는 URL을 입력해봐!"
                className=" w-full placeholder:text-font-sub tracking-[-0.1em] text-font-default bg-surface-dark  focus:outline-none"
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('엔터 눌림, 검색어 저장:', searchText);
                    setSearchTitle(searchText);
                  }
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {/* X 버튼 */}
              {searchText && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchText('');
                    inputRef.current?.focus();
                  }}
                  className="px-3 text-gray-500 hover:text-black hover:cursor-pointer"
                >
                  <img src={DeleteClose} alt="deleteClose" />
                </button>
              )}
            </div>
            {/* 입력창 클릭 시 메시지 표시 */}
            {isInputFocused && (
              <div
                ref={searchDropdownRef}
                className="absolute top-0 left-0 w-[324px] md:w-[620px] bg-white rounded-md shadow-md mt-[60px] overflow-hidden"
              >
                <div className="flex  items-center px-[24px] pt-[14px] pb-[12px] gap-[14px] border-line">
                  <img src={Notice} alt="notice" />
                  <p className="text-sm-400 text-font-sub">
                    찾는 강의가 없으면 강의 URL을 입력해 새로 등록할 수 있어
                  </p>
                </div>
                {/* 검색어 추천 목록 */}
                <ul className=" bg-white max-h-[216px] md:max-h-[232px] overflow-y-auto overflow-x-hidden rounded-b-[12px]">
                  {titleData?.length > 0 ? (
                    titleData.map((title: string, index: number) => (
                      <li
                        key={index}
                        className="px-[24px] pt-[16px] pb-[18px] flex gap-[24px] items-center hover:bg-gray-200 cursor-pointer"
                        // onClick={() => setSearchText(title)}
                        onMouseDown={() => {
                          console.log('검색어 저장:', title);
                          setSearchTitle(title);
                        }}
                        // setSearchTitle
                      >
                        <img src={Search} alt="search" />
                        <p className="truncate text-md-500">{title}</p>
                      </li>
                    ))
                  ) : (
                    <li
                      onMouseDown={handleCreateLecture}
                      className=" px-[24px] pt-[16px] pb-[18px] flex gap-[24px] items-center text-primary-default cursor-pointer hover:bg-gray-200"
                    >
                      <PlusIcon />
                      <p className="text-md-500">새로 등록하기</p>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default SearchBar;
