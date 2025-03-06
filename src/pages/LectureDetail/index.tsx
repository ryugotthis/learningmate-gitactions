import { useParams } from 'react-router-dom';
import { useGetLectures } from '../../entities/lectures/home/hooks/useGetLectures';
import { CommentList } from '../../features/recommended/CommemtList';
import { CommentInput } from '../../features/recommended/CommentInput';
import { BookmarkIcon } from '../../shared/ui/icons/BookmarkIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { DownIcon } from '../../shared/ui/icons/DownIcon';
import { LinkIcon } from '../../shared/ui/icons/LinkIcon';
import { MoreIcon } from '../../shared/ui/icons/MoreIcon';
import { SearchIcon } from '../../shared/ui/icons/SearchIcon';
import { StartIcon } from '../../shared/ui/icons/StartIcon';

import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import Header from '../../widgets/header';
import Infren from '../../widgets/header/ui/icons/Infren.svg';

import { useGetUpVoteOpinion } from '../../entities/lectures/home/opinion/hooks/useGetUpVoteOpinion';
import { UpVoteCard } from '../../features/lectures/ui/home/UpVoteCard';
import { DownVoteCard } from '../../features/lectures/ui/home/DownVoteCard';
import { UpVoteIcon } from '../../shared/ui/icons/UpVoteIcon';
import { DownVoteIcon } from '../../shared/ui/icons/DownVoteIcon';
import { useGetLectureDetail } from '../../entities/lectures/home/hooks/useGetLectureDetail';
import { useState } from 'react';
import { BookmarkButton } from '../../features/lectures/ui/home/BookmarkButton';
import { LectureReportModal } from '../../features/reports/LectureReportModal';
import { CheckIcon } from '../../shared/ui/icons/CheckIcon';
import { AlertMessage } from '../../shared/ui/Components/AlertMessage';

