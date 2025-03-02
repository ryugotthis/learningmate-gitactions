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

export const LectureDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 추출
  const postId = Number(id); // 문자열을 숫자로 변환

  const { data: lecture } = useGetLectureDetail(postId); // 강의 상세 데이터

  // const { data: upvoteData } = useGetUpVoteOpinion(postId); // 강의의 추천 의견들 데이터
  // 처음엔 3개 항목만 보여주고, 버튼 클릭 시 10개씩 추가로 보여줍니다.
  const [visibleCount, setVisibleCount] = useState(3);
  // const lecture = lecturesData?.find((lecture: any) => lecture.id === postId);
  const handleVoteUpButton = () => {};
  // console.log('보자', upvoteData);
  console.log('강의데이터', lecture);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-[80px] items-center mt-[100px]">
        <div className="w-[1152px] flex flex-col gap-[48px]">
          <header className="flex flex-col gap-[24px] px-[24px] pb-[24px] border-b">
            <img src={Infren} className="w-10 mb-3" />
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <h2 className="font-bold text-[32px]">
                  뉴욕 프로덕트 디자이너가 알려주는, 입문자를 위한 UX디자인 개론
                </h2>
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
                <button>
                  <BookmarkIcon />
                </button>
                <button>
                  <MoreIcon />
                </button>
              </div>
            </div>
          </header>

          {/* 강의 요약 */}
          <div className="flex flex-col gap-[16px] border rounded-lg p-[24px]">
            <h2 className="font-bold text-[24px]">강의요약</h2>
            <p>뉴욕에서 실무경험을 쌓은 전문가가 알려주는</p>
          </div>

          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-end gap-[10px] px-[16px]">
              <div className="relative w-[351px]  flex border rounded-4xl px-[20px] py-[12px]">
                <input
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
            {/* 추천 비추천 박스 */}
            <div className="flex justify-between ">
              {/* 추천 박스 */}
              <UpVoteCard postId={lecture?.id} visibleCount={visibleCount} />

              {/* 비추천 박스 */}
              <DownVoteCard postId={lecture?.id} visibleCount={visibleCount} />
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
          <button onClick={handleVoteUpButton}>
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
