import { LecturesForMECard } from './LectureForMeCard';

export interface CardData {
  id: number;
  vote: number;
  title: string;
  explanation: string;
  data: string;
  views: number;
  comment: number;
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

export const LecturesForMECardList = () => {
  return (
    <div className="border border-surface-line divide-y divide-surface-line ">
      {' '}
      {/* ✅ 카드 사이의 경계를 하나의 선으로 */}
      {cardData.map((card) => (
        <LecturesForMECard key={card.id} data={card} />
      ))}
    </div>
  );
};
