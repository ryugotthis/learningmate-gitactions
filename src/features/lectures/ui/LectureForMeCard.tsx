import { useState } from 'react';
import { UpIcon } from '../../../shared/ui/icons/UpIcon';
import { CardData } from './LectureForMeCardList';
import { DateIcon } from '../../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../../shared/ui/icons/CommentIcon';

interface LectureCardForMeProps {
  data: CardData;
}

export const LecturesForMECard: React.FC<LectureCardForMeProps> = ({
  data,
}) => {
  const [isVoted, setIsVoted] = useState(false);
  return (
    <>
      <div className="flex p-5 ">
        <button
          onClick={() => setIsVoted(!isVoted)}
          className={`flex flex-col justify-center gap-2 items-center mr-5 text-sm border-2 ${
            isVoted ? 'border-primary-default' : 'border-surface-line'
          } rounded-4xl py-0 px-2 cursor-pointer `}
        >
          <UpIcon className="text-surface-line" />
          <span>{data.vote}</span>
        </button>
        <div>
          <h2 className="font-bold">{data.title}</h2>
          <p className="mt-2 mb-5 text-xs text-font-sub-default">
            {data.explanation}
          </p>
          <div className="text-xs text-font-sub-default flex gap-5">
            <div className="flex items-center gap-1">
              <DateIcon />
              <span>{data.data}</span>
            </div>

            <div className="flex items-center gap-1">
              <ViewsIcon />
              <span>{data.views}</span>
            </div>

            <div className="flex items-center gap-1">
              <CommentIcon />
              <span>{data.comment}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
