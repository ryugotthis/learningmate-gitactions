import { useState } from 'react';
import { UpIcon } from '../../shared/ui/icons/UpIcon';
import { CardData, LectureData } from './LectureForMeCardList';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { useLikeStore } from '../../shared/model/store';
import { usePostDemandLectureLikes } from '../../entities/recomended/hooks/usePostDemandLectureLikes';
import { useDeleteLikes } from '../../entities/recomended/hooks/useDeleteLikes';

// interface LectureCardForMeProps {
//   data: CardData;
// }

interface LectureCardForMeProps {
  data: LectureData;
  onClick?: () => void; // ✅ onClick을 선택적 prop으로 추가 onClick?: () => void; // ✅ onClick을 선택적 prop으로 추가
}

// 날짜 형식 변경
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear().toString().slice(2); // '2025' → '25'
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월 → '01'
  const day = String(date.getDate()).padStart(2, '0'); // 9일 → '09'
  return `${year}.${month}.${day}`;
};

export const LecturesForMECard: React.FC<LectureCardForMeProps> = ({
  data,
  onClick,
}) => {
  const { mutate: likeMutate } = usePostDemandLectureLikes();
  const { mutate: unlikeMutate } = useDeleteLikes();
  // const { isLikesToggled, setIsLikesToggled } = useLikeStore();
  const { likedPosts, toggleLike } = useLikeStore();
  const likedPostsSet =
    likedPosts instanceof Set ? likedPosts : new Set(likedPosts);
  const isLiked = likedPostsSet.has(data.id);
  const handleVoteUpButton = (event: React.MouseEvent, postId: number) => {
    console.log('추천버튼클릭상태:', isLiked);
    event.stopPropagation(); // ✅ 부모 요소의 onClick 이벤트 실행 방지
    console.log('추천버튼 클릭 전 상태:', isLiked);
    if (isLiked) {
      console.log('좋아요해제');
      unlikeMutate(postId);
    } else {
      likeMutate(postId);
    }
    toggleLike(postId);
    console.log('추천버튼클릭상태 처리후:', isLiked);
  };
  return (
    <>
      <div> {`상태보여줘 ${isLiked}`}</div>
      <div
        onClick={onClick}
        className="flex px-[32px] py-[24px] gap-[32px] group hover:bg-surface-dark cursor-pointer transition"
      >
        <button
          onClick={(e) => handleVoteUpButton(e, data.id)}
          className={`w-[64px] h-[92px] py-[20px] flex flex-col justify-center items-center text-sm border-2 ${
            isLiked ? 'border-primary-default' : 'border-surface-line'
          } rounded-4xl py-0 px-2 cursor-pointer bg-white group-hover:bg-white`}
        >
          <UpIcon className="text-surface-line text-[24px] mb-2" />
          <span className="font-bold">{data.likes}</span>
        </button>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col h-[79px] gap-[12px]">
            <h2 className="font-semibold text-[20px]">{data.title}</h2>
            <p className="text-[16px] text-font-sub-default">{data.content}</p>
          </div>

          <div className="text-[14px] font-medium text-font-sub flex gap-[16px]">
            <div className="flex items-center gap-[4px]">
              <DateIcon />
              <span>{formatDate(data.createTime)}</span>
            </div>

            <div className="flex items-center gap-[4px]">
              <ViewsIcon />
              <span>{data.views}</span>
            </div>

            <div className="flex items-center gap-[4px]">
              <CommentIcon />
              <span>{data.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
