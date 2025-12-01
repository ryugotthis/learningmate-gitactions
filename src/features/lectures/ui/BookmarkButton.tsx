// 데이터 커스텀 훅
import {
  useCreateBookMark,
  useDeleteBookMark,
  useGetBookmarkState,
} from '../../../entities/bookmarks/model';
import { useReissue } from '../../../entities/auth/model/useReissue';
import { useAuthStore } from '../../../shared/store/authstore';
// 아이콘
import { BookmarkIcon, BookmarkFiledIcon } from '../../../shared/ui/icons';

export const BookmarkButton = ({ postId }: { postId: number }) => {
  const { mutate: reissue } = useReissue(); // 토큰 재발급
  const { isLoggedIn } = useAuthStore(); // 로그인 상태
  const { mutate: createBookmark } = useCreateBookMark(); // 북마크 생성
  const { mutate: deleteBookmark } = useDeleteBookMark(); // 북마크 삭제
  const { data: bookmarkState } = useGetBookmarkState(postId); // 북마크된 데이터

  // 북마크 버튼 실행 함수
  const handleBookmarkButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 버블링(버튼 클릭 시 부모 요소에 이벤트 전파) 중지
    e.stopPropagation();
    if (!isLoggedIn) {
      alert('로그인이 필요해');
    }
    if (isLoggedIn) {
      // reissue 호출
      reissue(undefined, {
        onSuccess: () => {
          // reissue가 성공하면, 현재 토글 상태에 따라 북마크 생성 또는 삭제
          if (!bookmarkState) {
            createBookmark({ postId });
          } else {
            deleteBookmark(postId);
          }
        },
        onError: (error) => {
          console.error('reissue 실패', error);
          alert('로그인이 필요해');
        },
      });
    }
  };

  return (
    <>
      <button
        onClick={(e) => handleBookmarkButton(e)}
        name="bookmark-button"
        aria-label="북마크 추가"
        className="text-line"
      >
        {isLoggedIn ? (
          bookmarkState ? (
            <BookmarkFiledIcon className="text-primary" />
          ) : (
            <BookmarkIcon />
          )
        ) : (
          <BookmarkIcon />
        )}
      </button>
    </>
  );
};
