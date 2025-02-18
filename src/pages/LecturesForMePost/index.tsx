import { useState } from 'react';
import { Left } from '../../shared/ui/icons/Left';
import { TiptapEditor } from '../../shared/ui/TiptapEditor';
import { useNavigate } from 'react-router-dom';

interface Block {
  id: number;
  type:
    | 'text'
    | 'heading'
    | 'image'
    | 'code'
    | 'bulletList'
    | 'blockquote'
    | null;
  content: string;
}

export const LecturesForMePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // ✅ 제목 상태
  const [blocks, setBlocks] = useState<Block[]>([
    { id: 0, type: null, content: '' }, // ✅ 기본 블록 추가
  ]);

  // ✅ `TiptapEditor`에서 블록 데이터를 변경하면 업데이트
  const handleContentChange = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
  };

  // ✅ 등록 버튼 클릭 시 제목과 본문이 비어있는지 확인 후 처리
  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요!');
      return;
    }
    if (blocks.length === 0 || blocks.every((block) => !block.content.trim())) {
      alert('본문을 입력해주세요!');
      return;
    }

    console.log('📌 제목:', title);
    console.log('📝 본문:', blocks);

    // API 연동 예제 (실제 API 요청이 필요할 경우 추가)
    // fetch('/api/posts', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title, blocks })
    // }).then(response => response.json())
    //   .then(data => console.log('Success:', data))
    //   .catch(error => console.error('Error:', error));
  };

  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-center items-center py-5 bg-surface-dark">
        <div className="w-2/3 flex justify-between items-center">
          <Left
            className="cursor-pointer"
            onClick={() => navigate('/lectures-for-me')}
          />
          <button
            onClick={handleSubmit}
            className="bg-primary-default rounded-4xl px-7 py-2 text-white hover:bg-primary-dark transition"
          >
            등록
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col justify-center items-center py-15">
        <div className="w-2/3">
          {/* 제목 입력 */}
          <h1>
            <input
              type="text"
              className="w-full text-2xl border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-default"
              placeholder="제목을 입력해 주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </h1>

          <div className="my-5 border-t border-surface-line" />

          {/* 본문 입력 (블록 에디터) */}
          <TiptapEditor onChange={handleContentChange} />
        </div>
      </main>
    </>
  );
};
