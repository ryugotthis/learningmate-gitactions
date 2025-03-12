import React, { useState } from 'react';
import DeleteClose from '../../../shared/ui/icons/DeleteClose.svg';
import Reset from '../../../shared/ui/icons/Reset.svg';
import { useFilterList } from '../../../entities/filter/model/store';
import { CloseIcon } from '../../../shared/ui/icons/CloseIcon';
import { SearchIcon } from '../../../shared/ui/icons/SearchIcon';
import { useGetPlatforms } from '../../../entities/lectures/home/hooks/useGetPlatforms';

// interface Lecture {
//   name: string;
//   id: number;
// }

// const allLectures: Lecture[] = [
//   { name: '패스트캠퍼스', id: 0 },
//   { name: '유데미', id: 1 },
//   { name: '콜로소', id: 2 },
//   { name: '인프런', id: 3 },
//   { name: '클래스101', id: 4 },
//   { name: '노마드코더', id: 5 },
//   { name: '제로베이스', id: 6 },
//   { name: '코드스테이츠', id: 7 },
//   { name: '생활코딩', id: 8 },
//   { name: '멋쟁이사자처럼', id: 9 },
// ];

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLectures, setSelectedLectures] = useState<number[]>([]);
  const { data: platformData } = useGetPlatforms();
  const defaultLectures = platformData.slice(0, 5); // 기본 5개만 표시

  // ✅ 입력값이 있으면 검색 필터 적용, 없으면 기본 강의 표시
  const filteredLectures = searchTerm
    ? platformData.filter((platform: any) =>
        platform.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : defaultLectures;

  // ✅ 선택/해제 함수
  const toggleLecture = (id: number) => {
    console.log(selectedLectures);

    setSelectedLectures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const { filterList, setFilterList } = useFilterList();

  return (
    <div
      className="fixed inset-0 flex items-end lg:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative w-full lg:w-[560px] bg-white rounded-[12px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-[16px] md:p-[24px] border-b-2">
          <h2 className="title-sm-600 md:title-md-600">사이트</h2>
          <button className="text-gray-600 text-xl" onClick={onClose}>
            <img src={DeleteClose} />
          </button>
        </div>

        {/* <div className="border-t-2 border-gray-300 my-4 w-full"></div> */}
        {/* ✅ 검색창 */}
        <div className="px-[24px] py-[12px]">
          <div className="flex border border-line rounded-4xl py-[12px] px-[20px] items-center">
            <input
              type="text"
              placeholder="사이트 검색"
              className="pl-2 text-sm flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="cursor-pointer"
              >
                <CloseIcon className="text-font-sub" />
              </button>
            ) : (
              <button>
                <SearchIcon className="text-font-sub" />
              </button>
            )}
          </div>
        </div>

        {/* ✅ 선택된 강의 리스트 표시 */}

        {selectedLectures.length > 0 && (
          <ul className="flex px-[32px] pb-[20px] gap-[10px] flex-wrap">
            {selectedLectures.map((id) => {
              const lecture = platformData.find(
                (platform: any) => platform.id === id
              );
              return lecture ? (
                <li
                  key={id}
                  onClick={() => toggleLecture(lecture.id)}
                  className="h-[28px] md:h-[35px] flex items-center gap-[4px] text-sm-500 md:text-md-500 border border-primary-default rounded-4xl text-primary-default px-[16px] cursor-pointer"
                >
                  <p>{lecture.title}</p>
                  <CloseIcon className="w-[16px] h-[16px]" />
                </li>
              ) : null;
            })}
          </ul>
        )}

        {/* <div className="border-t-2 border-gray-300 my-4 w-full"></div> */}

        {/* ✅ 강의 리스트 (검색 결과 or 기본 리스트) */}
        <ul className="flex h-[160px] lg:h-auto px-[32px] py-[12px] gap-[10px] border-t flex-wrap content-start">
          {filteredLectures.map((lecture: any) => (
            <li
              key={lecture.id}
              onClick={() => toggleLecture(lecture.id)}
              className={`h-[28px] md:h-[35px] border rounded-4xl text-sm-500 md:text-md-500 text-font-sub px-[16px] py-[4px] cursor-pointer `}
            >
              {lecture.title}
            </li>
          ))}
        </ul>

        {/* ✅ 초기화 / 적용 버튼 */}
        <div className="flex px-[24px] pb-[24px] pt-[8px] gap-[16px]">
          <button
            onClick={() => {
              setSelectedLectures([]);
              setSearchTerm('');
            }}
            className="flex items-center h-[48px] px-4 text-[16px] border border-surface-line rounded-4xl "
          >
            <img src={Reset} alt="reset" className="mr-1" />
            <p className="font-semibold text-font-sub">초기화</p>
          </button>
          <button
            onClick={() => {
              setFilterList(selectedLectures);
              console.log('전역확인', filterList);
              onClose();
            }}
            className="flex-1 h-[48px] px-[24px] py-[12px] rounded-4xl bg-primary-default text-white"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