export const LectureDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 추출
  const postId = Number(id); // 문자열을 숫자로 변환

  const { data: lecture } = useGetLectureDetail(postId); // 강의 상세 데이터
  const [searchText, setSearchText] = useState('');

  // const { data: upvoteData } = useGetUpVoteOpinion(postId); // 강의의 추천 의견들 데이터
  // 처음엔 3개 항목만 보여주고, 버튼 클릭 시 10개씩 추가로 보여줍니다.
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMoreOpen, setIsMoreOpen] = useState(false); // 더보기 버튼 상태 관리
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고버튼 상태 관리
  // const lecture = lecturesData?.find((lecture: any) => lecture.id === postId);
  const [selected, setSelected] = useState('추천'); // 테블릿 모바일버전 추천/비추천 선택 상태 관리

  const [reportSuccess, setReportSuccess] = useState(false); // 신고 성공 메시지 상태 관리
  // 모달 닫힘 후 호출되는 신고 성공 콜백
  const handleReportSuccess = () => {
    setReportSuccess(true);
    // 2초 후에 성공 메시지 숨김
    setTimeout(() => {
      setReportSuccess(false);
    }, 2000);
  };

  // console.log('보자', upvoteData);
  console.log('강의데이터', lecture);
  console.log('검색데이터', searchText);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-[80px] items-center mt-[100px]">
        <div className="w-[326px] md:w-[624px] lg:w-[1152px] flex flex-col gap-[48px]">
          <header className="flex flex-col gap-[24px] px-[24px] pb-[24px] border-b">
            <img src={Infren} className="w-10 mb-3" />
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <h2 className="font-bold text-[32px]">{lecture?.title}</h2>
                <div className="text-xs text-font-sub-default flex gap-[16px]">
                  <div className="flex items-center gap-[4px]">
                    <DateIcon />
                    <span className="text-[14px]">0</span>
                  </div>

                  <div className="flex items-center gap-[4px]">
                    <ViewsIcon />
                    <span className="text-[14px]">{lecture?.views}</span>
                  </div>

                  <div className="flex items-center gap-[4px]">
                    <CommentIcon />
                    <span className="text-[14px]">{lecture?.comments}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-[24px]">
                <button className="flex gap-[4px] h-[40px] items-center border border-line px-[24px] rounded-4xl whitespace-nowrap">
                  <StartIcon className="w-[18px] h-[24px]" />
                  <span className="text-[14px]">강의</span>
                </button>
                <button className="flex gap-[4px] h-[40px] items-center border border-line px-[24px] rounded-4xl">
                  <LinkIcon className="w-[18px] h-[24px]" />
                  <span className="text-[14px]">링크 복사</span>
                </button>
                <BookmarkButton postId={postId} />
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="relative"
                >
                  <MoreIcon />
                  {isMoreOpen && (
                    <ul className="absolute left-0 w-[121px] flex justify-start py-[8px] bg-white rounded-[12px] shadow-md">
                      <li
                        onClick={() => setIsReportModalOpen(!isReportModalOpen)}
                        className="px-[16px] py-[12px] text-font-sub text-md-500"
                      >
                        신고
                      </li>
                    </ul>
                  )}
                  {isReportModalOpen && (
                    <LectureReportModal
                      onClose={() => setIsReportModalOpen(false)}
                      onReportSuccess={handleReportSuccess}
                    />
                  )}
                  {/* 신고 성공 메시지 오버레이 */}
                  {reportSuccess && (
                    <AlertMessage type="success" message="신고 접수 완료" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* 강의 요약 */}
          <div className="flex flex-col gap-[16px] border rounded-lg p-[24px]">
            <h2 className="font-bold text-[24px]">강의요약</h2>
            <p>{lecture?.description}</p>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-end gap-[10px] px-[16px]">
              <div className="relative w-[351px]  flex border rounded-4xl px-[20px] py-[12px]">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="추천 검색"
                  className="text-[16px] outline-none w-full"
                />
                <SearchIcon className="text-font-sub" />
              </div>
              <button className="flex items-center h-[48px] px-[24px] gap-[4px] border rounded-4xl text-font-sub text-[16px]">
                <p>공감순</p>
                <DownIcon className="w-[18px] " />
              </button>
            </div>
            {/* 모바일,테블릿 추천 비추천 선택 박스 */}
            <div className=" justify-start lg:hidden relative inline-flex border-b border-gray-300">
              <button
                onClick={() => setSelected('추천')}
                className="px-[36px] py-[12px] focus:outline-none"
              >
                추천
              </button>
              <button
                onClick={() => setSelected('비추천')}
                className="px-[36px] py-[12px] focus:outline-none"
              >
                비추천
              </button>
              {/* 슬라이딩 인디케이터 */}
              <div
                className="absolute bottom-0 h-[2px] bg-primary-default transition-transform duration-300"
                style={{
                  width: selected === '추천' ? '104px' : '124px',
                  transform:
                    selected === '추천' ? 'translateX(0)' : 'translateX(104px)',
                }}
              />
            </div>
            {/* 모바일,테블릿 추천 비추천 박스  */}
            <div className="lg:hidden">
              {selected === '추천' ? (
                <UpVoteCard
                  postId={lecture?.id}
                  visibleCount={visibleCount}
                  searchText={searchText}
                />
              ) : (
                <DownVoteCard
                  postId={lecture?.id}
                  visibleCount={visibleCount}
                  searchText={searchText}
                />
              )}
            </div>

            {/* PC 추천 비추천 박스  */}
            <div className="hidden lg:flex lg:justify-between ">
              {/* 추천 박스 */}
              <UpVoteCard
                postId={lecture?.id}
                visibleCount={visibleCount}
                searchText={searchText}
              />

              {/* 비추천 박스 */}
              <DownVoteCard
                postId={lecture?.id}
                visibleCount={visibleCount}
                searchText={searchText}
              />
            </div>
            {/* 더보기 버튼 */}
            <div className="flex justify-center">
              <button
                // "10개 더보기" 버튼 클릭 시 visibleCount 증가
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="h-[48px] border border-line px-[24px] rounded-4xl"
              >
                <p className="font-semibold text-font-sub tracking-[-0.05em]">
                  10개 더보기
                </p>
              </button>
            </div>
          </div>
        </div>
        {/* 추천 비추천 비율 바 */}
        <div className="flex w-[1152px] items-center gap-[24px] px-32px py-[40px]">
          <button>
            <UpVoteIcon className="text-primary-default" />
            <span>추천</span>
          </button>
          <span>{lecture?.likes}</span>
          <div className="flex-1 flex h-[48px] rounded-4xl overflow-hidden">
            {(() => {
              const totalVotes = lecture?.likes + lecture?.dislikes;
              const likePercentage =
                totalVotes > 0 ? (lecture?.likes / totalVotes) * 100 : 0;
              const dislikePercentage =
                totalVotes > 0 ? (lecture?.dislikes / totalVotes) * 100 : 0;
              return (
                <>
                  <div
                    className="bg-primary-default h-full"
                    style={{ width: `${likePercentage}%` }}
                  ></div>
                  <div
                    className="bg-error h-full"
                    style={{ width: `${dislikePercentage}%` }}
                  ></div>
                </>
              );
            })()}
            {/* <div
              className={`bg-primary-default w-[${lecture.likes}%] h-full`}
            ></div> */}
            {/* <div className={`bg-error w-[${lecture.dislikes}%] h-full`}></div> */}
          </div>
          <span>{lecture?.dislikes}</span>
          <button>
            <DownVoteIcon className="text-error" />
            <span>비추천</span>
          </button>
        </div>
        <section className="w-[1152px]">
          {/* 댓글 리스트 */}

          <CommentList postId={lecture?.id} />
          {/* 댓글 입력 */}
          <CommentInput postId={lecture?.id} />
        </section>
      </div>
    </>
  );
};
