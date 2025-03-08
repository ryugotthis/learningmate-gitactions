import All from './icons/Xlg.svg';
import Udemy from './icons/Udemy.svg';
import Infren from './icons/Infren.svg';
import FastCampus from './icons/FastCampus.svg';
import Class101 from './icons/Class101.svg';
import Coloso from './icons/Coloso.svg';
import Dropdown from './icons/Polygon 1.svg';
import Notice from './icons/Notice.svg';
// import Plus from './icons/Plus.svg';
import PlusIcon from './icons/PlusIcon';
import Search from './icons/Search.svg';
import DeleteClose from './icons/DeleteClose.svg';
import { useRef, useState } from 'react';
import { useCreateLecture } from '../../../entities/lectures/home/hooks/useCreateLecture';

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
  const [selected, SetSelected] = useState<Option>(options[0]);
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null); // 플랫폼 드롭다운 감지
  const searchDropdownRef = useRef<HTMLDivElement>(null); // 검색어 추천 드롭다운 감지
  const inputRef = useRef<HTMLInputElement>(null); // 검색 입력창 감지 x 버튼 누른후 포커스 유지위해
  const [isInputFocused, setIsInputFocused] = useState(false); // 포커스시 메뉴 보여줌
  // 강의 생성 mutate
  const { mutate: createLecture } = useCreateLecture();

  // 예제 검색어 목록 (실제 데이터는 API 요청 등으로 대체 가능)
  const suggestions = [
    'React',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Tailwind',
  ];

  // 검색어 필터링
  const filteredSuggestions = suggestions.filter((word) =>
    word.toLowerCase().includes(searchText.toLowerCase())
  );

  // 외부 클릭 감지 후 드롭다운 닫기
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setIsOpen(false);
  //     }
  //     if (
  //       searchDropdownRef.current &&
  //       !searchDropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setSearchText('');
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      {/* <div
        className={`${
          isNaveBar && 'border-none p-0'
        } border-[0.15rem] border-secondary-default p-[0.05rem] rounded-full`}
      > */}
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
            <div ref={dropdownRef} className=" w-[120px]">
              <button
                className={` w-[120px] flex justify-between items-center text-sm text-font-default border-line  cursor-pointer focus:outline-none`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center gap-[6px] ">
                  <img src={selected.imgSrc} alt={selected.label} />
                  <span className="text-[14px]">{selected.label}</span>
                </div>

                <img src={Dropdown} alt="dropdown" />
              </button>

              {/* 플랫폼 드롭다운 리스트 */}
            </div>
            {isOpen && (
              <ul className="absolute top-[66px] text-[14px] left-0 w-[136px] bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)] ">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className="flex gap-1 py-3 px-3 cursor-pointer hover:bg-surface-dark"
                    onClick={() => {
                      SetSelected(option);
                      setIsOpen(false);
                    }}
                  >
                    <img src={option.imgSrc} alt={option.label} />
                    <span>{option.label}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* 입력 필드 */}
            <div className="flex-8 flex">
              <input
                type="text"
                ref={inputRef} // input 요소에 ref 연결
                value={searchText}
                placeholder="강의명 또는 URL을 입력해봐!"
                className=" px-3 py-1 w-full bg-surface-dark text-gray-700 text-sm focus:outline-none"
                onChange={(e) => setSearchText(e.target.value)}
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
                className="absolute top-0 left-0 w-full  py-1 bg-white  rounded-md shadow-md mt-[60px]"
              >
                <div className="flex items-center text-font-sub-default text-sm border-b border-line px-3 py-3">
                  <img src={Notice} alt="notice" className="px-3" />
                  <p>
                    찾는 강의가 없으면 강의 URL을 입력해 새로 등록할 수 있어
                  </p>
                </div>
                {/* 검색어 추천 목록 */}
                <ul className=" bg-white ">
                  {filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 text-lg flex items-center hover:bg-gray-200 cursor-pointer"
                        onClick={() => setSearchText(suggestion)}
                      >
                        <img src={Search} alt="search" className="px-3" />
                        <p>{suggestion}</p>
                      </li>
                    ))
                  ) : (
                    <li
                      onMouseDown={() => createLecture(searchText)}
                      className="px-3 py-2 flex items-center text-primary-default cursor-pointer hover:bg-gray-200"
                    >
                      <PlusIcon className="mr-1" />
                      <p>새로 등록하기</p>
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
