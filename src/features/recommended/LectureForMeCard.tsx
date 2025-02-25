import { useState } from 'react';
import { UpIcon } from '../../shared/ui/icons/UpIcon';
import { CardData, LectureData } from './LectureForMeCardList';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { useLikeStore } from '../../shared/model/store';
import { usePostDemandLectureLikes } from '../../entities/recomended/hooks/usePostDemandLectureLikes';
import { useDeleteLikes } from '../../entities/recomended/hooks/useDeleteLikes';
import { UpVoteButton } from './UpVoteButton';
import { useFetchPostLikeStatus } from '../../entities/lectures/hooks/useFetchPostLikeStatus';

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
  return (
    <>
      <div
        onClick={onClick}
        className="flex px-[32px] py-[24px] gap-[32px] group hover:bg-surface-dark cursor-pointer transition"
      >
        {/* 추천버튼 */}
        <div onClick={(e) => e.stopPropagation()}>
          <UpVoteButton postId={data.id} likes={data.likes} />
        </div>

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
