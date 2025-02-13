import { useRef } from 'react';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { useCreateDemandLectureComment } from '../../entities/recomended/api/comments/createDemandLectureComment';

interface CommentInputProps {
  postId: number;
}
export const CommentInput: React.FC<CommentInputProps> = ({ postId }) => {
  const { mutate, isPending } = useCreateDemandLectureComment(); // ✅ 댓글 등록 API 사용
  const commentRef = useRef<HTMLTextAreaElement | null>(null); // ✅ `useRef`로 입력값 관리
  const handleCommentSubmit = (postId: number) => {
    if (!commentRef.current?.value.trim()) return; // ✅ 빈 문자열 방지

    mutate(
      { postId, data: { content: commentRef.current.value } }, // ✅ API 호출
      {
        // responseData은 서버에서 보내주는 응답, 내가 보낸게 아님
        onSuccess: (responseData) => {
          if (commentRef.current) commentRef.current.value = ''; // ✅ 성공 후 입력창 초기화
          console.log('댓글 등록 성공!', responseData);
        },
        onError: (error) => {
          console.error('댓글 등록 실패:', error);
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-5 border border-surface-line rounded-lg">
        <ProfileIcon />

        <textarea
          className="w-full resize-none focus:outline-none"
          placeholder="댓글을 입력해줘"
          ref={commentRef}
        ></textarea>
        <div className="flex justify-end">
          <button
            onClick={() => handleCommentSubmit(postId)}
            disabled={isPending || !commentRef.current?.value.trim()}
            className="px-5 py-1 rounded-4xl bg-primary-default text-white cursor-pointer"
          >
            {isPending ? '등록 중...' : '등록'}
          </button>
        </div>
      </div>
    </>
  );
};
