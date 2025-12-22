import React, { useState } from 'react';
// 아이콘
import {
  CloseIcon,
  SearchIcon,
  ResetIcon,
  DeleteCloseIcon,
} from '@/shared/ui/icons';

// 컴포넌트
import { useFilterList } from '@/shared/store/filterListStore';
// 데이터 커스텀 훅
import { useGetPlatforms } from '@/entities/lectures/model';
import { MoonLoader } from 'react-spinners';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState(''); // 사이트(플랫폼) 검색 입력값
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]); // 선택된 사이트(플랫폼)들 상태 관리
  const { data: platformData, isLoading, isError, error,refetch } = useGetPlatforms(); // 플랫폼 데이터

  const defaultPlatforms = platformData?.slice(0, 5); // 기본 5개만 표시

  // ✅ 입력값이 있으면 검색 필터 적용, 없으면 기본 강의 표시
  const filteredPlatforms =
    platformData && platformData.length > 0
      ? searchTerm
        ? platformData.filter((platform: any) =>
            platform.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : defaultPlatforms
      : [];

  // 선택/해제 함수
  const togglePlatform = (title: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const { setFilterList } = useFilterList(); // 사이트(플랫폼) 선택 저장 관리
  // 강의데이터 에러, 로딩 처리
  // if (isError)
  //   return <div className="text-error">error: {(error as Error).message}</div>;
  // if (isLoading)
  //   return (
  //     <div className="flex justify-center">
  //       <MoonLoader size={105} color="#17af6d" />
  //     </div>
  //   );

  return (
    <div
      className="fixed inset-0 flex items-end lg:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative w-full lg:w-[560px] bg-white rounded-[12px] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 사이트 제목과 x 버튼 */}
        <div className="flex items-center justify-between p-[16px] md:p-[24px] border-b-2">
          <h2 className="title-sm-600 md:title-md-600">사이트</h2>
          <button className="text-gray-600 text-xl" onClick={onClose}>
            <DeleteCloseIcon />
          </button>
        </div>

        {/*  검색창 */}
        <div className="px-[24px] py-[12px]">
          <div className="flex border border-line rounded-4xl py-[12px] px-[20px] items-center">
            <input
              type="text"
              placeholder="사이트 검색"
              className="text-md-400 flex-1 outline-none"
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

        {/* 선택된 강의 리스트 표시 */}
        {selectedPlatforms.length > 0 && (
          <ul className="flex px-[32px] pb-[20px] gap-[10px] flex-wrap">
            {selectedPlatforms.map((title) => {
              const platform = platformData.find(
                (platform: any) => platform.title === title
              );
              return platform ? (
                <li
                  key={title}
                  onClick={() => togglePlatform(platform.title)}
                  className="h-[28px] md:h-[35px] flex items-center gap-[4px] text-sm-500 md:text-md-500 border border-primary rounded-4xl text-primary px-[16px] cursor-pointer"
                >
                  <p>{platform.title}</p>
                  <CloseIcon className="w-[16px] h-[16px]" />
                </li>
              ) : null;
            })}
          </ul>
        )}

        {/* 강의 리스트 (검색 결과 or 기본 리스트) */}
        <ul className="flex h-[160px] lg:h-auto px-[32px] py-[12px] gap-[10px] border-t flex-wrap content-start">
          {isLoading && (
            <li className="w-full flex justify-center items-center py-4">
              <MoonLoader size={40} color="#17af6d" />
            </li>
          )}

          {isError && (
            <li className="w-full flex flex-col items-center gap-2 py-4 text-sm text-red-500">
              <p>플랫폼 목록을 불러오지 못했어요.</p>
              <p className="text-xs text-font-sub">
                {(error as Error)?.message || '잠시 후 다시 시도해 주세요.'}
              </p>
              <button
                type="button"
                onClick={() => refetch()}
                className="px-3 py-1 rounded-2xl border border-line text-font-sub text-xs"
              >
                다시 시도
              </button>
            </li>
          )}

          {!isLoading &&
            !isError &&
            filteredPlatforms?.map((lecture: any) => (
              <li
                key={lecture.id}
                onClick={() => togglePlatform(lecture.title)}
                className="h-[28px] md:h-[35px] border rounded-4xl text-sm-500 md:text-md-500 text-font-sub px-[16px] py-[4px] cursor-pointer"
              >
                {lecture.title}
              </li>
            ))}

          {!isLoading &&
            !isError &&
            filteredPlatforms &&
            filteredPlatforms.length === 0 && (
              <li className="w-full py-4 text-sm text-font-sub">
                표시할 사이트가 없어요.
              </li>
            )}
        </ul>

        {/* 초기화 / 적용 버튼 */}
        <div className="flex px-[24px] pb-[24px] pt-[8px] gap-[16px]">
          <button
            onClick={() => {
              setSelectedPlatforms([]);
              setSearchTerm('');
            }}
            className="flex gap-[4px] items-center h-[48px] px-4 text-[16px] border border-surface-line rounded-4xl "
          >
            <ResetIcon className="text-font-sub" />
            <p className="font-semibold text-font-sub">초기화</p>
          </button>
          <button
            onClick={() => {
              setFilterList(selectedPlatforms);
              onClose();
            }}
            className="flex-1 h-[48px] px-[24px] py-[12px] rounded-4xl bg-primary text-white"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
