// // LecturesForMeEdit.tsx
// import { useState, useEffect } from 'react';
// import { Left } from '../../shared/ui/icons/Left';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ErrorIcon } from '../../shared/ui/icons/ErrorIcon';
// import Editor from '../../shared/ui/icons/Editor'; // Editor 컴포넌트 가져오기
// import { usePutDemandLecture } from '../../entities/recomended/hooks/usePutDemandLecture';
// import axios from 'axios';
// import { useFetchDemandLectureDetailItem } from '../../entities/recomended/hooks/useFetchDemandLectureDetailItem';

// export const LecturesForMePut = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const postId = Number(id);
//   console.log('나와라얍', postId);

//   const [title, setTitle] = useState(''); // 제목 상태
//   const [content, setContent] = useState(''); // 본문 상태 (JSON 문자열 형태)
//   const [errorTitle, setErrorTitle] = useState(false); // 제목 에러 상태
//   const [errorContent, setErrorContent] = useState(false); // 본문 에러 상태

//   const { mutate } = usePutDemandLecture(); // 수정 API 요청 훅
//   // React Query로 게시글 데이터 가져오기
//   const { data: postData } = useFetchDemandLectureDetailItem(postId);

//   // 게시글 데이터가 로드되면 제목과 본문 상태를 초기화
//   useEffect(() => {
//     if (postData) {
//       setTitle(postData.title);
//       setContent(
//         typeof postData.content === 'string'
//           ? postData.content
//           : JSON.stringify(postData.content)
//       );
//     }
//   }, [postData]);

//   // Editor 변경 시 호출되는 함수
//   const handleEditorChange = (data: any) => {
//     setContent(JSON.stringify(data.blocks));
//   };

//   // 저장 버튼 클릭 시 실행되는 함수
//   const handleSubmit = () => {
//     const isTitleEmpty = !title.trim();
//     const isContentEmpty = !content.trim();

//     if (isTitleEmpty) {
//       setErrorTitle(true);
//       setErrorContent(false);
//       return;
//     }
//     if (isContentEmpty) {
//       setErrorContent(true);
//       return;
//     }

//     // PUT API 호출
//     mutate(
//       { postId, data: { title, content } },
//       {
//         onSuccess: (data) => {
//           console.log('게시글 수정 성공!');
//           console.log('수정데이터', data);
//           // 수정 성공 후 해당 게시글 상세 페이지로 이동
//           navigate(`/lectures-for-me/${postId}`);
//         },
//         onError: (error) => {
//           console.error('게시글 수정 실패:', error);
//           alert('게시글 수정에 실패했어요. 다시 시도해주세요!');
//         },
//       }
//     );
//   };

//   return (
//     <>
//       {/* 헤더 */}
//       <header className="flex justify-center items-center py-5 bg-surface-dark">
//         <div className="w-2/3 flex justify-between items-center">
//           <Left
//             className="cursor-pointer"
//             onClick={() => navigate(`/lectures-for-me/${postId}`)}
//           />
//           <button
//             onClick={handleSubmit}
//             className="bg-primary-default rounded-4xl px-7 py-2 text-white hover:bg-primary-dark transition"
//           >
//             저장
//           </button>
//         </div>
//       </header>

//       {/* 본문 */}
//       <main className="flex flex-col justify-center items-center py-15">
//         <div className="w-2/3">
//           {/* 제목 입력 */}
//           <h1>
//             <input
//               type="text"
//               className={`w-full text-2xl py-2 focus:outline-none focus:ring-2 ${
//                 errorTitle
//                   ? 'focus:ring-red-500 border-red-500'
//                   : 'focus:ring-primary-default'
//               }`}
//               placeholder="제목을 입력해줘"
//               value={title}
//               onChange={(e) => {
//                 setTitle(e.target.value);
//                 setErrorTitle(false);
//               }}
//             />
//           </h1>

//           <div className="my-5 border-t border-surface-line" />

//           {/* 본문 입력 (Editor 컴포넌트) */}
//           <Editor
//             initialData={content}
//             onChange={handleEditorChange}
//             readOnly={false}
//           />
//         </div>

//         {/* 제목 에러 메시지 */}
//         {errorTitle && (
//           <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
//             <ErrorIcon className="text-error" />
//             <p className="font-bold">제목을 입력해줘</p>
//           </div>
//         )}

//         {/* 본문 에러 메시지 */}
//         {errorContent && !errorTitle && (
//           <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
//             <ErrorIcon className="text-error" />
//             <p className="font-bold">본문을 입력해줘</p>
//           </div>
//         )}
//       </main>
//     </>
//   );
// };

// 새로 적은 것만 반영됨
// LecturesForMePut.tsx
// import { useState, useEffect, useRef } from 'react';
// import { Left } from '../../shared/ui/icons/Left';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ErrorIcon } from '../../shared/ui/icons/ErrorIcon';
// import Editor from '../../shared/ui/icons/Editor'; // 수정된 Editor 컴포넌트
// import { usePutDemandLecture } from '../../entities/recomended/hooks/usePutDemandLecture';
// import { useFetchDemandLectureDetailItem } from '../../entities/recomended/hooks/useFetchDemandLectureDetailItem';

