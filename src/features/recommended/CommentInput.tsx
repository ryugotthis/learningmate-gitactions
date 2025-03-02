import { useState, useRef, useEffect } from 'react';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { useCreateDemandLectureComment } from '../../entities/recomended/hooks/useCreateDemandLectureComment';
import { useQueryClient } from '@tanstack/react-query'; //

import { useGetUser } from '../../entities/auth/hooks/useGetUser ';
import { CheckIcon } from '../../shared/ui/icons/CheckIcon';
import { ErrorIcon } from '../../shared/ui/icons/ErrorIcon';

interface CommentInputProps {
  postId: number;
}

export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const { mutate, isPending } = useCreateDemandLectureComment();
  const commentRef = useRef<HTMLTextAreaElement | null>(null); // ✅ `useRef`로 입력값 관리
  const [hasComment, setHasComment] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null); // 성공/실패 상태 관리
  // 사용자 정보
  const { data: userData } = useGetUser();
  console.log('유저정보', userData);

  // 1초 후에 메시지 제거
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const queryClient = useQueryClient(); // ✅ react-query 캐시 관리

  const handleCommentSubmit = () => {
    const commentText = commentRef.current?.value.trim();
    if (!commentText) return;

    mutate(
      { postId, data: { content: commentText } },
      {
        // responseData -> 포스트 성공시 응답 데이터
        onSuccess: (responseData) => {
          if (commentRef.current) commentRef.current.value = ''; // ✅ 입력창 초기화
          setHasComment(false); // ✅ 댓글 등록 후 버튼 비활성화
          setSubmitStatus('success');

          console.log('✅ 댓글 등록 성공:', responseData.data);

          // ✅ 응답에서 실제 댓글 데이터만 추가 (예: responseData.data가 댓글 객체라면)
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
        <ProfileIcon />
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
        }  text-white bg-tertiary-default `}
      >
        등록
      </button>
      <div className="absolute w-full bottom-[-70px] flex justify-center">
        {/* 등록 결과 메시지 */}
        {submitStatus === 'error' && (
          <div className="bg-white flex gap-[6px] border-2 border-error rounded-4xl px-[24px] py-[12px]">
            <ErrorIcon className="text-error" />
            <p className="font-bold">글 등록 실패! 다시 시도해줄래?</p>
          </div>
        )}
        {submitStatus === 'success' && (
          <div className="bg-white flex gap-[6px] border-2 border-primary-default rounded-4xl px-[24px] py-[12px]">
            <CheckIcon className="text-primary-default" />

            <p className="font-bold">글 등록 성공!</p>
          </div>
        )}
      </div>
    </div>
  );
};
