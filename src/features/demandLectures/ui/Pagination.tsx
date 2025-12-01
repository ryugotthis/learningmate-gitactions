import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisiblePages = 5; // ✅ 한 번에 보여줄 최대 페이지 수

  // ✅ 다음 페이지 그룹의 첫 숫자 (maxVisiblePages의 배수)
  const nextPage = Math.min(
    totalPages,
    Math.ceil(currentPage / maxVisiblePages) * maxVisiblePages + 1
  );

  // ✅ 이전 페이지 그룹의 첫 숫자 (maxVisiblePages의 배수)
  const prevPage =
    Math.floor(currentPage / maxVisiblePages) * maxVisiblePages -
    (maxVisiblePages - 1);

  // ✅ 현재 페이지 그룹의 첫 숫자 조정
  let startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* ⬅️ 이전 그룹 버튼 */}
      <button
        onClick={() => onPageChange(prevPage)}
        disabled={currentPage <= maxVisiblePages}
        className={`p-2 rounded-full ${
          currentPage <= maxVisiblePages
            ? 'text-gray-300'
            : 'text-gray-600 hover:text-black'
        }`}
      >
        {'<'}
      </button>

      {/* 페이지 번호 */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`p-2 w-8 h-8 flex items-center justify-center rounded-full 
            ${
              currentPage === page
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
          {page}
        </button>
      ))}

      {/* ➡️ 다음 그룹 버튼 */}
      <button
        onClick={() => onPageChange(nextPage)}
        disabled={currentPage + maxVisiblePages - 1 >= totalPages}
        className={`p-2 rounded-full ${
          currentPage + maxVisiblePages - 1 >= totalPages
            ? 'text-gray-300'
            : 'text-gray-600 hover:text-black'
        }`}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
