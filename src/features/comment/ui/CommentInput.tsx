import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// 커스텀 훅
import { useGetUser } from '../../../entities/auth/model/useGetUser ';
// 컴포넌트
import { useCreateDemandLectureComment } from '../../../entities/comments/model/useCreateDemandLectureComment';
// 아이콘
import { ProfileIcon, CheckIcon, ErrorIcon } from '../../../shared/ui/icons';

interface CommentInputProps {
  postId: number;
}

export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const { mutate, isPending } = useCreateDemandLectureComment(); // 댓글 등록 버튼 클릭시 post 하는 mutate
  const commentRef = useRef<HTMLTextAreaElement | null>(null); // 댓글 입력값 관리
  const [hasComment, setHasComment] = useState(false); // 댓글이 있는지 상태 관리
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); // 메시지 위한 댓글등록 성공/실패 상태 관리
  // 사용자 정보
  const { data: userData } = useGetUser(); // 유저 정보 데이터

  // 댓글 등록 성공/실패 2초 후에 메시지 제거
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const queryClient = useQueryClient(); // 낙관적 업데이트 위한 react-query 캐시 관리

  // 댓글 등록 클릭하면 입력값 post 하는 함수
  const handleCommentSubmit = () => {
    const commentText = commentRef.current?.value.trim();
    if (!commentText) return; // 입력값이 비었으면 아무 처리 없음

    mutate(
      { postId, data: { content: commentText } },
      {
        // responseData -> 포스트 성공시 응답 데이터
        onSuccess: (responseData) => {
          if (commentRef.current) commentRef.current.value = ''; // 입력창 초기화
          setHasComment(false); // 댓글 등록버튼 활성화
          setSubmitStatus('success'); // 성공 메시지

          console.log('✅ 댓글 등록 성공:', responseData.data);

          //응답에서 post 한 데이털를 받아서 낙관적 업데이트 해줌
          const newComment = responseData.data;

          if (newComment && newComment.id) {
            queryClient.setQueryData(
              ['demandLectureComments', postId],
              (oldData: any) => {
                return oldData ? [...oldData, newComment] : [newComment];
              }
            );
          } else {
            console.error('🚨 새 댓글 데이터가 유효하지 않음:', newComment);
            setSubmitStatus('error'); // 실패 상태 업데이트
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-3 p-5 border border-surface-line rounded-lg">
      <div className="flex items-center gap-2">
        {userData?.profileImage ? (
          <img
            src={userData.profileImage}
            alt="프로필이미지"
            className="w-[40px] h-[40px] rounded-full"
          />
        ) : (
          <ProfileIcon />
        )}
        <span className="text-[14px]">{userData?.name}</span>
      </div>

      <textarea
        ref={commentRef}
        className="w-full resize-none focus:outline-none border p-5 rounded-md"
        placeholder="댓글을 입력해줘"
        onChange={() => setHasComment(!!commentRef.current?.value.trim())} // comment 입력값이 있을때 등록 버튼 활성화
      />

      <button
        onClick={() => {
          console.log('클릭됨!');
          handleCommentSubmit();
        }}
        disabled={!hasComment || isPending}
        className={`px-5 py-1 rounded-4xl ${
          hasComment && !isPending ? 'cursor-pointer' : 'cursor-not-allowed'
        }  text-white bg-tertiary `}
      >
        등록
      </button>

      {/* 등록 결과 메시지 */}

      <div className="fixed bottom-[50px] left-0 right-0 w-full flex justify-center">
        <div className="w-[328px] flex justify-center">
    
          {submitStatus === 'success' && (
            <div className="bg-white flex gap-[6px] border-2 border-primary rounded-4xl px-[24px] py-[12px]">
              <CheckIcon className="text-primary" />

              <p className="text-md-500 text-font">댓글 등록 성공!</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-white flex gap-[6px] border-2 border-error rounded-4xl px-[24px] py-[12px]">
              <ErrorIcon className="text-error" />
              <p className="text-md-500 text-font">댓글 등록 실패</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