// export const LecturesForMePut = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const postId = Number(id);
//   console.log('나와라얍', postId);

//   const [title, setTitle] = useState(''); // 제목 상태
//   // content 상태는 초기 데이터로 설정되지만, 최신 내용은 Editor 인스턴스에서 직접 가져올 예정
//   const [content, setContent] = useState('');
//   const [errorTitle, setErrorTitle] = useState(false);
//   const [errorContent, setErrorContent] = useState(false);

//   const { mutate } = usePutDemandLecture();
//   const { data: postData } = useFetchDemandLectureDetailItem(postId);

//   // Editor 인스턴스에 접근하기 위한 ref
//   const editorRef = useRef<any>(null);

//   // 게시글 데이터를 불러오면 제목과 본문 초기화
//   useEffect(() => {
//     if (postData) {
//       setTitle(postData.title);
//       setContent(
//         typeof postData.content === 'string'
//           ? postData.content
//           : JSON.stringify(postData.content)
//       );
//     }
//   }, [postData]);

//   // Editor onChange 콜백 (필요에 따라 상태 업데이트 가능)
//   const handleEditorChange = (data: any) => {
//     // 변경 내용이 있을 때 content 상태도 업데이트 (디버깅 용도)
//     const newContent = JSON.stringify(data.blocks);
//     console.log('Editor onChange:', newContent);
//     setContent(newContent);
//   };

//   // 저장 버튼 클릭 시 최신 Editor 데이터를 직접 가져옴
//   const handleSubmit = async () => {
//     const isTitleEmpty = !title.trim();
//     // await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms 지연
//     const savedData = await editorRef.current.save();
//     console.log('Saved data:', savedData);
//     // 제목, 본문 검증
//     if (isTitleEmpty) {
//       setErrorTitle(true);
//       setErrorContent(false);
//       return;
//     }

//     // Editor 인스턴스의 save() 메서드를 호출하여 최신 데이터를 가져옴
//     let newContent = content;
//     if (editorRef.current) {
//       try {
//         const savedData = await editorRef.current.save();
//         newContent = JSON.stringify(savedData.blocks);
//       } catch (err) {
//         console.error('Editor save error:', err);
//       }
//     }
//     if (!newContent.trim()) {
//       setErrorContent(true);
//       return;
//     }

//     // PUT API 호출
//     mutate(
//       { postId, data: { title, content: newContent } },
//       {
//         onSuccess: (data) => {
//           console.log('게시글 수정 성공!');
//           console.log('수정데이터', data);
//           navigate(`/lectures-for-me/${postId}`);
//         },
//         onError: (error) => {
//           console.error('게시글 수정 실패:', error);
//           alert('게시글 수정에 실패했어요. 다시 시도해주세요!');
//         },
//       }
//     );
//   };

//   return (
//     <>
//       {/* 헤더 */}
//       <header className="flex justify-center items-center py-5 bg-surface-dark">
//         <div className="w-2/3 flex justify-between items-center">
//           <Left
//             className="cursor-pointer"
//             onClick={() => navigate(`/lectures-for-me/${postId}`)}
//           />
//           <button
//             onClick={handleSubmit}
//             className="bg-primary-default rounded-4xl px-7 py-2 text-white hover:bg-primary-dark transition"
//           >
//             저장
//           </button>
//         </div>
//       </header>

//       {/* 본문 */}
//       <main className="flex flex-col justify-center items-center py-15">
//         <div className="w-2/3">
//           {/* 제목 입력 */}
//           <h1>
//             <input
//               type="text"
//               className={`w-full text-2xl py-2 focus:outline-none focus:ring-2 ${
//                 errorTitle
//                   ? 'focus:ring-red-500 border-red-500'
//                   : 'focus:ring-primary-default'
//               }`}
//               placeholder="제목을 입력해줘"
//               value={title}
//               onChange={(e) => {
//                 setTitle(e.target.value);
//                 setErrorTitle(false);
//               }}
//             />
//           </h1>

//           <div className="my-5 border-t border-surface-line" />

//           {/* Editor 컴포넌트에 ref 전달 */}
//           <Editor
//             ref={editorRef}
//             initialData={content}
//             onChange={handleEditorChange}
//             readOnly={false}
//           />
//         </div>

//         {/* 제목 에러 메시지 */}
//         {errorTitle && (
//           <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
//             <ErrorIcon className="text-error" />
//             <p className="font-bold">제목을 입력해줘</p>
//           </div>
//         )}

//         {/* 본문 에러 메시지 */}
//         {errorContent && !errorTitle && (
//           <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
//             <ErrorIcon className="text-error" />
//             <p className="font-bold">본문을 입력해줘</p>
//           </div>
//         )}
//       </main>
//     </>
//   );
// };

