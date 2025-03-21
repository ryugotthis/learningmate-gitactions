import { useState } from 'react';
//아이콘
import { DownVoteIcon, UpVoteIcon } from '../../../shared/ui/icons';

// 컴포넌트
import { VoteCardItem } from './VoteCardItem';
import { UpVoteOpinionModal } from '../opinion/ui/UpVoteOpinionModal';
import { DownVoteOpinionModal } from '../opinion/ui/DownVoteOpinionModal';
import Hangul from 'hangul-js'; // 한글 자음 단위로 필터링하기 위해

export const VoteCard = ({
  title,
  color,
  postId,
  opinionData,
  visibleCount,
  searchText,
}: {
  title: string;
  color: string;
  postId: number;
  opinionData: any;
  visibleCount: number;
  searchText: string;
}) => {
  // 모달의 열림/닫힘 상태를 저장할 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 의견 추가 버튼 클릭 시 모달 열림
  const handleAddOpinion = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 버튼 혹은 배경 클릭 시 모달 닫힘
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredOpinionData =
    title === '추천'
      ? opinionData?.filter((opinion: any) => {
          // opinion.title을 분해해서 하나의 문자열로 합침 (예: '한글' -> 'ㅎㅏㄴㄱㅡㄹ')
          const disassembledTitle = Hangul.disassemble(opinion.title).join('');
          // 검색어도 동일하게 분해
          const disassembledSearch = Hangul.disassemble(searchText).join('');
          // 분해된 문자열에서 검색어가 포함되어 있는지 확인
          return disassembledTitle.includes(disassembledSearch);
        })
      : [];

  return (
    <div className="flex flex-col border rounded-lg  lg:w-[564.5px] p-[24px]">
      <div
        className={`flex gap-[16px] items-center pb-[16px] border-b-4 border-${color}`}
      >
        {/* 추천/비추천 아이콘 및 이름 */}
        <div className="flex gap-[8px] w-full items-center">
          {title === '추천' ? (
            <UpVoteIcon className={`text-${color}`} />
          ) : (
            <DownVoteIcon className={`text-${color}`} />
          )}
          <span className="title-sm-600 md:title-md-600">{title}</span>
        </div>
        {/* 의견 추가 버튼 */}
        <button
          onClick={handleAddOpinion}
          className={`flex w-auto h-[40px] md:h-[48px] px-[24px] rounded-full bg-${color} text-white text-sm-600 md:text-md-600 justify-center items-center whitespace-nowrap`}
        >
          의견 추가
        </button>
      </div>

      {/* 카드 리스트를 보여주는 부분 최초 3개만 보여주기 더보기 버튼 누르면 10개 더 보여주기 */}
      <ul className="divide-y flex-1">
        {opinionData?.length > 0 ? (
          searchText ? (
            filteredOpinionData.length > 0 ? (
              filteredOpinionData
                .slice(0, visibleCount)
                .map((opinion: any) => (
                  <VoteCardItem
                    key={opinion.id}
                    opinion={opinion}
                    postId={postId}
                    title={title}
                  />
                ))
            ) : (
              <div
                className={`flex justify-center items-center h-full pt-[16px]`}
              >
                <p className="text-md-500 text-font-sub">검색어 없음</p>
              </div>
            )
          ) : (
            opinionData
              ?.slice(0, visibleCount)
              .map((opinion: any) => (
                <VoteCardItem
                  key={opinion.id}
                  opinion={opinion}
                  postId={postId}
                  title={title}
                />
              ))
          )
        ) : (
          <div className={`flex justify-center items-center h-full pt-[16px]`}>
            <p className="text-md-500 text-font-sub">의견을 추가 해줘!</p>
          </div>
        )}
      </ul>

      {/* 모달 표시 여부에 따라 조건부 렌더링 */}
      {isModalOpen &&
        (title === '추천' ? (
          <UpVoteOpinionModal onClose={handleCloseModal} postId={postId} />
        ) : (
          // <DownvoteOpinionModal onClose={handleCloseModal} postId={postId} />
          <DownVoteOpinionModal onClose={handleCloseModal} postId={postId} />
        ))}
    </div>
  );
};
