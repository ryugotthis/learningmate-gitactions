import { useDemandLecture } from '../../entities/recomended/hooks/useDemandLecture';

import { LecturesForMECard } from './LectureForMeCard';
import { useNavigate } from 'react-router-dom';
export interface CardData {
  id: number;
  vote: number;
  title: string;
  explanation: string;
  data: string;
  views: number;
  comment: number;
}
export interface LectureData {
  id: number;
  likes: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;

  views: number;
  comments: number;
}

export const cardData: CardData[] = [
  {
    id: 0,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 1,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 2,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 3,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 4,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 5,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 6,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 7,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 8,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
  {
    id: 9,
    vote: 102,
    title: 'Javascript 기초보고 응용할 만한 영상',
    explanation:
      'Javascript 기초보고 이론 동영상보고 이제 개인 프로젝트 해보려하는데 도움되는 강의 있을까요?',
    data: '25.02.01',
    views: 1.2,
    comment: 2,
  },
];

// api에서 받은 날.강.도 게시판 글

export const LecturesForMECardList = () => {
  const {
    data: lecturesForMeData,
    isLoading,
    isError,
    error,
  } = useDemandLecture();

  console.log('날강도데이터', lecturesForMeData);
  const navigate = useNavigate(); // ✅ 상세 페이지 이동을 위한 navigate 추가
  // if (isLoading) return <p>⏳ 로딩 중...</p>;
  // if (isError) return <p>❌ 오류 발생: {error.message}</p>;

  // ✅ 데이터가 없을 경우 보여줄 컴포넌트
  if (!lecturesForMeData || lecturesForMeData.length === 0) {
    return (
      <div className="flex justify-center items-center border border-surface-line divide-y divide-surface-line py-15 rounded-xl overflow-hidden">
        {' '}
        <p className="text-font-sub-default">글을 등록해 줘</p>
      </div>
    );
  }

  return (
    <>
      <div className="border border-surface-line divide-y divide-surface-line rounded-xl overflow-hidden">
        {lecturesForMeData.map((card: LectureData) => (
          <LecturesForMECard
            onClick={() => navigate(`/lectures-for-me/${card.id}`)}
            key={card.id}
            data={card}
          />
        ))}
      </div>
      {/* <div className="border flex justify-center items-center border-surface-line divide-y divide-surface-line rounded-xl overflow-hidden">
        {' '}
        <p className="bg-amber-200">글을 등록해 줘</p>
      </div> */}
    </>
  );
};
