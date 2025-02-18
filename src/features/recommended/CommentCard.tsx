import { useState } from 'react';
import { MoreIcon } from '../../shared/ui/icons/MoreIcon';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
interface CommentCardProps {
  data: any;
}

export const CommentCard: React.FC<CommentCardProps> = ({ data }) => {
  const [reportedComments, setReportedComments] = useState<{
    [key: number]: boolean;
  }>({}); // ✅ 댓글별 신고 상태 관리

  const toggleReport = (commentId: number) => {
    setReportedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // ✅ 해당 댓글의 신고 상태만 토글
    }));
  };
  return (
    <div key={data.id} className="flex gap-3 p-5 mb-5">
      <ProfileIcon />
      <div className=" w-full">
        <div className="relative flex items-start">
          <p className="mb-5 flex-grow text-font-default">{data.content}</p>
          <button
            onClick={() => toggleReport(data.id)}
            className="hover:cursor-pointer"
          >
            <MoreIcon className="text-tertiary-default" />
          </button>
          {reportedComments[data.id] && (
            <ul className="absolute top-2 right-0  mt-5 text-sm l-0 bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
              <li className="py-3 px-3 cursor-pointer text-font-sub-default font-bold hover:bg-surface-dark">
                신고
              </li>
            </ul>
          )}
        </div>

        <div className="text-sm text-font-sub-default">
          <span className="mr-2">{'이름없음'}</span>
          <span>·</span>
          <span className="ml-2">{data.createTime}</span>
        </div>
      </div>
    </div>
  );
};
