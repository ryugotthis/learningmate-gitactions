import { useState } from 'react';
// 상대적 경과시간 라이브러리
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 로케일 불러오기
// 커스텀 훅
import { useDeleteUpVoteOpinion } from '../../../entities/lectures/opinion/model/useDeleteUpVoteOpinion';
import { useGetUser } from '../../../entities/auth/model/useGetUser ';
// 컴포넌트
import { UpVoteButtonContainer } from './UpVoteButtonConainer';
import { UpVoteEditOpinionModal } from '../opinion/ui/UpVoteOpinionEditModal';
import { DownVoteButtonContainer } from './DownVoteButtonContainer';
import { DownVoteEditOpinionModal } from '../opinion/ui/DownVoteEditOpinionModal';
import { useDeleteDownVoteOpinion } from '../../../entities/lectures/opinion/model/useDeleteDownVoteOpinion';
// 아이콘
import { ProfileIcon } from '../../../shared/ui/icons/ProfileIcon';
import { UpArrowIcon } from '../../../shared/ui/icons/UpArrowIcon';
import { DownIcon } from '../../../shared/ui/icons/DownIcon';

// 플러그인을 전역에 확장 (한 번만 호출)
dayjs.extend(relativeTime);
dayjs.locale('ko'); // 로케일을 한국어로 설정

export const VoteCardItem = ({
  opinion,
  postId,
  title,
}: {
  opinion: any;
  postId: number;
  title: string;
}) => {
  const [isToggledDetail, setIsToggledDetail] = useState(false); // 의견글 상세보기 토글 상태 관리
  const { mutate: deleteUpVoteOpinion } = useDeleteUpVoteOpinion(postId); // 추천 의견 삭제 delete
  const { mutate: deleteDownVoteOpinion } = useDeleteDownVoteOpinion(postId); // 비추천 의견 삭제 delete
  const { data: userData } = useGetUser(); // 유저 정보 데이터

  // 추천 혹은 비추천 의견 모달의 열림/닫힘 상태를 저장할 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 추천 의견 삭제
  const handleUpVoteDeleteOpinion = () => {
    deleteUpVoteOpinion(opinion.id);
  };
  // 비추천 의견 삭제
  const handleDownVoteDeleteOpinion = () => {
    deleteDownVoteOpinion(opinion.id);
  };

  // 모달 닫기 버튼 혹은 배경 클릭 시 모달 닫힘
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // relativeTime 플러그인을 활용하여 상대적 시간 문자열 생성
  const relativeTimeText = dayjs(opinion.createTime).fromNow();
  return (
    <li
      className={`px-[8px] ${
        isToggledDetail && 'py-[16px] flex flex-col gap-[8px]'
      }`}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-[8px] py-[16px]">
        {/* 추천 혹은 비추천에 있는 의견 추천 버튼 */}
        <div className="flex items-center gap-[20px]">
          {title === '추천' ? (
            <UpVoteButtonContainer
              postId={postId}
              opinionId={opinion?.id}
              likes={opinion?.likeCount}
            />
          ) : (
            <DownVoteButtonContainer
              postId={postId}
              opinionId={opinion?.id}
              likes={opinion?.likeCount}
            />
          )}

          <p className="text-lg-500 md:title-sm-500">{opinion?.title}</p>
        </div>
        {/* 의견 상세 보기 버튼 */}
        <div className="w-full md:w-auto flex justify-center">
          <button onClick={() => setIsToggledDetail(!isToggledDetail)}>
            {isToggledDetail ? (
              <UpArrowIcon />
            ) : (
              <DownIcon className="text-font-sub" />
            )}
          </button>
        </div>
      </div>
      {/* 의견 상세 보기 버튼 토글 시 */}
      {isToggledDetail && (
        <>
          {/* 의견 내용 */}
          <div className="pt-[16px] pb-[24px] tracking-[-0.13em]">
            {opinion.reason}
          </div>
          {/* 사용자 정보 */}
          <div className="flex justify-between">
            {/* 정보 */}
            <div className="flex gap-[8px] items-center">
              {opinion.user.profileImage ? (
                <img
                  src={opinion.user.profileImage}
                  alt="프로필이미지"
                  className="w-[40px] h-[40px] rounded-full"
                />
              ) : (
                <ProfileIcon />
              )}
              <div className="flex flex-col gap-[2px] text-font-sub">
                <span className="font-semibold text-[14px]">
                  {opinion.user.name}
                </span>

                <span className="text-[14px] tracking-[-0.1em]">
                  {relativeTimeText}
                </span>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex p-[8px] gap-[12px]">
              {userData?.name === opinion.user.name && (
                <>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-[8px] py-[6px] tracking-[-0.1em]"
                  >
                    수정
                  </button>
                  <button
                    onClick={
                      title === '추천'
                        ? handleUpVoteDeleteOpinion
                        : handleDownVoteDeleteOpinion
                    }
                    className="px-[8px] py-[6px] tracking-[-0.1em]"
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
      {/* 추천 혹은 비추천 의견 수정 모달창 */}
      {isModalOpen &&
        (title === '추천' ? (
          <UpVoteEditOpinionModal
            onClose={handleCloseModal}
            opinionId={opinion.id}
            opinion={opinion}
            postId={postId}
          />
        ) : (
          <DownVoteEditOpinionModal
            onClose={handleCloseModal}
            opinionId={opinion.id}
            opinion={opinion}
            postId={postId}
          />
        ))}
    </li>
  );
};
