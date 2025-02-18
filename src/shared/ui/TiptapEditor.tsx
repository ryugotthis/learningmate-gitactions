import { useState, useRef, useEffect } from 'react';
import { BlockMenu } from './BlockMenu';
import PlusIcon from '../../widgets/header/ui/icons/PlusIcon';

interface Block {
  id: number;
  type: 'text' | 'heading' | 'image' | 'bulletList' | 'code' | 'blockquote';
  content: string;
}

export const TiptapEditor = ({
  onChange,
}: {
  onChange: (blocks: Block[]) => void;
}) => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: Date.now(), type: 'text', content: '' },
  ]); // ✅ 기본값 text
  const [showBlockMenuIndex, setShowBlockMenuIndex] = useState<number | null>(
    null
  );
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    0
  ); // ✅ 첫 번째 블록 활성화
  const blockMenuRef = useRef<HTMLDivElement>(null);

  // ✅ 외부 클릭 시 `BlockMenu` 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blockMenuRef.current &&
        !blockMenuRef.current.contains(event.target as Node)
      ) {
        setShowBlockMenuIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // ✅ 빈 공간 클릭 시 새로운 `text` 블록 추가
  const handleEditorClick = () => {
    const newBlock: Block = { id: Date.now(), type: 'text', content: '' };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockIndex(blocks.length); // ✅ 마지막 블록을 선택 (자동 포커스)
  };

  // ✅ 블록 클릭 시 활성화
  const handleBlockClick = (index: number) => {
    setSelectedBlockIndex(index);
  };

  // ✅ `+ 버튼` 클릭 시 블록 타입 선택 메뉴 표시
  const handleAddBlock = (index: number) => {
    setShowBlockMenuIndex(index);
  };

  // ✅ 블록 유형 선택 후 해당 위치에 블록 추가
  const handleSelectBlock = (type: Block['type'], index: number) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], type };
    setBlocks(updatedBlocks);
    setShowBlockMenuIndex(null);
    onChange(updatedBlocks);
  };

  // ✅ 블록 내용 변경 핸들러
  const handleChange = (index: number, value: string) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].content = value;
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  // ✅ 엔터 키 입력 시 새로운 `text` 블록 추가
  const handleEnterPress = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newBlock: Block = { id: Date.now(), type: 'text', content: '' };
      const updatedBlocks = [...blocks];
      updatedBlocks.splice(index + 1, 0, newBlock);
      setBlocks(updatedBlocks);
      setSelectedBlockIndex(index + 1);
      onChange(updatedBlocks);
    }
  };

  return (
    <div
      className="relative border p-3 rounded-lg min-h-[200px]"
      onClick={handleEditorClick}
    >
      {/* 블록 리스트 */}
      {blocks.map((block, index) => (
        <div
          key={block.id}
          className="relative flex flex-col items-start my-3 w-full p-2 rounded-md border border-gray-300"
          onClick={(e) => {
            e.stopPropagation(); // 부모 클릭 방지
            handleBlockClick(index);
          }}
        >
          {/* + 버튼 */}
          <button
            className="absolute left-[-25px] cursor-pointer"
            onClick={() => handleAddBlock(index)}
          >
            <PlusIcon />
          </button>

          {/* 📌 TEXT 블록 (기본값) */}
          {block.type === 'text' && (
            <input
              type="text"
              value={block.content}
              placeholder="텍스트를 입력하세요..."
              className="w-full border-none rounded-md px-3 py-2 focus:outline-none"
              autoFocus={selectedBlockIndex === index}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleEnterPress(e, index)}
            />
          )}

          {/* 📌 HEADING 블록 */}
          {block.type === 'heading' && (
            <input
              type="text"
              value={block.content}
              placeholder="제목을 입력하세요..."
              className="w-full text-2xl font-bold border-none focus:outline-none"
              autoFocus={selectedBlockIndex === index}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleEnterPress(e, index)}
            />
          )}

          {/* 📌 IMAGE 블록 */}
          {block.type === 'image' && (
            <>
              <input
                type="text"
                value={block.content}
                placeholder="이미지 URL을 입력하세요..."
                className="w-full border-none rounded-md px-3 py-2 focus:outline-none"
                autoFocus={selectedBlockIndex === index}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              {block.content && (
                <img
                  src={block.content}
                  alt="Uploaded"
                  className="mt-2 max-w-full h-auto rounded-md"
                />
              )}
            </>
          )}

          {/* 📌 CODE 블록 */}
          {block.type === 'code' && (
            <textarea
              value={block.content}
              placeholder="코드를 입력하세요..."
              className="w-full font-mono bg-gray-900 text-white p-2 rounded-md focus:outline-none"
              autoFocus={selectedBlockIndex === index}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          )}

          {/* 📌 BULLET LIST 블록 */}
          {block.type === 'bulletList' && (
            <textarea
              value={block.content}
              placeholder="리스트 항목을 줄바꿈으로 입력하세요..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              autoFocus={selectedBlockIndex === index}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          )}
          {block.type === 'bulletList' && block.content && (
            <ul className="list-disc pl-5 mt-2">
              {block.content.split('\n').map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {/* 📌 QUOTE 블록 */}
          {block.type === 'blockquote' && (
            <blockquote className="w-full border-l-4 border-gray-400 pl-4 italic text-gray-700">
              <textarea
                value={block.content}
                placeholder="인용문을 입력하세요..."
                className="w-full border-none px-3 py-2 focus:outline-none"
                autoFocus={selectedBlockIndex === index}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </blockquote>
          )}

          {/* 블록 메뉴 (해당 블록 아래에 표시) */}
          {showBlockMenuIndex === index && (
            <div
              ref={blockMenuRef}
              className="absolute bg-white shadow-md border border-gray-300 rounded-md p-2 mt-3"
            >
              <BlockMenu onSelect={(type) => handleSelectBlock(type, index)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
