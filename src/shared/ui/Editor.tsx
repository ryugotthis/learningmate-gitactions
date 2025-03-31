import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
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
type ImperativeEditorHandle = {
  save: () => Promise<any>;
};

// forwardRef를 사용해 부모 컴포넌트에서 에디터 인스턴스 접근 가능하게 함
const Editor = forwardRef<ImperativeEditorHandle, EditorProps>(
  ({ onChange, initialData, readOnly = false, onReady }, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    // console.log('초기화되ㅇ었나', isInitialized);

    // 부모에서 ref.current로 Editor 인스턴스에 접근할 수 있게 설정
    // useImperativeHandle(ref, () => editorInstance.current!, []);
    // 명시적으로 save 메서드를 노출
    useImperativeHandle(
      ref,
      () => ({
        save: async () => {
          if (editorInstance.current) {
            return await editorInstance.current.save();
          }
          throw new Error('Editor 인스턴스가 준비되지 않았습니다');
        },
      }),
      // [editorInstance.current]
      [isInitialized]
    );

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
      let editor: EditorJS | null = null;

      const initEditor = () => {
        editor = new EditorJS({
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
            if (!readOnly && editor) {
              const data = await editor.save();
              onChange?.(data);
            }
          },
          onReady: () => {
            console.log('👍 에디터 준비 완료');
            editorInstance.current = editor;
            setIsInitialized(true);
            onReady?.();
          },
        });
      };

      // 에디터 초기화
      if (!editorInstance.current) {
        initEditor();
      }

      // 클린업 함수
      return () => {
        // if (editor) {
        //   console.log('🧹 Editor.js 정리 중...');
        //   editor.destroy();
        //   editorInstance.current = null;
        //   setIsInitialized(false);
        // }
        console.log('🧹 Editor.js 정리 중...');

        // 에디터 인스턴스가 있을 경우에만 destroy 실행
        if (editor && typeof editor.destroy === 'function') {
          editor.destroy();
        }

        editorInstance.current = null;
        setIsInitialized(false);
      };
      // const isRefValid = typeof ref !== 'function' && ref !== null;
      // if (!editorInstance.current) {
      //   editorInstance.current = new EditorJS({
      //     holder: 'editorjs',
      //     readOnly,
      //     placeholder: readOnly ? '' : '본문을 입력해줘',
      //     tools: {
      //       header: Header,
      //       list: List,
      //       code: CodeTool,
      //       quote: {
      //         class: Quote,
      //         config: {
      //           quotePlaceholder: '인용문을 입력하세요...',
      //         },
      //       },
      //     },
      //     data: getParsedData(),
      //     onChange: async () => {
      //       if (!readOnly) {
      //         const data = await editorInstance.current?.save();
      //         onChange?.(data);
      //       }
      //     },
      //     onReady: () => {
      //       if (!readOnly && isRefValid) {
      //         // 수정 모드 일때만
      //         onReady?.();
      //       }
      //     },
      //   });

      //   console.log('🛠 EditorJS 인스턴스 생성됨:', editorInstance.current);
      // }

      // return () => {
      //   console.log('🧹 Editor.js 정리 중...');
      //   editorInstance.current?.destroy?.();
      //   editorInstance.current = null;

      //   const editorHolder = document.getElementById('editorjs');
      //   if (editorHolder) {
      //     editorHolder.innerHTML = '';
      //   }
      // };
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
