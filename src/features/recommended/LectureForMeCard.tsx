import { LectureData } from './LectureForMeCardList';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';

import { UpVoteButtonContainer } from './UpVoteButtonContainer';

// interface LectureCardForMeProps {
//   data: CardData;
// }

interface LectureCardForMeProps {
  data: LectureData;
  onClick?: () => void; // ✅ onClick을 선택적 prop으로 추가 onClick?: () => void; // ✅ onClick을 선택적 prop으로 추가
  sort: string;
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
        className="flex px-[16px] md:px-[32px] py-[24px] gap-[24px] md:gap-[32px] hover:bg-surface-dark cursor-pointer transition"
      >
        {/* 추천버튼 */}
        <div onClick={(e) => e.stopPropagation()}>
          <UpVoteButtonContainer postId={data.id} likes={data.likes} />
        </div>

        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col md:h-[79px] gap-[12px]">
            <h2 className="text-lg-600 md:title-sm-600">{data.title}</h2>
            <p className="hidden md:block text-md-400 text-font-sub">
              {data.content}
            </p>
          </div>

          <div className="text-sm-500 text-font-sub flex gap-[16px]">
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
