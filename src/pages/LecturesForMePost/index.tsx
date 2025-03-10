import { useState, useRef, useCallback, useEffect } from 'react';
import { Left } from '../../shared/ui/icons/Left';
import { useNavigate } from 'react-router-dom';
import { ErrorIcon } from '../../shared/ui/icons/ErrorIcon';
import { useCreateDemandLecture } from '../../entities/recomended/hooks/useCreateDemandLecture';
import Editor from '../../shared/ui/icons/Editor'; // Editor 컴포넌트 가져오기
import { useReissue } from '../../entities/auth/hooks/useReissue';

export const LecturesForMePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(''); // 제목 상태
  // 에디터 내용은 state 대신 ref로 관리해서 타이핑할 때마다 리렌더링을 방지
  const contentRef = useRef<string>('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); // 성공/실패 상태 관리

  const { mutate } = useCreateDemandLecture();
  const { mutateAsync: reissueToken } = useReissue();
  // const [isEditable, setIsEditable] = useState<Boolean | undefined>(undefined);

  // useCallback을 사용하여 onChange 함수의 참조를 고정합니다.
  const handleEditorChange = useCallback((data: any) => {
    // 이 형식 맞추니 수정됨...
    const newContent = JSON.stringify({ blocks: data.blocks });
    contentRef.current = newContent;
    console.log('Editor onChange (contentRef updated):', newContent);
  }, []);

  // 2초 후에 메시지 제거
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // 등록 버튼 클릭 시 ref에 저장된 최신 내용을 사용하여 mutate 호출
  const handleSubmit = async () => {
    const isTitleEmpty = !title.trim();
    const isContentEmpty = !contentRef.current.trim();

    if (isTitleEmpty) {
      setErrorTitle(true);
      setErrorContent(false);
      return;
    }
    if (isContentEmpty) {
      setErrorContent(true);
      return;
    }

    try {
      await reissueToken();
      mutate(
        {
          title,
          content: contentRef.current,
        },
        {
          onSuccess: (data) => {
            console.log('✅ 게시글 등록 성공!');

            // state를 함께 전달하여 페이지 이동
            navigate(`/lectures-for-me/${data.data.id}`, {
              state: { submitStatus: 'success' },
            });
          },
          onError: (error) => {
            console.error('❌ 게시글 등록 실패:', error);
            setSubmitStatus('error'); // 실패 상태 업데이트
          },
        }
      );
    } catch (error) {
      console.log('등록실패', error);
      setSubmitStatus('error'); // 실패 상태 업데이트
    }
  };

  return (
    <>
      {/* 헤더 */}
      <header className="flex justify-center items-center py-5 bg-surface-dark">
        <div className="w-[328px] md:w-[624px] lg:w-[1152px] h-[84px] flex justify-between items-center">
          <Left
            className="cursor-pointer"
            onClick={() => navigate('/lectures-for-me')}
          />
          <button
            onClick={handleSubmit}
            className="h-[40px] px-[24px] bg-primary-default rounded-4xl text-white hover:bg-primary-dark transition"
          >
            등록
          </button>
        </div>
      </header>

      {/* 본문 */}
      <main className="flex flex-col justify-center items-center py-15">
        <div className="w-[328px]  md:w-[624px] lg:w-[1152px]">
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

          {/* 본문 입력 (Editor 컴포넌트) */}
          <Editor onChange={handleEditorChange} readOnly={false} />
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
        {/* 등록 결과 메시지 */}
        {submitStatus === 'error' && (
          <div className="flex gap-[6px] border-2 border-error rounded-4xl px-[24px] py-[12px]">
            <ErrorIcon className="text-error" />
            <p className="text-md-500">글 등록 실패! 다시 한 번 시도해줄래?</p>
          </div>
        )}
      </main>
    </>
  );
};
