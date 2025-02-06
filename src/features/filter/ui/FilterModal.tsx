import React, { useState } from 'react';
import Search from '../../../shared/ui/icons/Search.svg';
import DeleteClose from '../../../shared/ui/icons/DeleteClose.svg';
import Reset from '../../../shared/ui/icons/Reset.svg';
import { useFilterList } from '../../../entities/filter/model/store';

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

const defaultLectures: Lecture[] = allLectures.slice(0, 5); // 기본 5개만 표시

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLectures, setSelectedLectures] = useState<number[]>([]);

  // ✅ 입력값이 있으면 검색 필터 적용, 없으면 기본 강의 표시
  const filteredLectures = searchTerm
    ? allLectures.filter((lecture) =>
        lecture.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      className="fixed inset-0 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg py-4 shadow-lg w-[490px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4">
          <h2 className="text-lg font-semibold">사이트</h2>
          <button className="text-gray-600 text-xl" onClick={onClose}>
            <img src={DeleteClose} />
          </button>
        </div>

        <div className="border-t-2 border-gray-300 my-4 w-full"></div>

        {/* ✅ 검색창 */}
        <div className="flex mx-3 border-2 border-gray-300 rounded-4xl p-2 items-center">
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
              <img src={DeleteClose} />
            </button>
          ) : (
            <button>
              <img src={Search} />
            </button>
          )}
        </div>

        {/* ✅ 선택된 강의 리스트 표시 */}

        {selectedLectures.length > 0 && (
          <ul className="flex mt-1 mx-4 flex-wrap">
            {selectedLectures.map((id) => {
              const lecture = allLectures.find((l) => l.id === id);
              return lecture ? (
                <li
                  key={id}
                  onClick={() => toggleLecture(lecture.id)}
                  className="border-2 border-primary-default rounded-4xl mx-1 my-1 text-sm font-bold text-primary-default px-3 py-1 cursor-pointer"
                >
                  <div className="flex">
                    <p>{lecture.name}</p>
                    <img
                      src={DeleteClose}
                      alt="deleteClose"
                      className="w-4 ml-1 font-bold"
                    />
                  </div>
                </li>
              ) : null;
            })}
          </ul>
        )}

        <div className="border-t-2 border-gray-300 my-4 w-full"></div>

        {/* ✅ 강의 리스트 (검색 결과 or 기본 리스트) */}
        <ul className="flex mx-4 ">
          {filteredLectures.map((lecture) => (
            <li
              key={lecture.id}
              onClick={() => toggleLecture(lecture.id)}
              className={`border-2 border-gray-300 rounded-4xl mx-1 my-1 text-sm font-bold text-gray-700 px-3 py-1 cursor-pointer `}
            >
              {lecture.name}
            </li>
          ))}
        </ul>

        {/* ✅ 초기화 / 적용 버튼 */}
        <div className="flex mt-4 mx-4">
          <button
            onClick={() => {
              setSelectedLectures([]);
              setSearchTerm('');
            }}
            className="flex items-center px-4 py-2 text-sm border border-surface-line rounded-4xl "
          >
            <img src={Reset} alt="reset" className="mr-1" />
            <p className="font-bold text-font-sub-default">초기화</p>
          </button>
          <button
            onClick={() => {
              setFilterList(selectedLectures);
              console.log('전역확인', filterList);
              onClose();
            }}
            className="flex-1 ml-3 px-4 py-2 border rounded-4xl bg-primary-default text-white"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
