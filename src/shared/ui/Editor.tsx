import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import EditorJS from '@editorjs/editorjs';

// Editor.js 플러그인들 (ImageTool 제거됨)
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import Quote from '@editorjs/quote';

// 에디터 컴포넌트에 전달할 props 타입 정의
export interface EditorProps {
  onChange?: (data: any) => void; // 에디터 내용이 바뀔 때 실행될 콜백 함수
  initialData?: string; // 에디터에 표시할 초기 데이터(JSON 문자열)
  readOnly?: boolean; // 읽기 전용 여부
  onReady?: () => void; // // EditorJS 인스턴스 초기화가 완료되었을 때 실행되는 콜백 함수
}

// forwardRef를 사용해 부모 컴포넌트에서 에디터 인스턴스 접근 가능하게 함
const Editor = forwardRef<EditorJS | null, EditorProps>(
  ({ onChange, initialData, readOnly = false, onReady }, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);

    // 부모에서 ref.current로 Editor 인스턴스에 접근할 수 있게 설정
    useImperativeHandle(ref, () => editorInstance.current!, []);

    // 전달받은 initialData를 EditorJS가 기대하는 형태({ blocks: [...] })로 파싱
    const getParsedData = () => {
      if (!initialData) return { blocks: [] };

      try {
        const parsed = JSON.parse(initialData);

        if (Array.isArray(parsed)) {
          return { blocks: parsed };
        }

        if (parsed && Array.isArray(parsed.blocks)) {
          return parsed;
        }

        return { blocks: [] };
      } catch (error) {
        console.error('initialData 파싱 실패:', error);
        return { blocks: [] };
      }
    };

    // 에디터 초기화 및 해제
    useEffect(() => {
      const isRefValid = typeof ref !== 'function' && ref !== null;
      if (!editorInstance.current) {
        editorInstance.current = new EditorJS({
          holder: 'editorjs',
          readOnly,
          placeholder: readOnly ? '' : '본문을 입력해줘',
          tools: {
            header: Header,
            list: List,
            code: CodeTool,
            quote: {
              class: Quote,
              config: {
                quotePlaceholder: '인용문을 입력하세요...',
              },
            },
          },
          data: getParsedData(),
          onChange: async () => {
            if (!readOnly) {
              const data = await editorInstance.current?.save();
              onChange?.(data);
            }
          },
          onReady: () => {
            if (!readOnly && isRefValid) {
              // 수정 모드 일때만
              onReady?.();
            }
          },
        });

        console.log('🛠 EditorJS 인스턴스 생성됨:', editorInstance.current);
      }

      return () => {
        console.log('🧹 Editor.js 정리 중...');
        editorInstance.current?.destroy?.();
        editorInstance.current = null;

        const editorHolder = document.getElementById('editorjs');
        if (editorHolder) {
          editorHolder.innerHTML = '';
        }
      };
    }, [initialData, readOnly, onChange, onReady]);

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
