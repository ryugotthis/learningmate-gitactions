import { useNavigate } from 'react-router-dom';

// 컴포넌트
import { BookmarkButton } from '../../../features/lectures/ui/BookmarkButton';
// 아이콘
import { PlatformIcons } from '../../../shared/ui/icons';

interface platformLogoProps {
  name: string;
  url: string;
}
export const platformLogo: platformLogoProps[] = [
  { name: '인프런', url: PlatformIcons.Infren },
  { name: '패스트캠퍼스', url: PlatformIcons.FastCampus },
  { name: '클래스101', url: PlatformIcons.Class101 },
  { name: '콜로소', url: PlatformIcons.Coloso },
  { name: '유데미', url: PlatformIcons.Udemy },
];
export const LectureCard = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  // 본문 카드의 플랫폼 로고 찾기
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
        {/* 로고, 북마크 */}
        <div className="flex justify-between">
          <img
            src={matchedPlatform ? matchedPlatform.url : '기본이미지URL'}
            alt={data?.platform.title || 'platformLogo'}
            className="w-[60px]"
          />
          <BookmarkButton postId={data.id} />
        </div>
        {/* 제목, 설명 */}
        <div className="flex flex-col h-[116px] gap-[8px]">
          <h2 className="title-sm-600 text-font-default line-clamp-2">
            {data?.title}
          </h2>
          <p className="text-md-400 text-font-sub line-clamp-2">
            {data?.description}
          </p>
        </div>
        {/* 추천, 비추천, 조회수 */}
        <div className="flex h-[42px] items-start divide-x">
          <div className="flex flex-col items-center gap-[8px] m-0 flex-1 ">
            <span className="title-sm-600 text-font-default">
              {data?.likes}
            </span>
            <span className="text-sm-400 text-font-sub">추천</span>
          </div>

          <div className="flex flex-col items-center gap-[8px] m-0 flex-1">
            <span className="title-sm-600 text-font-default">
              {data?.dislikes}
            </span>
            <span className="text-sm-400 text-font-sub">비추천</span>
          </div>
          <div className="flex flex-col items-center gap-[8px] m-0 flex-1">
            <span className="title-sm-600 text-font-default">
              {data?.views}
            </span>
            <span className="text-sm-400 text-font-sub">조회수</span>
          </div>
        </div>
      </div>
    </>
  );
};
