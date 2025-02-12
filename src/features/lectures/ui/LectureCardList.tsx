import Fastcampus from '../../../widgets/header/ui/icons/FastCampus.svg';
import { LectureCard } from './LectureCard';

// api 사용 데이터
// 플랫폼 로고, 강의 이름, 강의설명, 추천수, 비추천수, 조회수
// api/v1/lectures
export interface CardData {
  id: number;
  logoUrl: string;
  title: string;
  explanation: string;
  likes: number;
  dislikes: number;
  views: number;
}
const cardData: CardData[] = [
  {
    id: 0,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 1,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 2,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 3,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 4,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 5,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 6,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 7,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 8,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
  {
    id: 9,
    logoUrl: Fastcampus,
    title: '9개 도메인 프로젝트로 끝내는 벡엔드 웹개발 (Java/Spring)',
    explanation:
      '패스트캠퍼스의 9개 도메인 프로젝트 강좌는 다양한 실무 프로젝트를 통해 이론과 실습을 병행하며, 백...',
    likes: 10,
    dislikes: 56,
    views: 200,
  },
];

export const LectureCardList = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <LectureCard key={card.id} data={card} />
        ))}
      </div>
    </>
  );
};
