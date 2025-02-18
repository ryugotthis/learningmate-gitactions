import { useState, useRef, useEffect } from 'react';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { useCreateDemandLectureComment } from '../../entities/recomended/api/comments/createDemandLectureComment';
import { useQueryClient } from '@tanstack/react-query'; //

interface CommentInputProps {
  postId: number;
}

export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const { mutate, isPending } = useCreateDemandLectureComment();
  const commentRef = useRef<HTMLTextAreaElement | null>(null); // ✅ `useRef`로 입력값 관리
  const [hasComment, setHasComment] = useState(false);

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

          console.log('✅ 댓글 등록 성공:', responseData.data);

          // ✅ 응답에서 실제 댓글 데이터만 추가 (예: responseData.data가 댓글 객체라면)
          const newComment = responseData.data;

          if (newComment && newComment.id) {
            queryClient.setQueryData(
              ['demandLecture', postId],
              (oldData: any) => {
                return oldData ? [...oldData, newComment] : [newComment];
              }
            );
          } else {
            console.error('🚨 새 댓글 데이터가 유효하지 않음:', newComment);
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-3 p-5 border border-surface-line rounded-lg">
      <div className="flex items-center gap-2">
        <ProfileIcon />
        <span>해리</span>
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
    </div>
  );
};
