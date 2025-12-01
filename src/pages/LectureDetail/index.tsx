import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
//컴포넌트
import Header from '../../widgets/header';
import { CommentList } from '../../features/comment/ui/CommemtList';
import { CommentInput } from '../../features/comment/ui/CommentInput';
import { UpVoteCard } from '../../features/lectures/ui/UpVoteCard';
import { DownVoteCard } from '../../features/lectures/ui/DownVoteCard';
import { BookmarkButton } from '../../features/lectures/ui/BookmarkButton';
import { LectureReportModal } from '../../features/reports/ui/LectureReportModal';
import { AlertMessage } from '../../shared/ui';
import SEO from '../../shared/ui/SEO';
//아이콘
import {
  CommentIcon,
  DateIcon,
  DownIcon,
  LinkIcon,
  MoreIcon,
  SearchIcon,
  StartIcon,
  ViewsIcon,
  UpVoteIcon,
  DownVoteIcon,
  PlatformIcons,
} from '../../shared/ui/icons';

//커스텀 훅
import { useGetLectureDetail } from '../../entities/lectures/model/useGetLectureDetail';
import { useFormatDate } from '../../shared/util/useFormatDate';

interface Sort {
  name: string;
  id: number;
  query: string;
}
const sortList: Sort[] = [
  { name: '공감순', id: 0, query: 'likes' },
  { name: '최신순', id: 1, query: 'desc' },
];

const LectureDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 추출
  const postId = Number(id); // 문자열을 숫자로 변환

  const { data: lecture } = useGetLectureDetail(postId); // 강의 상세 데이터
  const [searchText, setSearchText] = useState(''); // 검색 데이터 내용
  const [visibleCount, setVisibleCount] = useState(3); // 의견 목록 최초 3개만 보여주기 더보기 버튼 누르면 10개 더 보여주기
  const [isMoreOpen, setIsMoreOpen] = useState(false); // 더보기 버튼 상태 관리
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // 신고버튼 상태 관리
  const [selected, setSelected] = useState('추천'); // 테블릿 모바일버전 추천/비추천 카드 선택 상태 관리
  const menuRef = useRef<HTMLDivElement>(null); // 신고 버튼
  const sortRef = useRef<HTMLDivElement>(null); // 신고 버튼
  // 정렬 부분
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // 정렬 창 오픈
  const [sortSelected, setSortSelected] = useState<Sort>(sortList[0]); // 정렬 선택

  const [reportSuccess, setReportSuccess] = useState(false); // 신고 성공 메시지 상태 관리

  // 모달 닫힘 후 호출되는 신고 성공 메시지 콜백
  const handleReportSuccess = () => {
    setReportSuccess(true);
    // 2초 후에 성공 메시지 숨김
    setTimeout(() => {
      setReportSuccess(false);
    }, 2000);
  };

  // 강의 페이지로 이동
  const handleGoToTheLecture = () => {
    if (lecture?.url) {
      window.open(lecture.url, '_blank'); // ✅ 새 창에서 URL 열기
    } else {
      alert('강의 URL을 불러오지 못했습니다.'); // ✅ URL이 없을 경우 알림
    }
  };
  // 링크 복사
  const handleCopyLink = useCallback(() => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('링크가 복사되었습니다!');
      })
      .catch((err) => {
        console.error('복사 실패:', err);
      });
  }, []);

  // 메뉴 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <SEO
        title={`러닝메이트 - ${lecture?.title}`}
        description="본문을 확인하세요"
        image="Logo.png"
        url={`lecture-detail/${postId}`}
        type="article"
      />
      <Header />
      <div className="flex flex-col gap-[80px] items-center mt-[100px]">
        <div className="w-[326px] md:w-[624px] lg:w-[1152px] flex flex-col gap-[48px]">
          {/* 제목 */}
          <header className="flex flex-col gap-[24px] px-[16px] md:px-[24px] pb-[24px] border-b">
            <img src={PlatformIcons.Infren} className="w-10 mb-3" />
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
                <button
                  onClick={handleGoToTheLecture}
                  className="flex gap-[4px] h-[40px] items-center border border-line px-[24px] rounded-4xl whitespace-nowrap"
                >
                  <StartIcon className="w-[18px] h-[24px]" />
                  <span className="">강의</span>
                </button>
                <button
                  name="link-copy"
                  onClick={handleCopyLink}
                  className="flex lg:gap-[4px] lg:h-[40px] items-center border border-line p-[12px] lg:px-[24px] lg:py-0 rounded-full lg:rounded-4xl"
                >
                  <LinkIcon className="w-[24px] h-[24px]" />
                  <span className="hidden lg:inline">링크 복사</span>
                </button>
                <BookmarkButton postId={postId} />
                <div ref={menuRef} className="relative">
                  <button onClick={() => setIsMoreOpen(!isMoreOpen)}>
                    <MoreIcon />
                  </button>
                  {isMoreOpen && (
                    <ul className="absolute right-0 md:left-0 w-[121px] flex justify-start py-[8px] mt-[20px] bg-white rounded-[12px] shadow-md">
                      <li
                        onClick={() => setIsReportModalOpen(!isReportModalOpen)}
                        className="px-[16px] py-[12px] text-font-sub text-md-500 cursor-pointer"
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
                </div>
              </div>
            </div>
          </header>

          {/* 강의 요약 */}
          <div className="flex flex-col gap-[16px] border rounded-lg px-[16px] py-[24px] md:px-[24px]">
            <h2 className="title-sm-600 md:title-md-600">강의요약</h2>
            <p className="info-md-400">{lecture?.description}</p>
          </div>

          {/* 본문 */}
          <div className="flex flex-col gap-[24px]">
            {/* 추천 검색 + 정렬 */}
            <div className="flex md:justify-end gap-[10px] md:px-[16px] text-font-sub">
              <div className="relative w-[351px]  flex border rounded-4xl px-[20px] py-[12px]">
                <input
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="추천 검색"
                  className="text-sm-400 md:text-md-400 outline-none w-full"
                />
                <SearchIcon className="" />
              </div>
              <div ref={sortRef} className="relative">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex gap-[4px] h-[40px] md:h-[48px] focus-within:outline-none justify-center items-center border pl-[24px] pr-[20px] border-surface-line border-opacity-100  text-font-sub rounded-4xl"
                >
                  <p className="text-sm-600 md:text-md-600 whitespace-nowrap">
                    {sortSelected.name}
                  </p>
                  <DownIcon className="w-[18px] " />
                </button>

                {isSortDropdownOpen && (
                  <ul className="absolute w-[121px] mt-[7px] text-[16px] font-medium bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    {sortList.map((sort) => (
                      <li
                        key={sort.id}
                        onClick={() => setSortSelected(sort)}
                        className="py-[12px] px-[16px] cursor-pointer text-font-sub text-md-500 whitespace-nowrap hover:bg-surface-dark"
                      >
                        {sort.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* 모바일,테블릿 추천/비추천 선택바 */}
            <div
              className={`justify-start lg:hidden relative inline-flex border-b border-gray-300 `}
            >
              <button
                onClick={() => setSelected('추천')}
                className={`px-[36px] py-[12px] focus:outline-none ${
                  selected === '추천'
                    ? 'text-font text-lg-600 md:title-sm-600'
                    : 'text-font-sub text-lg-500 md:title-sm-500'
                }`}
              >
                추천
              </button>
              <button
                onClick={() => setSelected('비추천')}
                className={`px-[36px] py-[12px] focus:outline-none ${
                  selected === '비추천'
                    ? 'text-font text-lg-600 md:title-sm-600'
                    : 'text-font-sub text-lg-500 md:title-sm-500'
                }`}
              >
                비추천
              </button>
              {/* 슬라이딩 인디케이터 */}
              <div
                className={`absolute bottom-0 h-[2px] transition-transform duration-300 ${
                  selected === '추천'
                    ? 'bg-primary w-[104px] translate-x-0'
                    : 'bg-error w-[124px] translate-x-[104px]'
                }`}
              />
            </div>
            {/* 모바일,테블릿 추천 비추천 박스  */}
            <div className="lg:hidden">
              {selected === '추천' ? (
                <UpVoteCard
                  postId={lecture?.id}
                  visibleCount={visibleCount}
                  searchText={searchText}
                  sort={sortSelected.query}
                />
              ) : (
                <DownVoteCard
                  postId={lecture?.id}
                  visibleCount={visibleCount}
                  searchText={searchText}
                  sort={sortSelected.query}
                />
              )}
            </div>

            {/* PC 추천/비추천 박스  */}
            <div className="hidden lg:flex lg:justify-between ">
              {/* 추천 박스 */}
              <UpVoteCard
                postId={lecture?.id}
                visibleCount={visibleCount}
                searchText={searchText}
                sort={sortSelected.query}
              />

              {/* 비추천 박스 */}
              <DownVoteCard
                postId={lecture?.id}
                visibleCount={visibleCount}
                searchText={searchText}
                sort={sortSelected.query}
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
            <UpVoteIcon className="text-primary w-[24px] h-[24px] md:w-[40px] md:h-[40px]" />
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
                    className="bg-primary h-full"
                    style={{ width: `${likePercentage}%` }}
                  ></div>
                  <div
                    className="bg-error h-full"
                    style={{ width: `${dislikePercentage}%` }}
                  ></div>
                </>
              );
            })()}
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
export default LectureDetail;
