// import { CardData } from './LectureCardList';
import Bookmark from '../../../shared/ui/icons/BookMark.svg';
import { useNavigate } from 'react-router-dom';
import Infren from '../../../widgets/header/ui/icons/Infren.svg';
import { BookmarkButton } from './home/BookmarkButton';

// interface LectureCardProps {
//   data: CardData;
// }

export const LectureCard = ({ data }: { data: any }) => {
  // console.log(Bookmark);
  const navigate = useNavigate();
  // const handleBookmarkButton = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   //  이벤트 버블링 이벤트 전파를 중지
  //   e.stopPropagation();
  // };
  return (
    <>
      {/* 본문 카드 */}
      <div
        onClick={() => navigate(`/lecture-detail/${data?.id}`)}
        className=" h-[332px] flex flex-col justify-between gap-[24px] px-[24px] pt-[24px] pb-[32px] border border-surface-line rounded-3xl flex-wrap cursor-pointer"
      >
        <div className="flex justify-between">
          <img
            src={data?.platform.title === '인프런' ? Infren : ''}
            alt="fastcampus"
            className="w-[60px]"
          />
          {/* <button onClick={(e) => handleBookmarkButton(e)} className="z-10">
            <img src={Bookmark} alt="bookmark" />
          </button> */}
          <BookmarkButton postId={data.id} />
        </div>
        <div className="flex flex-col h-[116px] gap-[8px]">
          <h2 className="font-semibold text-[20px] tracking-[-0.1em] text-font-default">
            {data?.title}
          </h2>
          <p className="text-[16px] text-font-sub tracking-[-0.05em] line-clamp-2">
            {data?.description}
          </p>
        </div>

        <div className="flex h-[42px] items-start divide-x">
          <div className="flex flex-col items-center gap-[8px] m-0 flex-1 tracking-[-0.05em]">
            <span className="font-semibold text-[20px] leading-[1.2rem] tracking-[-0.1em]">
              {data?.likes}
            </span>
            <span className="text-[14px] leading-none block">추천</span>
          </div>

          <div className="flex flex-col items-center gap-[8px] m-0 flex-1 tracking-[-0.05em]">
            <span className="font-semibold text-[20px] leading-[1.2rem] tracking-[-0.1em]">
              {data?.dislikes}
            </span>
            <span className="text-[14px] leading-none block">비추천</span>
          </div>
          <div className="flex flex-col items-center gap-[8px] m-0 flex-1 tracking-[-0.05em]">
            <span className="font-semibold text-[20px] leading-[1.2rem] tracking-[-0.1em]">
              {data?.views}
            </span>
            <span className="text-[14px] leading-none block">조회수</span>
          </div>
        </div>
      </div>
    </>
  );
};
