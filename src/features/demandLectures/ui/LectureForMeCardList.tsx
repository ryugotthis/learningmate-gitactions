import { LecturesForMECard } from './LectureForMeCard';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';

import { MoonLoader } from 'react-spinners';
import { useGetDemandLecture } from '../../../entities/demandLectures/model/useGetDemandLecture';
import { useGetMyDemandLectures } from '../../../entities/demandLectures/model/useGetMyDemandLectures';
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

interface LecturesForMECardListProps {
  isMyPost: boolean; // ✅ 'isMyPost'의 타입을 명시적으로 boolean으로 지정
  sort: string;
}

export const LecturesForMECardList: React.FC<LecturesForMECardListProps> = ({
  isMyPost,
  sort,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [lecturesForMeData, setLecturesForMeData] = useState<any[]>([]);
  console.log('🟨🟨🟨날강도 데이터', lecturesForMeData);
  // api에서 받은 날.강.도 게시글
  const {
    data: demandLecturesData,
    isLoading: isDataLoading,
    isError: isDataError,
    error: dataError,
  } = useGetDemandLecture({
    page: currentPage - 1,
    size: 10,
    sort: sort,
  });
  // api에서 받은 내가 쓴 날.강.도 게시글
  const {
    data: myDemandLecturesData,
    isLoading: isMyDataLoading,
    isError: isMyDataError,
    error: myDataError,
  } = useGetMyDemandLectures({
    page: currentPage - 1,
    size: 10,
    sort: sort,
  });
  console.log('내 글', myDemandLecturesData);
  const [data, setData] = useState<any>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (isMyPost) {
      setData(myDemandLecturesData);
    } else {
      setData(demandLecturesData);
    }
  }, [isMyPost, demandLecturesData, myDemandLecturesData]); // ✅ 의존성 배열 추가

  // ✅ `data`가 변경될 때 `totalPages`와 `lecturesForMeData` 업데이트
  useEffect(() => {
    setTotalPages(data?.totalPages || 0);
    setLecturesForMeData(data?.content || []);
  }, [data]); // ✅ `data`가 변경될 때 실행

  // 날강도 게시글 데이터 에러, 로딩 처리
  if (isDataError)
    return (
      <div className="text-error">error: {(dataError as Error).message}</div>
    );
  if (isDataLoading)
    return (
      <div className="flex justify-center">
        <MoonLoader size={105} color="#17af6d" />
      </div>
    );
  // 날강도 내 글 보기 게시글 데이터 에러, 로딩 처리
  if (isMyDataError)
    return (
      <div className="text-error">error: {(myDataError as Error).message}</div>
    );
  if (isMyDataLoading)
    return (
      <div className="flex justify-center">
        <MoonLoader size={105} color="#17af6d" />
      </div>
    );
  // 강의 데이터가 없을때
  if (!lecturesForMeData || lecturesForMeData.length === 0) {
    return (
      <div className="flex justify-center items-center border border-surface-line divide-y divide-surface-line py-15 rounded-xl overflow-hidden">
        <p className="text-font-sub-default">글을 등록해 줘</p>
      </div>
    );
  }

  const extractTextContent = (content: any): string => {
    try {
      // content가 객체인 경우, 노션 형태라 키값이 blocks 인 객체로 받음
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
    <div className="flex flex-col gap-[20px] md:gap-[40px]">
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
              sort={sort}
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
    </div>
  );
};
