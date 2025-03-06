import { useState } from 'react';
import Bookmark from '../../../../shared/ui/icons/BookMark.svg';
import { BookmarkIcon } from '../../../../shared/ui/icons/BookmarkIcon';
import { BookmarkFiledIcon } from '../../../../shared/ui/icons/BookmarkFiledIcon';
import { useCreateBookMark } from '../../../../entities/lectures/home/hooks/useCreateBookMark';
import { useDeleteBookMark } from '../../../../entities/lectures/home/hooks/useDeleteBookMark';

import { useGetBookmarkState } from '../../../../entities/lectures/home/hooks/useGetBookmarkExist';

export const BookmarkButton = ({ postId }: { postId: number }) => {
  const [isToggled, setIsToggled] = useState(false);
  const { mutate: createBookmark } = useCreateBookMark();
  const { mutate: deleteBookmark } = useDeleteBookMark();
  const { data: bookmarkState } = useGetBookmarkState(postId);
  console.log('북마크상태', postId, bookmarkState);
  const handleBookmarkButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 버블링(버튼 클릭 시 부모 요소에 이벤트 전파) 중지
    e.stopPropagation();
    setIsToggled((prev) => !prev);
    if (!isToggled) {
      createBookmark({ postId: postId });
    } else {
      deleteBookmark(postId);
    }

    // mutate 호출 시, onSuccess 콜백 내에서 토글 상태 변경

    console.log(postId);
  };

  return (
    <>
      <button onClick={(e) => handleBookmarkButton(e)} className="text-line">
        {bookmarkState ? (
          <BookmarkFiledIcon className="text-primary-default" />
        ) : (
          <BookmarkIcon />
        )}
      </button>
    </>
  );
};
