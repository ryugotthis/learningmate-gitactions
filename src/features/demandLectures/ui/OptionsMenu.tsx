import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

// 컴포넌트
import { MoreOptionsButton } from './MoreOptionsButton';
// 커스텀 훅
import { useDeleteLectureForMe } from '../../../entities/demandLectures/model';
import { useReissue } from '../../../entities/auth/model/useReissue';
// 아이콘
import { LinkIcon } from '../../../shared/ui/icons';

export const OptionsMenu = ({
  name,
  postId,
}: {
  name: string;
  postId: number;
}) => {
  const navigate = useNavigate();

  const { mutateAsync: reissueToken } = useReissue();
  // 날강도 게시글 삭제 mutate
  const { mutate: deleteMutate } = useDeleteLectureForMe();

  const handleDelete = async () => {
    if (window.confirm('삭제하면 이 글은 다시 복구할 수 없어, 삭제 할래?')) {
      try {
        // 토큰 재발급을 먼저 시도합니다.
        await reissueToken();
        // 삭제 API 호출
        deleteMutate(postId);

        navigate('/lectures-for-me');
        // 전체 페이지 새로고침을 위해 window.location.href 사용
        // window.location.href = '/lectures-for-me';
        window.location.reload();
      } catch (error) {
        console.error('삭제 실패:', error);
        navigate('/login');
      }
    }
  };

  const handleCopyLink = useCallback(() => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('링크가 복사되었습니다!');
      })
      .catch((err) => {
        console.error('복사 실패:', err);
      });
  }, []);

  return (
    <div className="flex justify-end items-center gap-[24px] text-sm-600 text-font-sub">
      <button
        name="link-copy"
        onClick={handleCopyLink}
        className="flex lg:gap-[4px] lg:h-[40px] items-center border border-line p-[12px] lg:px-[24px] lg:py-0 rounded-full lg:rounded-4xl"
      >
        <LinkIcon className="w-[24px] h-[24px]" />

        <span className="hidden lg:inline">링크 복사</span>
      </button>
      <MoreOptionsButton
        handleDelete={handleDelete}
        name={name}
        postId={postId}
      />
    </div>
  );
};
