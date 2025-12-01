import { useState } from 'react';
// 아이콘
import { CloseIcon, RadioIcon, RadioCheckedIcon } from './icons';

interface ReportModalProps {
  // isOpen: boolean;
  onClose: () => void;
  data: any;
  onReportSuccess: () => void;
  title: string;
}

const ReportModal: React.FC<ReportModalProps> = ({
  // isOpen,
  onClose,
  data,
  onReportSuccess,
  title,
}) => {
  const [reason, setReason] = useState('');

  // 신고 버튼 클릭 시 실행할 함수
  const handleReport = () => {
    onClose(); // 모달을 먼저 닫고
    onReportSuccess(); // 부모 컴포넌트에 신고 성공 알림
  };

  return (
    // 화면 전체를 덮는 반투명 오버레이
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center bg-black bg-opacity-50">
      {/* 모달 본체 */}
      <div className="bg-white w-full lg:w-[560px] rounded-[12px] shadow-lg">
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center border-b border-line p-[24px]">
          <h2 className="title-sm-600 md:title-md-600 text-black">
            {title === 'lecture' ? '강의 신고' : '댓글 신고'}
          </h2>
          <button onClick={onClose} aria-label="close">
            <CloseIcon className="text-font" />
          </button>
        </div>

        {/* 신고 사유 선택 (라디오 버튼) */}

        <ul className="flex flex-col gap-[24px] m-[24px] text-font text-md-500 md:text-lg-500">
          {data?.map((report: any) => (
            <label
              key={report.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="reportReason"
                value={report.title}
                checked={reason === report.title}
                onChange={(e) => setReason(e.target.value)}
                className="peer hidden"
              />

              {/* 체크 전 이미지 */}
              <RadioIcon className="peer-checked:hidden " />
              {/* 체크 후 이미지 */}
              <RadioCheckedIcon className="hidden peer-checked:inline" />
              <span>{report.title}</span>
            </label>
          ))}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="reportReason"
              value="기타"
              checked={reason === '기타'}
              onChange={(e) => setReason(e.target.value)}
              className="peer hidden"
            />

            {/* 체크 전 이미지 */}
            <RadioIcon className="peer-checked:hidden " />
            {/* 체크 후 이미지 */}
            <RadioCheckedIcon className="hidden peer-checked:inline" />
            <span>기타</span>
          </label>
          {reason === '기타' && (
            <textarea className="h-[136px] border border-line rounded-[12px] outline-none p-[16px] text-md-500" />
          )}
        </ul>

        {/* 신고 버튼 */}
        <div className="px-[24px] pt-[8px] pb-[24px] ">
          <button
            className="w-full h-[48px] bg-error text-white rounded-4xl"
            onClick={handleReport}
          >
            신고
          </button>
        </div>
        {/* {isReported && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div>신고 접수 완료</div>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default ReportModal;