import { useState, useEffect, useRef, useCallback } from 'react';
import { Left } from '../../shared/ui/icons/Left';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorIcon } from '../../shared/ui/icons/ErrorIcon';
import Editor from '../../shared/ui/icons/Editor'; // forwardRef가 적용된 Editor 컴포넌트
import { usePutDemandLecture } from '../../entities/recomended/hooks/usePutDemandLecture';
import { useFetchDemandLectureDetailItem } from '../../entities/recomended/hooks/useFetchDemandLectureDetailItem';

export const LecturesForMePut = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  console.log('Editing postId:', postId);

  const [title, setTitle] = useState('');
  // 초기 콘텐츠: API로부터 받은 데이터 (JSON 문자열, 예: '{"blocks": [...]}')
  const [initialContent, setInitialContent] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);

  const { mutate } = usePutDemandLecture();
  const {
    data: postData,
    isLoading,
    error,
  } = useFetchDemandLectureDetailItem(postId);

  // Editor 인스턴스에 접근하기 위한 ref
  const editorRef = useRef<any>(null);
  // 변경 내용이 있을 때 저장할 mutable ref (불필요한 리렌더링 방지)
  const latestContentRef = useRef<string>('');

  // 게시글 데이터를 받아오면 제목과 초기 콘텐츠 설정
  useEffect(() => {
    if (postData) {
      setTitle(postData.title);
      const initial =
        typeof postData.content === 'string'
          ? postData.content
          : JSON.stringify(postData.content);
      setInitialContent(initial);
      latestContentRef.current = initial;
    }
  }, [postData]);

  // onChange 콜백을 useCallback으로 메모이제이션
  const handleEditorChange = useCallback((data: any) => {
    const newContent = JSON.stringify(data.blocks);
    latestContentRef.current = newContent;
    console.log('Editor onChange, latest content:', newContent);
  }, []);

  // 저장 버튼 클릭 시 전체 콘텐츠를 저장
  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrorTitle(true);
      setErrorContent(false);
      return;
    }

    // 강제로 현재 포커스 요소 블러 처리(커밋 보장)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // 약간의 지연을 두어 에디터 내부 상태 업데이트를 기다림
    await new Promise((resolve) => setTimeout(resolve, 200));

    let savedData;
    try {
      savedData = await editorRef.current.save();
      console.log('Saved data from editorRef.save():', savedData);
    } catch (err) {
      console.error('Editor save error:', err);
      return;
    }

    const savedBlocks = savedData && savedData.blocks ? savedData.blocks : [];
    console.log('Saved blocks:', savedBlocks);

    // 최종 데이터는 save() 결과가 있으면 사용하고, 그렇지 않으면 fallback
    const finalContent =
      savedBlocks.length > 0
        ? JSON.stringify({ blocks: savedBlocks })
        : JSON.stringify({ blocks: JSON.parse(latestContentRef.current) });
    console.log('Final content used for mutation:', finalContent);

    if (!finalContent.trim() || finalContent === '{"blocks":[]}') {
      setErrorContent(true);
      return;
    }

    mutate(
      { postId, data: { title, content: finalContent } },
      {
        onSuccess: () => {
          console.log('게시글 수정 성공!');
          navigate(`/lectures-for-me/${postId}`);
        },
        onError: (error) => {
          console.error('게시글 수정 실패:', error);
          alert('게시글 수정에 실패했어요. 다시 시도해주세요!');
        },
      }
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post data.</div>;

  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-center items-center py-5 bg-surface-dark">
        <div className="w-2/3 flex justify-between items-center">
          <Left
            className="cursor-pointer"
            onClick={() => navigate(`/lectures-for-me/${postId}`)}
          />
          <button
            onClick={handleSubmit}
            className="bg-primary-default rounded-4xl px-7 py-2 text-white hover:bg-primary-dark transition"
          >
            저장
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
              className={`w-full text-2xl py-2 focus:outline-none focus:ring-2 ${
                errorTitle
                  ? 'focus:ring-red-500 border-red-500'
                  : 'focus:ring-primary-default'
              }`}
              placeholder="제목을 입력해줘"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrorTitle(false);
              }}
            />
          </h1>

          <div className="my-5 border-t border-surface-line" />

          {/* Editor 컴포넌트: 초기 데이터는 initialContent, onChange 업데이트 */}
          <Editor
            ref={editorRef}
            initialData={initialContent}
            onChange={handleEditorChange}
            readOnly={false}
          />
        </div>

        {/* 제목 에러 메시지 */}
        {errorTitle && (
          <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
            <ErrorIcon className="text-error" />
            <p className="font-bold">제목을 입력해줘</p>
          </div>
        )}

        {/* 본문 에러 메시지 */}
        {errorContent && !errorTitle && (
          <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
            <ErrorIcon className="text-error" />
            <p className="font-bold">본문을 입력해줘</p>
          </div>
        )}
      </main>
    </>
  );
};
