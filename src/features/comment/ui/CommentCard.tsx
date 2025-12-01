import { useEffect, useRef, useState } from 'react';
// 컴포넌트
import { useDeleteComment } from '../../../entities/comments/model/useDeleteComment';
import { AlertMessage } from '../../../shared/ui';
// 커스텀 훅
import { useGetUser } from '../../../entities/auth/model/useGetUser ';
import { useUpdateComment } from '../../../entities/comments/model/useUpdateComment';
import { useReissue } from '../../../entities/auth/model/useReissue';
import { useFormatDate } from '../../../shared/util/useFormatDate';
import { LectureForMEReportModal } from '../../reports/ui/LectureForMeReportModal';
// 아이콘
import {
  MoreIcon,
  ProfileIcon,
  ErrorIcon,
  CheckIcon,
} from '../../../shared/ui/icons';

interface CommentCardProps {
  data: any;
  postId: number;
}

export const CommentCard: React.FC<CommentCardProps> = ({ data, postId }) => {
  const [reportedComments, setReportedComments] = useState<{
    [key: number]: boolean;
  }>({}); // ✅ 댓글별 신고 상태 관리
  // const { accessName } = useAuthStore();
  // 수정 에디터 vs 읽기 전용
  const [editMode, setEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState(data.content); // 기존 댓글 내용을 초기값으로 저장
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); // 성공/실패 메시지 상태 관리
  // const [isMoreToggled, setIsMoreToggled] = useState(false); // 더보기 버튼 상태 관리
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false); // 신고 성공 메시지 상태 관리
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: userData } = useGetUser();
  const { mutateAsync } = useReissue();
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: updateCommentMutate } = useUpdateComment(data.id);
  const toggleReport = (commentId: number) => {
    setReportedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // ✅ 해당 댓글의 신고 상태만 토글
    }));
  };

  // 1초 후에 메시지 제거
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  // const handleEdit = () => {
  //   setEditMode(true);
  // };

  const handleReportSuccess = () => {
    setReportSuccess(true);
    // 2초 후에 성공 메시지 숨김
    setTimeout(() => {
      setReportSuccess(false);
    }, 2000);
  };
  // 메뉴 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setReportedComments((prev) => ({
          ...prev,
          [data.id]: false, // ✅ 해당 댓글의 신고 상태만 토글
        }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // 댓글 등록 버튼 함수
  const handleEditCommentRegister = () => {
    if (!editedComment.trim()) {
      setSubmitStatus('noText');
      return;
    }

    // put API로 댓글 수정 요청
    try {
      mutateAsync();

      updateCommentMutate(
        { postId, data: { content: editedComment }, commentId: data.id },
        {
          onSuccess: () => {
            setEditMode(false); // 성공 시 수정 모드 종료
            setSubmitStatus('success');
          },
          onError: (error) => {
            console.error('댓글 수정 실패:', error);
            setSubmitStatus('error'); // 실패 상태 업데이트
          },
        }
      );
    } catch (error) {
      setSubmitStatus('error'); // 실패 상태 업데이트
    }
  };
  const handleDelete = () => {
    if (window.confirm('삭제하면 이 댓글은 다시 복구할 수 없어, 삭제 할래?')) {
      try {
        const commentId = data.id;

        // 삭제 API 호출 예시 (API 함수 이름은 상황에 맞게 변경)
        // await deletePostApi();

        deleteCommentMutate({ commentId, postId });
        // navigate('/lectures-for-me');
        // 전체 페이지 새로고침을 위해 window.location.href 사용
        // window.location.href = '/lectures-for-me';
        // window.location.reload();
        // 삭제 후 필요한 후속 작업(예: 페이지 이동, 상태 업데이트 등)
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };
  return (
    <div>
      {editMode ? (
        <div className="px-[12px] py-[18px]">
          <div
            key={data.id}
            className="flex flex-col gap-[12px] p-[16px] border border-line rounded-[8px]"
          >
            <div className="flex items-center gap-[10px]">
              {data.user.profileImage ? (
                <img
                  src={data.user.profileImage}
                  alt="프로필이미지"
                  className="w-[40px] h-[40px] rounded-full"
                />
              ) : (
                <ProfileIcon />
              )}
              <span className="text-[14px]">{data.user.name}</span>
            </div>

            <div className="flex flex-col gap-[16px]">
              <textarea
                // ref={commentRef}
                className="w-full resize-none focus:outline-none border border-primary p-[16px] rounded-[8px]"
                placeholder="댓글을 입력해줘"
                value={editedComment} // 기존 댓글 내용이 보임
                onChange={(e) => setEditedComment(e.target.value)}

                // onChange={() => setHasComment(!!commentRef.current?.value.trim())} // comment 입력값이 있을때 등록 버튼 활성화
              />

              <div className="flex gap-[10px] text-[14px]">
                <button
                  onClick={() => setEditMode(false)}
                  className="w-1/2 h-[40px] border border-line rounded-4xl px-[24px]"
                >
                  취소
                </button>
                <button
                  onClick={handleEditCommentRegister}
                  className="w-1/2 h-[40px] border bg-tertiary text-white rounded-4xl px-[24px]"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div key={data.id} className="flex flex-col gap-[16px] p-[16px]">
          <div className="flex w-full">
            <div className="flex flex-1 items-center gap-[12px]">
              {data.user.profileImage ? (
                <img
                  src={data.user.profileImage}
                  alt="프로필이미지"
                  className="w-[40px] h-[40px] rounded-full"
                />
              ) : (
                <ProfileIcon />
              )}
              <div className="flex gap-[4px] text-[14px]">
                <span className="text-font">{data.user.name}</span>
                <span>·</span>
                <span className="text-font-sub">
                  {useFormatDate(data.createTime)}
                </span>
              </div>
            </div>
            <div ref={menuRef} className="flex relative items-start">
              <button onClick={() => toggleReport(data.id)} className="">
                <MoreIcon className="text-tertiary" />
              </button>
              {reportedComments[data.id] && (
                <ul className="absolute top-2 right-0 mt-5 text-sm l-0 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                  {userData?.name === data.user.name ? (
                    <>
                      <li
                        onClick={() => setEditMode(true)}
                        className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
                      >
                        수정
                      </li>
                      <li
                        onClick={handleDelete}
                        className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
                      >
                        삭제
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={() => setIsReportModalOpen(!isReportModalOpen)}
                      className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
                    >
                      신고
                    </li>
                  )}
                </ul>
              )}
              {isReportModalOpen && (
                <LectureForMEReportModal
                  onClose={() => setIsReportModalOpen(false)}
                  onReportSuccess={handleReportSuccess}
                  title="comment"
                />
              )}
              {/* 신고 성공 메시지 오버레이 */}
              {reportSuccess && (
                <AlertMessage type="success" message="신고 접수 완료" />
              )}
            </div>
          </div>

          <div className="text-sm text-font-sub">
            <p className="mb-5 flex-grow text-font">{data.content}</p>
          </div>
        </div>
      )}
      <div className="fixed left-0 right-0 w-full bottom-[50px] flex justify-center">
        <div>
          {/* 등록 결과 메시지 */}
          {submitStatus === 'error' && (
            <div className="bg-white flex gap-[6px] border-2 border-error rounded-4xl px-[24px] py-[12px]">
              <ErrorIcon className="text-error" />
              <p className="font-bold">글 등록 실패! 다시 시도해줄래?</p>
            </div>
          )}
          {submitStatus === 'success' && (
            <div className="bg-white flex gap-[6px] border-2 border-primary rounded-4xl px-[24px] py-[12px]">
              <CheckIcon className="text-primary" />
              <p className="font-bold">글 등록 성공!</p>
            </div>
          )}
          {submitStatus === 'noText' && (
            <div className="bg-white flex gap-[6px] border-2 border-error rounded-4xl px-[24px] py-[12px]">
              <ErrorIcon className="text-error" />
              <p className="font-bold">댓글 내용을 입력해줘!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
