import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
//아이콘
import { LeftIcon, ErrorIcon } from '../../shared/ui/icons';
//컴포넌트
import Editor from '../../shared/ui/Editor'; // forwardRef가 적용된 Editor 컴포넌트

// 커스텀 훅
import { useGetDemandLectureDetailItem } from '../../entities/demandLectures/model';
import { useUpdateDemandLecture } from '../../entities/demandLectures/model';

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

  const { mutate } = useUpdateDemandLecture();
  const {
    data: postData,
    isLoading,
    error,
  } = useGetDemandLectureDetailItem(postId);

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
        <div className="w-[328px] md:w-[624px] lg:w-[1152px] h-[84px] flex justify-between items-center">
          <LeftIcon
            className="cursor-pointer"
            onClick={() => navigate(`/lectures-for-me/${postId}`)}
          />
          <button
            onClick={handleSubmit}
            className="h-[40px] px-[24px] text-sm-600 bg-primary-default rounded-4xl  text-white hover:bg-primary-dark transition"
          >
            수정
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col justify-center items-center py-15">
        <div className="w-[328px]  md:w-[624px] lg:w-[1152px] ">
          {/* 제목 입력 */}
          <h1 className="h-[70px] border-b border-surface-line">
            <input
              type="text"
              className={`w-full title-md-600 md:title-lg-600 px-[16px] md:px-[24px] focus:outline-none focus:ring-2 ${
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

          {/* <div className="my-5 border-t border-surface-line" /> */}

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
