// Editor.tsx
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import CodeTool from '@editorjs/code';
import Quote from '@editorjs/quote';

export interface EditorProps {
  onChange?: (data: any) => void;
  initialData?: string;
  readOnly?: boolean;
}

const Editor = forwardRef<EditorJS | null, EditorProps>(
  ({ onChange, initialData, readOnly = false }, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);

    // 부모 컴포넌트에서 에디터 인스턴스에 접근할 수 있도록 설정
    useImperativeHandle(ref, () => editorInstance.current!);

    // 초기 데이터를 파싱해서 Editor.js가 기대하는 형식으로 만듭니다.
    const getParsedData = () => {
      if (!initialData) return { blocks: [] };
      try {
        const parsed = JSON.parse(initialData);
        // parsed가 배열이면 래핑하여 { blocks: [...] } 형식으로 반환
        if (Array.isArray(parsed)) {
          return { blocks: parsed };
        }
        // parsed가 객체이면서 blocks가 배열이면 그대로 반환
        if (parsed && Array.isArray(parsed.blocks)) {
          return parsed;
        }
        return { blocks: [] };
      } catch (error) {
        console.error('initialData 파싱 실패:', error);
        return { blocks: [] };
      }
    };

    useEffect(() => {
      if (!editorInstance.current) {
        editorInstance.current = new EditorJS({
          holder: 'editorjs',
          readOnly: readOnly,
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
              const data = await editorInstance.current?.save();
              onChange?.(data);
            }
          },
          data: getParsedData(),
        });

        console.log('🛠 EditorJS 인스턴스 생성됨:', editorInstance.current);
      }

      return () => {
        console.log('🧹 Editor.js 정리 중...');
        if (
          editorInstance.current &&
          typeof editorInstance.current.destroy === 'function'
        ) {
          editorInstance.current.destroy();
        }
        editorInstance.current = null;
        // 컨테이너 초기화
        const editorHolder = document.getElementById('editorjs');
        if (editorHolder) {
          editorHolder.innerHTML = '';
        }
      };
    }, [initialData, readOnly, onChange]);

    return (
      <div
        id="editorjs"
        className={`h-[400px] md:h-[600px] prose max-w-none w-full p-[16px] md:p-[24px] ${
          readOnly ? 'cursor-default' : ''
        }`}
      />
    );
  }
);

export default Editor;
