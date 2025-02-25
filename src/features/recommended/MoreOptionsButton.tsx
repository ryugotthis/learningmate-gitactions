import { useState } from 'react';
import { MoreIcon } from '../../shared/ui/icons/MoreIcon';
import { useAuthStore } from '../../shared/model/store';
import { useNavigate } from 'react-router-dom';
import { useDeleteLectureForMe } from '../../entities/recomended/hooks/useDeleteLecturesForMe';
import { useGetUser } from '../../entities/auth/hooks/useGetUser ';

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

  const [isMoreToggled, setIsMoreToggled] = useState(false);
  const handleEdit = () => {
    // 수정 페이지로 이동 (예: postId를 경로 파라미터로 전달)
    navigate(`/lectures-for-me/edit/${postId}`);
  };

  return (
    <div className="relative">
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
            <li className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark">
              신고
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
