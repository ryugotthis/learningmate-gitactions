// import { CardData } from './LectureCardList';
// import Bookmark from '../../../shared/ui/icons/BookMark.svg';
import { useNavigate } from 'react-router-dom';
import Infren from '../../../widgets/header/ui/icons/Infren.svg';
import FastCampus from '../../../widgets/header/ui/icons/FastCampus.svg';
import Class101 from '../../../widgets/header/ui/icons/Class101.svg';
import Coloso from '../../../widgets/header/ui/icons/Coloso.svg';
import Udemy from '../../../widgets/header/ui/icons/Udemy.svg';
import { BookmarkButton } from './home/BookmarkButton';

interface platformLogoProps {
  name: string;
  url: string;
}
export const platformLogo: platformLogoProps[] = [
  { name: '인프런', url: Infren },
  { name: '패스트캠퍼스', url: FastCampus },
  { name: '클래스101', url: Class101 },
  { name: '콜로소', url: Coloso },
  { name: '유데미', url: Udemy },
];
export const LectureCard = ({ data }: { data: any }) => {
  // console.log(Bookmark);
  const navigate = useNavigate();
  // const handleBookmarkButton = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   //  이벤트 버블링 이벤트 전파를 중지
  //   e.stopPropagation();
  // };
  const matchedPlatform = platformLogo.find(
    (platform) => platform.name === data?.platform.title
  );

  return (
    <>
      {/* 본문 카드 */}
      <div
        onClick={() => navigate(`/lecture-detail/${data?.id}`)}
        className=" h-[332px] flex flex-col justify-between gap-[24px] px-[24px] pt-[24px] pb-[32px] border border-surface-line rounded-3xl flex-wrap cursor-pointer"
      >
        <div className="flex justify-between">
          <img
            src={matchedPlatform ? matchedPlatform.url : '기본이미지URL'}
            alt={data?.platform.title || 'platformLogo'}
            className="w-[60px]"
          />
          <BookmarkButton postId={data.id} />
        </div>
        <div className="flex flex-col h-[116px] gap-[8px]">
          <h2 className="font-semibold text-[20px] tracking-[-0.1em] text-font-default line-clamp-2">
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
