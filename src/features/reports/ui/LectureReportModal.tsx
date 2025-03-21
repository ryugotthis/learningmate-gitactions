import { ReportModal } from '../../../shared/ui';

interface ReportModalProps {
  // isOpen: boolean;
  onClose: () => void;
  onReportSuccess: () => void;
}
export const lectureReportData = [
  { id: 0, title: '잘못된 정보' },
  { id: 1, title: '개인 정보 침해' },
  { id: 2, title: '폭력적이거나 혐오스러운 정보' },
];

export const LectureReportModal: React.FC<ReportModalProps> = ({
  // isOpen,
  onClose,
  onReportSuccess,
}) => {
  return (
    <ReportModal
      onClose={onClose}
      data={lectureReportData}
      onReportSuccess={onReportSuccess}
      title="lecture"
    />
  );
};
