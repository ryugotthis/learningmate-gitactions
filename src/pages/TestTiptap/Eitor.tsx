import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { useState } from 'react';

const Editor = () => {
  const [content, setContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      TaskList,
      TaskItem,
      Image,
      Link,
      Highlight,
      Placeholder.configure({
        placeholder: '여기에 내용을 입력하세요...',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return <div>에디터를 불러오는 중...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      {/* 버튼 툴바 */}
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 border rounded"
        >
          굵게
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 border rounded"
        >
          기울이기
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-3 py-1 border rounded"
        >
          밑줄
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className="px-3 py-1 border rounded"
        >
          본문
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-3 py-1 border rounded"
        >
          제목 2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 border rounded"
        >
          ● 목록
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-3 py-1 border rounded"
        >
          1. 목록
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className="px-3 py-1 border rounded"
        >
          ✔ 할 일
        </button>
      </div>

      {/* 에디터 */}
      <div className="border p-4 rounded">
        <EditorContent editor={editor} />
      </div>

      {/* HTML 미리보기 */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">HTML Output:</h3>
        <div className="p-2 border rounded bg-gray-100">
          <pre className="whitespace-pre-wrap">{content}</pre>
        </div>
      </div>
    </div>
  );
};

export default Editor;
