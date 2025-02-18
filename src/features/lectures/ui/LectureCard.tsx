import { CardData } from './LectureCardList';
import Bookmark from '../../../shared/ui/icons/BookMark.svg';
import { useNavigate } from 'react-router-dom';

interface LectureCardProps {
  data: CardData;
}

export const LectureCard: React.FC<LectureCardProps> = ({ data }) => {
  // console.log(Bookmark);
  const navigate = useNavigate();
  return (
    <>
      {/* 본문 카드 */}
      <div
        onClick={() => navigate('/lecture-detail')}
        className=" p-5 border border-surface-line rounded-3xl flex flex-col flex-wrap cursor-pointer"
      >
        <div className="flex justify-between">
          <img src={data.logoUrl} alt="fastcampus" className="w-10" />
          <button>
            <img src={Bookmark} alt="bookmark" />
          </button>
        </div>
        <div className="my-5">
          <h2 className="font-bold mb-2">{data.title}</h2>
          <p className="text-xs">{data.explanation}</p>
        </div>

        <div className="flex justify-around">
          <div className="flex flex-col items-center px-4">
            <span className="font-bold">{data.likes}</span>
            <span className="text-xs">추천</span>
          </div>

          <div className="flex flex-col items-center px-8 border-x border-gray-300">
            <span className="font-bold">{data.dislikes}</span>
            <span className="text-xs">비추천</span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="font-bold">{data.views}</span>
            <span className="text-xs">조회수</span>
          </div>
        </div>
      </div>
    </>
  );
};
