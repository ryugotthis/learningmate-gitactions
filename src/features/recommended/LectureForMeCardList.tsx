import { useDemandLecture } from '../../entities/recomended/hooks/useDemandLecture';
import { useFetchDemandLectureDetailItem } from '../../entities/recomended/hooks/useFetchDemandLectureDetailItem';

import { LecturesForMECard } from './LectureForMeCard';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import { useFetchMyDemandLectures } from '../../entities/recomended/hooks/useFetchMyDemandLectures';
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

interface LecturesForMECardListProps {
  isMyPost: boolean; // ✅ 'isMyPost'의 타입을 명시적으로 boolean으로 지정
}

// api에서 받은 날.강.도 게시판 글

export const LecturesForMECardList: React.FC<LecturesForMECardListProps> = ({
  isMyPost,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [lecturesForMeData, setLecturesForMeData] = useState<any[]>([]);
  // const [totalPages,setTotalPages] = useState(0);
  console.log('클릭확인', isMyPost);
  const {
    data: demandLecturesData,
    isLoading,
    isError,
    error,
  } = useDemandLecture({
    page: currentPage - 1,
    size: 10,
    sort: 'desc',
  });
  console.log('날강도뎅이터', demandLecturesData);

  const { data: myDemandLecturesData } = useFetchMyDemandLectures({
    page: currentPage - 1,
    size: 10,
    sort: 'desc',
  });
  console.log('내 글', myDemandLecturesData);
  const [data, setData] = useState<any>(undefined);
  // const totalPages = data?.totalPages;
  //   const lecturesForMeData = data?.content;

  const navigate = useNavigate();

  useEffect(() => {
    if (isMyPost) {
      console.log('내글설정');
      setData(myDemandLecturesData);
    } else {
      console.log('전체글');
      setData(demandLecturesData);
    }
  }, [isMyPost, demandLecturesData, myDemandLecturesData]); // ✅ 의존성 배열 추가

  // ✅ `data`가 변경될 때 `totalPages`와 `lecturesForMeData` 업데이트
  useEffect(() => {
    setTotalPages(data?.totalPages || 0);
    setLecturesForMeData(data?.content || []);
  }, [data]); // ✅ `data`가 변경될 때 실행

  if (!lecturesForMeData || lecturesForMeData.length === 0) {
    return (
      <div className="flex justify-center items-center border border-surface-line divide-y divide-surface-line py-15 rounded-xl overflow-hidden">
        <p className="text-font-sub-default">글을 등록해 줘</p>
      </div>
    );
  }

  const extractTextContent = (content: any): string => {
    try {
      // content가 이미 객체인 경우
      if (typeof content === 'object' && content !== null) {
        if (Array.isArray(content)) {
          return content
            .map((block) => block.data?.text || '')
            .filter(Boolean)
            .join('\n');
        }
        if ('blocks' in content) {
          return content.blocks
            .map((block: any) => block.data?.text || '')
            .filter(Boolean)
            .join('\n');
        }
      }

      // content가 문자열인 경우
      if (typeof content === 'string') {
        try {
          const parsed = JSON.parse(content);
          return extractTextContent(parsed);
        } catch {
          return content; // JSON 파싱 실패시 원본 문자열 반환
        }
      }

      return '';
    } catch (error) {
      console.error('컨텐츠 파싱 오류:', error);
      return '';
    }
  };

  return (
    <>
      <div className="border border-surface-line divide-y divide-surface-line rounded-xl overflow-hidden">
        {Array.isArray(lecturesForMeData) ? (
          lecturesForMeData.map((card: LectureData) => (
            <LecturesForMECard
              onClick={() => navigate(`/lectures-for-me/${card.id}`)}
              key={card.id}
              data={{
                ...card,
                content: extractTextContent(card.content),
              }}
            />
          ))
        ) : (
          <p className="text-font-sub-default">
            📌 데이터가 올바르지 않습니다.
          </p>
        )}
      </div>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
