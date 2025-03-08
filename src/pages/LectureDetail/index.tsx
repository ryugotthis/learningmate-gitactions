import { useParams } from 'react-router-dom';
// import { useGetLectures } from '../../entities/lectures/home/hooks/useGetLectures';
import { CommentList } from '../../features/recommended/CommemtList';
import { CommentInput } from '../../features/recommended/CommentInput';
// import { BookmarkIcon } from '../../shared/ui/icons/BookmarkIcon';
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

// import { useGetUpVoteOpinion } from '../../entities/lectures/home/opinion/hooks/useGetUpVoteOpinion';
import { UpVoteCard } from '../../features/lectures/ui/home/UpVoteCard';
import { DownVoteCard } from '../../features/lectures/ui/home/DownVoteCard';
import { UpVoteIcon } from '../../shared/ui/icons/UpVoteIcon';
import { DownVoteIcon } from '../../shared/ui/icons/DownVoteIcon';
import { useGetLectureDetail } from '../../entities/lectures/home/hooks/useGetLectureDetail';
import { useEffect, useRef, useState } from 'react';
import { BookmarkButton } from '../../features/lectures/ui/home/BookmarkButton';
import { LectureReportModal } from '../../features/reports/LectureReportModal';
// import { CheckIcon } from '../../shared/ui/icons/CheckIcon';
import { AlertMessage } from '../../shared/ui/Components/AlertMessage';
import { useFormatDate } from '../../shared/util/useFormatDate';

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
  const menuRef = useRef<HTMLDivElement>(null);

  const [reportSuccess, setReportSuccess] = useState(false); // 신고 성공 메시지 상태 관리
  // 모달 닫힘 후 호출되는 신고 성공 콜백
  const handleReportSuccess = () => {
    setReportSuccess(true);
    // 2초 후에 성공 메시지 숨김
    setTimeout(() => {
      setReportSuccess(false);
    }, 2000);
  };

  // 메뉴 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // console.log('보자', upvoteData);
  console.log('강의데이터', lecture);
  console.log('검색데이터', searchText);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-[80px] items-center mt-[100px]">
        <div className="w-[326px] md:w-[624px] lg:w-[1152px] flex flex-col gap-[48px]">
          <header className="flex flex-col gap-[24px] px-[16px] md:px-[24px] pb-[24px] border-b">
            <img src={Infren} className="w-10 mb-3" />
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <h2 className="title-md-600 md:title-lg-600">
                  {lecture?.title}
                </h2>
                <div className=" flex gap-[16px] text-sm-500 text-font-sub">
                  <div className="flex items-center gap-[4px] ">
                    <DateIcon />
                    <span className="">
                      {useFormatDate(lecture?.createTime)}
                    </span>
                  </div>

                  <div className="flex items-center gap-[4px]">
                    <ViewsIcon />
                    <span className="">{lecture?.views}</span>
                  </div>

                  <div className="flex items-center gap-[4px]">
                    <CommentIcon />
                    <span className="">{lecture?.comments}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-[24px] text-sm-600 text-font-sub">
                <button className="flex gap-[4px] h-[40px] items-center border border-line px-[24px] rounded-4xl whitespace-nowrap">
                  <StartIcon className="w-[18px] h-[24px]" />
                  <span className="">강의</span>
                </button>
                <button className="flex lg:gap-[4px] lg:h-[40px] items-center border border-line p-[12px] lg:px-[24px] lg:py-0 rounded-full lg:rounded-4xl">
                  <LinkIcon className="w-[24px] h-[24px]" />
                  <span className="hidden lg:inline">링크 복사</span>
                </button>
                <BookmarkButton postId={postId} />
                <div ref={menuRef}>
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className="relative"
                  >
                    <MoreIcon />
                    {isMoreOpen && (
                      <ul className="absolute right-0 md:left-0 w-[121px] flex justify-start py-[8px] mt-[20px] bg-white rounded-[12px] shadow-md">
                        <li
                          onClick={() =>
                            setIsReportModalOpen(!isReportModalOpen)
                          }
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
            </div>
          </header>

          {/* 강의 요약 */}
          <div className="flex flex-col gap-[16px] border rounded-lg px-[16px] py-[24px] md:px-[24px]">
            <h2 className="title-sm-600 md:title-md-600">강의요약</h2>
            <p className="info-md-400">{lecture?.description}</p>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="flex md:justify-end gap-[10px] md:px-[16px] text-font-sub">
              <div className="relative w-[351px]  flex border rounded-4xl px-[20px] py-[12px]">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="추천 검색"
                  className="text-sm-400 md:text-md-400 outline-none w-full"
                />
                <SearchIcon className="" />
              </div>
              <button className="flex items-center h-[48px] px-[24px] gap-[4px] border rounded-4xl text-[16px]">
                <p className="text-sm-600 md:text-md-600 whitespace-nowrap">
                  공감순
                </p>
                <DownIcon className="w-[18px] " />
              </button>
            </div>
            {/* 모바일,테블릿 추천 비추천 선택 박스 */}
            <div
              className={`justify-start lg:hidden relative inline-flex border-b border-gray-300 `}
            >
              <button
                onClick={() => setSelected('추천')}
                className={`px-[36px] py-[12px] focus:outline-none ${
                  selected === '추천'
                    ? 'text-font-default text-lg-600 md:title-sm-600'
                    : 'text-font-sub text-lg-500 md:title-sm-500'
                }`}
              >
                추천
              </button>
              <button
                onClick={() => setSelected('비추천')}
                className={`px-[36px] py-[12px] focus:outline-none ${
                  selected === '비추천'
                    ? 'text-font-default text-lg-600 md:title-sm-600'
                    : 'text-font-sub text-lg-500 md:title-sm-500'
                }`}
              >
                비추천
              </button>
              {/* 슬라이딩 인디케이터 */}
              <div
                className={`absolute bottom-0 h-[2px] transition-transform duration-300 ${
                  selected === '추천'
                    ? 'bg-primary-default w-[104px] translate-x-0'
                    : 'bg-error w-[124px] translate-x-[104px]'
                }`}
                // style={{
                //   width: selected === '추천' ? '104px ' : '124px',
                //   transform:
                //     selected === '추천' ? 'translateX(0)' : 'translateX(104px)',
                // }}
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
        <div className="flex w-[326px] md:w-[624px] lg:w-[1152px] items-center gap-[16px] md:gap-[24px] px-[16px] py-[24px] md:px-[32px] md:py-[40px]">
          <button className="flex flex-col gap-[8px] items-center w-[40px]">
            <UpVoteIcon className="text-primary-default w-[24px] h-[24px] md:w-[40px] md:h-[40px]" />
            <span className="text-md-600 md:title-md-600 whitespace-nowrap">
              추천
            </span>
          </button>
          <span className="text-lg-600 md:title-md-600">{lecture?.likes}</span>
          <div className="flex-1 flex h-[16px] md:h-[32px] lg:h-[48px] rounded-4xl overflow-hidden">
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
          <span className="text-lg-600 md:title-md-600">
            {lecture?.dislikes}
          </span>
          <button className="flex flex-col gap-[8px] items-center w-[42px] md:w-[62px]">
            <DownVoteIcon className="text-error w-[24px] h-[24px] md:w-[40px] md:h-[40px]" />
            <span className="text-md-600 md:title-md-600 whitespace-nowrap">
              비추천
            </span>
          </button>
        </div>
        <section className="w-[326px] md:w-[624px] lg:w-[1152px] mb-[100px]">
          {/* 댓글 리스트 */}

          <CommentList postId={lecture?.id} />
          {/* 댓글 입력 */}
          <CommentInput postId={lecture?.id} />
        </section>
      </div>
    </>
  );
};
