// // Editor.tsx
// import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import ImageTool from '@editorjs/image';
// import CodeTool from '@editorjs/code';
// import Quote from '@editorjs/quote';

// export interface EditorProps {
//   onChange?: (data: any) => void;
//   initialData?: string;
//   readOnly?: boolean;
// }

// const Editor = forwardRef<EditorJS | null, EditorProps>(
//   ({ onChange, initialData, readOnly = false }, ref) => {
//     const editorInstance = useRef<EditorJS | null>(null);

//     // 부모 컴포넌트에서 에디터 인스턴스에 접근할 수 있도록 설정
//     useImperativeHandle(ref, () => editorInstance.current!);

//     // 초기 데이터를 파싱해서 Editor.js가 기대하는 형식으로 만듭니다.
//     const getParsedData = () => {
//       if (!initialData) return { blocks: [] };
//       try {
//         const parsed = JSON.parse(initialData);
//         // parsed가 배열이면 래핑하여 { blocks: [...] } 형식으로 반환
//         if (Array.isArray(parsed)) {
//           return { blocks: parsed };
//         }
//         // parsed가 객체이면서 blocks가 배열이면 그대로 반환
//         if (parsed && Array.isArray(parsed.blocks)) {
//           return parsed;
//         }
//         return { blocks: [] };
//       } catch (error) {
//         console.error('initialData 파싱 실패:', error);
//         return { blocks: [] };
//       }
//     };

//     useEffect(() => {
//       if (!editorInstance.current) {
//         editorInstance.current = new EditorJS({
//           holder: 'editorjs',
//           readOnly: readOnly,
//           placeholder: readOnly ? '' : '본문을 입력해줘',
//           tools: {
//             header: Header,
//             list: List,
//             image: {
//               class: ImageTool,
//               config: {
//                 endpoints: {
//                   byFile: 'https://api.imgbb.com/1/upload?key=your_api_key',
//                 },
//               },
//             },
//             code: CodeTool,
//             quote: {
//               class: Quote,
//               config: {
//                 quotePlaceholder: '인용문을 입력하세요...',
//               },
//             },
//           },
//           onChange: async () => {
//             if (!readOnly) {
//               const data = await editorInstance.current?.save();
//               onChange?.(data);
//             }
//           },
//           data: getParsedData(),
//         });

//         console.log('🛠 EditorJS 인스턴스 생성됨:', editorInstance.current);
//       }

//       return () => {
//         console.log('🧹 Editor.js 정리 중...');
//         if (
//           editorInstance.current &&
//           typeof editorInstance.current.destroy === 'function'
//         ) {
//           editorInstance.current.destroy();
//         }
//         editorInstance.current = null;
//         // 컨테이너 초기화
//         const editorHolder = document.getElementById('editorjs');
//         if (editorHolder) {
//           editorHolder.innerHTML = '';
//         }
//       };
//     }, [initialData, readOnly, onChange]);

//     return (
//       <div
//         id="editorjs"
//         className={`h-[400px] md:h-[600px] prose max-w-none w-full p-[16px] md:p-[24px] ${
//           readOnly ? 'cursor-default' : ''
//         }`}
//       />
//     );
//   }
// );

// export default Editor;
// Editor.tsx
// import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
// import EditorJS from '@editorjs/editorjs';

// // Editor.js 플러그인들
// import Header from '@editorjs/header';
// import List from '@editorjs/list';
// import ImageTool from '@editorjs/image';
// import CodeTool from '@editorjs/code';
// import Quote from '@editorjs/quote';

// // 에디터 컴포넌트에 전달할 props 타입 정의
// export interface EditorProps {
//   onChange?: (data: any) => void; // 에디터 내용이 바뀔 때 실행될 콜백 함수
//   initialData?: string; // 에디터에 표시할 초기 데이터(JSON 문자열)
//   readOnly?: boolean; // 읽기 전용 여부
// }

// // forwardRef를 사용해 부모 컴포넌트에서 에디터 인스턴스 접근 가능하게 함
// const Editor = forwardRef<EditorJS | null, EditorProps>(
//   ({ onChange, initialData, readOnly = false }, ref) => {
//     // EditorJS 인스턴스를 저장할 ref
//     const editorInstance = useRef<EditorJS | null>(null);

//     // 부모에서 ref.current로 Editor 인스턴스에 접근할 수 있게 설정
//     useImperativeHandle(ref, () => editorInstance.current!, []);

//     // 전달받은 initialData를 EditorJS가 기대하는 형태({ blocks: [...] })로 파싱
//     const getParsedData = () => {
//       if (!initialData) return { blocks: [] };

//       try {
//         const parsed = JSON.parse(initialData);

//         // 만약 배열이면 blocks로 감싸기
//         if (Array.isArray(parsed)) {
//           return { blocks: parsed };
//         }

//         // blocks가 있는 객체 형태이면 그대로 반환
//         if (parsed && Array.isArray(parsed.blocks)) {
//           return parsed;
//         }

//         // 이상한 구조일 경우 빈 블록으로
//         return { blocks: [] };
//       } catch (error) {
//         console.error('initialData 파싱 실패:', error);
//         return { blocks: [] };
//       }
//     };

//     // 에디터 초기화 및 해제
//     useEffect(() => {
//       // 에디터가 아직 생성되지 않았다면 초기화
//       if (!editorInstance.current) {
//         editorInstance.current = new EditorJS({
//           holder: 'editorjs', // 렌더링할 DOM 요소의 ID
//           readOnly: readOnly, // 읽기 전용 여부
//           placeholder: readOnly ? '' : '본문을 입력해줘',
//           tools: {
//             header: Header,
//             list: List,
//             image: {
//               class: ImageTool,
//               config: {
//                 endpoints: {
//                   byFile: 'https://api.imgbb.com/1/upload?key=your_api_key', // 이미지 업로드 API
//                 },
//               },
//             },
//             code: CodeTool,
//             quote: {
//               class: Quote,
//               config: {
//                 quotePlaceholder: '인용문을 입력하세요...',
//               },
//             },
//           },
//           data: getParsedData(), // 초기 데이터 주입
//           onChange: async () => {
//             // 읽기 전용이 아닐 때만 onChange 호출
//             if (!readOnly) {
//               const data = await editorInstance.current?.save();
//               onChange?.(data); // 상위로 데이터 전달
//             }
//           },
//         });

//         console.log('🛠 EditorJS 인스턴스 생성됨:', editorInstance.current);
//       }

//       // 언마운트 시 에디터 인스턴스 정리
//       return () => {
//         console.log('🧹 Editor.js 정리 중...');

//         // destroy()로 내부 리소스 해제
//         editorInstance.current?.destroy?.();
//         editorInstance.current = null;

//         // 기존 DOM 요소 클린업 (중복 생성 방지)
//         const editorHolder = document.getElementById('editorjs');
//         if (editorHolder) {
//           editorHolder.innerHTML = '';
//         }
//       };
//     }, [initialData, readOnly, onChange]);

//     // 실제 에디터가 렌더링될 div 요소
//     return (
//       <div
//         id="editorjs"
//         className={`h-[400px] md:h-[600px] prose max-w-none w-full p-[16px] md:p-[24px] ${
//           readOnly ? 'cursor-default' : ''
//         }`}
//       />
//     );
//   }
// );

// export default Editor;

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
}

// forwardRef를 사용해 부모 컴포넌트에서 에디터 인스턴스 접근 가능하게 함
const Editor = forwardRef<EditorJS | null, EditorProps>(
  ({ onChange, initialData, readOnly = false }, ref) => {
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
