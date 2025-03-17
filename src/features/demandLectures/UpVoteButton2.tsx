import { useReissue } from '../../entities/auth/hooks/useReissue';
import { useGetPostLikeStatus } from '../../entities/lectures/home/hooks/useGetPostLikeStatus';
import { useCreateLikes } from '../../entities/recomended/hooks/useCreateDemandLectureLikes';
import { useDeleteLikes } from '../../entities/recomended/hooks/useDeleteLikes';
import { useAuthStore } from '../../shared/store/authstore';
import { UpVoteIcon } from '../../shared/ui/icons/UpVoteIcon';

export const UpVoteButton2 = ({ postId }: { postId: number }) => {
  const { mutate: likeMutate } = useCreateLikes();
  const { mutate: unLikeMutate } = useDeleteLikes();
  const { data: isLikeClicked } = useGetPostLikeStatus(postId);
  const { isLoggedIn } = useAuthStore();
  const { mutate: reissue } = useReissue();

  const handleVoteUpButton = () => {
    console.log('로그인상태', isLoggedIn);
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
