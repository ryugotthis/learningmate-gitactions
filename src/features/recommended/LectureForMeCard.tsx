import { useState } from 'react';
import { UpIcon } from '../../shared/ui/icons/UpIcon';
import { CardData, LectureData } from './LectureForMeCardList';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';

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
  const [isVoted, setIsVoted] = useState(false);
  return (
    <>
      <div
        onClick={onClick}
        className="flex p-5 hover:bg-surface-dark cursor-pointer "
      >
        <button
          onClick={() => setIsVoted(!isVoted)}
          className={`flex flex-col justify-center gap-2 items-center mr-5 text-sm border-2 ${
            isVoted ? 'border-primary-default' : 'border-surface-line'
          } rounded-4xl py-0 px-2 cursor-pointer `}
        >
          <UpIcon className="text-surface-line" />
          <span>{data.likes}</span>
        </button>
        <div>
          <h2 className="font-bold">{data.title}</h2>
          <p className="mt-2 mb-5 text-xs text-font-sub-default">
            {data.content}
          </p>
          <div className="text-xs text-font-sub-default flex gap-5">
            <div className="flex items-center gap-1">
              <DateIcon />
              <span>{formatDate(data.createTime)}</span>
            </div>

            <div className="flex items-center gap-1">
              <ViewsIcon />
              <span>{data.views}</span>
            </div>

            <div className="flex items-center gap-1">
              <CommentIcon />
              <span>{data.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
