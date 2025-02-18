import { useState } from 'react';

const BLOCKS = [
  { type: 'text', label: 'Text' },
  { type: 'heading', label: 'Heading' },
  { type: 'image', label: 'Image' },
  { type: 'bulletList', label: 'List' },
  { type: 'code', label: 'Code' },
  { type: 'blockquote', label: 'Quote' },
] as const;

export const BlockMenu = ({
  onSelect,
}: {
  onSelect: (type: (typeof BLOCKS)[number]['type']) => void;
}) => {
  const [search, setSearch] = useState('');

  return (
    <div className="absolute bg-white shadow-md p-2 rounded-md w-48 border border-gray-300">
      {/* 검색 입력 필드 */}
      <input
        className="w-full border-b p-1 text-sm outline-none"
        placeholder="Filter"
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* 필터링된 블록 목록 */}
      {BLOCKS.filter((block) =>
        block.label.toLowerCase().includes(search.toLowerCase())
      ).map((block) => (
        <div
          key={block.type}
          className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelect(block.type)} // ✅ 여기서 선택된 블록의 타입을 상위 컴포넌트로 전달
        >
          <span>{block.label}</span>
        </div>
      ))}
    </div>
  );
};
