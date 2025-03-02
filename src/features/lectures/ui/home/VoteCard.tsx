import { useState } from 'react';
import { DownVoteIcon } from '../../../../shared/ui/icons/DownVoteIcon';

import { UpVoteIcon } from '../../../../shared/ui/icons/UpVoteIcon';
import { VoteCardItem } from './VoteCardItem';
import { UpVoteOpinionModal } from './UpVoteOpinionModal';
import { DownVoteOpinionModal } from './DownVoteOpinionModal';

export const VoteCard = ({
  title,
  color,
  postId,
  opinionData,
  visibleCount,
}: {
  title: string;
  color: string;
  postId: number;
  opinionData: any;
  visibleCount: number;
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
  console.log('확인!!!', opinionData);
  console.log('토글상태', isModalOpen);

  return (
    <div className="border rounded-lg w-[564.5px] p-[24px]">
      <div
        className={`flex gap-[16px] items-center pb-[16px] border-b-4 border-${color}`}
      >
        <div className="flex gap-[8px] w-full items-center">
          {title === '추천' ? (
            <UpVoteIcon className={`text-${color}`} />
          ) : (
            <DownVoteIcon className={`text-${color}`} />
          )}
          <span className="text-[24px] font-bold">{title}</span>
        </div>
        {/* 의견 추가 버튼 */}
        <button
          onClick={handleAddOpinion}
          className={`flex w-auto h-[48px] px-[24px] rounded-full bg-${color} text-white text-[16px] font-bold justify-center items-center whitespace-nowrap`}
        >
          의견 추가
        </button>
      </div>

      {/* 카드 리스트를 보여주는 부분 */}
      <ul className="divide-y">
        {Array.isArray(opinionData) &&
          opinionData
            ?.slice(0, visibleCount)
            .map((opinion: any) => (
              <VoteCardItem
                key={opinion.id}
                opinion={opinion}
                postId={postId}
                title={title}
              />
            ))}
      </ul>

      {/* <button className="absolute w-full bottom-0 bg-pink-200">
        10개 더보기
      </button> */}
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
