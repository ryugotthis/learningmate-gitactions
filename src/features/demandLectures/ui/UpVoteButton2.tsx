// 커스텀 훅
import { useReissue } from '../../../entities/auth/model/useReissue';
import { useAuthStore } from '../../../shared/store/authstore';
import {
  useCreateLikes,
  useDeleteLikes,
  useGetPostLikeStatus,
} from '../../../entities/likes/model';
// 아이콘
import { UpVoteIcon } from '../../../shared/ui/icons';

export const UpVoteButton2 = ({ postId }: { postId: number }) => {
  const { mutate: likeMutate } = useCreateLikes(); // 좋아요 post
  const { mutate: unLikeMutate } = useDeleteLikes(); // 좋아요 delete
  const { data: isLikeClicked } = useGetPostLikeStatus(postId); // 좋아요 post 했는지 상태
  const { isLoggedIn } = useAuthStore(); // 로그인 여부
  const { mutate: reissue } = useReissue(); // 토큰 재발급 받기

  const handleVoteUpButton = () => {
    if (!isLoggedIn) {
      alert('로그인이 필요해');
    }
    if (isLoggedIn) {
      // reissue 호출
      reissue(undefined, {
        onSuccess: () => {
          // reissue가 성공하면, 현재 토글 상태에 따라 북마크 생성 또는 삭제
          if (isLikeClicked) {
            console.log('좋아요해제');
            unLikeMutate(postId);
          } else {
            likeMutate(postId);
          }
        },
        onError: (error) => {
          // reissue 실패 시 페이지 이동 (예: 로그인 페이지)
          console.error('reissue 실패', error);
          alert('로그인이 필요해');
        },
      });
    }
  };
  return (
    <button
      onClick={handleVoteUpButton}
      className={`flex justify-center items-center w-[64px] h-[64px] rounded-full border-2 ${
        isLikeClicked ? 'border-primary-default' : 'border-surface-line'
      } bg-white `}
    >
      <UpVoteIcon
        className={`w-[24px] h-[24px] ${
          isLikeClicked ? 'text-primary-default' : 'text-font-sub'
        }`}
      />
    </button>
  );
};
