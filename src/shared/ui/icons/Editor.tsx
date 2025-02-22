import React, { useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import Quote from '@editorjs/quote';

interface EditorProps {
  onChange?: (data: any) => void;
  initialData?: string;
  readOnly?: boolean; // ✅ 읽기 전용 모드 추가
}

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialData,
  readOnly = false,
}) => {
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: 'editorjs',
        readOnly: readOnly, // ✅ 읽기 전용 모드 설정
        placeholder: readOnly ? '' : '본문을 입력해줘',
        tools: {
          header: Header,
          list: List,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: 'https://api.imgbb.com/1/upload?key=your_api_key',
              },
            },
          },
          code: CodeTool,
          quote: {
            class: Quote,
            config: {
              quotePlaceholder: '인용문을 입력하세요...',
            },
          },
        },
        onChange: async () => {
          if (!readOnly) {
            // ✅ 읽기 전용 모드가 아닐 때만 onChange 실행
            const data = await editorInstance.current?.save();
            onChange?.(data);
          }
        },
        data: initialData ? { blocks: JSON.parse(initialData) } : undefined,
      });

      console.log('🛠 EditorJS 인스턴스 생성됨:', editorInstance.current);
    }

    return () => {
      console.log('🧹 Editor.js 정리 중...');
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, [initialData, readOnly]);

  return (
    <div
      id="editorjs"
      className={`h-140 prose max-w-none w-full ${
        readOnly ? 'cursor-default' : ''
      }`}
    />
  );
};

export default Editor;
