import { useEffect, useRef, useState } from 'react';
import { MoreIcon } from '../../shared/ui/icons/MoreIcon';
// import { useAuthStore } from '../../shared/model/store';
import { useNavigate } from 'react-router-dom';
// import { useDeleteLectureForMe } from '../../entities/recomended/hooks/useDeleteLecturesForMe';
import { useGetUser } from '../../entities/auth/hooks/useGetUser ';
// import { LectureReportModal } from '../reports/LectureReportModal';
import { LectureForMEReportModal } from '../reports/LectureForMeReportModal';
import { AlertMessage } from '../../shared/ui/Components/AlertMessage';

export const MoreOptionsButton = ({
  name,
  postId,
  handleDelete,
}: {
  name: string;
  postId: number;
  handleDelete: () => void;
}) => {
  const navigate = useNavigate();
  // const { accessToken } = useAuthStore();
  // 사용자 정보
  const { data: userData } = useGetUser();

  const [isMoreToggled, setIsMoreToggled] = useState(false); // 더보기 버튼 상태 관리
  const handleEdit = () => {
    // 수정 페이지로 이동 (예: postId를 경로 파라미터로 전달)
    navigate(`/lectures-for-me/edit/${postId}`);
  };
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false); // 신고 성공 메시지 상태 관리

  const menuRef = useRef<HTMLDivElement>(null);
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
        setIsMoreToggled(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => setIsMoreToggled(!isMoreToggled)}>
        <MoreIcon />
      </button>
      {isMoreToggled && (
        <ul className="absolute w-[121px] mt-[7px] text-[16px] font-medium bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
          {userData?.name === name ? (
            <>
              <li
                onClick={handleEdit}
                className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
              >
                수정
              </li>
              <li
                onClick={handleDelete}
                className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
              >
                삭제
              </li>
            </>
          ) : (
            <li
              onClick={() => setIsReportModalOpen(!isReportModalOpen)}
              className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark"
            >
              신고
            </li>
          )}
        </ul>
      )}
      {isReportModalOpen && (
        <LectureForMEReportModal
          onClose={() => setIsReportModalOpen(false)}
          onReportSuccess={handleReportSuccess}
          title="lecture"
        />
      )}
      {/* 신고 성공 메시지 오버레이 */}
      {reportSuccess && (
        <AlertMessage type="success" message="신고 접수 완료" />
      )}
    </div>
  );
};
