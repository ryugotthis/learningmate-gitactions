// 1. `editorRef.current?.save()` 호출 전 `editorRef.current`의 null 여부와 save 존재 여부 체크
// 2. Editor가 아직 로딩되지 않았을 때는 예외 처리
// 3. 전반적인 흐름에 대해 주석 추가

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// 아이콘
import { LeftIcon, ErrorIcon } from '../../shared/ui/icons';
// Editor 컴포넌트 (lazy 로딩)
const Editor = React.lazy(() => import('../../shared/ui/Editor'));

// 커스텀 훅
import { useGetDemandLectureDetailItem } from '../../entities/demandLectures/model';
import { useUpdateDemandLecture } from '../../entities/demandLectures/model';

const LecturesForMePut = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  // 상태 관리
  const [title, setTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);

  // API 요청 훅
  const { mutate } = useUpdateDemandLecture();
  const {
    data: postData,
    isLoading,
    error,
  } = useGetDemandLectureDetailItem(postId);

  // 에디터 인스턴스 참조
  const editorRef = useRef<any>(null);
  const latestContentRef = useRef<string>('');

  // 데이터 수신 후 초기값 설정
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

  // 에디터 내용 변경 시 최신 내용 저장
  const handleEditorChange = useCallback((data: any) => {
    const newContent = JSON.stringify(data.blocks);
    latestContentRef.current = newContent;
    console.log('Editor onChange, latest content:', newContent);
  }, []);

  // 저장 버튼 클릭 시 호출되는 함수
  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrorTitle(true);
      setErrorContent(false);
      return;
    }

    // 포커스된 입력 요소 blur 처리
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    // 약간의 지연 후 에디터 내부 상태 반영을 기다림
    await new Promise((resolve) => setTimeout(resolve, 200));

    // 에디터가 준비되지 않았을 경우 예외 처리
    if (!editorRef.current || typeof editorRef.current.save !== 'function') {
      console.warn('Editor 인스턴스가 아직 준비되지 않았습니다.');
      alert('에디터가 아직 준비되지 않았어요. 잠시 후 다시 시도해주세요.');
      return;
    }

    let savedData;
    try {
      savedData = await editorRef.current.save();
      console.log('Saved data from editorRef.save():', savedData);
    } catch (err) {
      console.error('Editor save error:', err);
      alert('에디터 저장 중 오류가 발생했어요.');
      return;
    }

    const savedBlocks = savedData?.blocks ?? [];
    const finalContent =
      savedBlocks.length > 0
        ? JSON.stringify({ blocks: savedBlocks })
        : JSON.stringify({ blocks: JSON.parse(latestContentRef.current) });

    if (!finalContent.trim() || finalContent === '{"blocks":[]}') {
      setErrorContent(true);
      return;
    }

    // 서버로 업데이트 요청
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

          {/* 에디터 */}
          <Suspense
            fallback={
              <div className="p-4 text-center text-font-sub">
                에디터 로딩 중...
              </div>
            }
          >
            <Editor
              ref={editorRef}
              initialData={initialContent}
              onChange={handleEditorChange}
              readOnly={false}
            />
          </Suspense>
        </div>

        {/* 에러 메시지 */}
        {errorTitle && (
          <div className="flex gap-2 border-2 border-error rounded-4xl px-6 py-4">
            <ErrorIcon className="text-error" />
            <p className="font-bold">제목을 입력해줘</p>
          </div>
        )}

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

export default LecturesForMePut;
