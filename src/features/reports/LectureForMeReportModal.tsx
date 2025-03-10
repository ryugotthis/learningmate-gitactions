import { ReportModal } from '../../widgets/header/ui/components/ReportModal';

interface ReportModalProps {
  // isOpen: boolean;
  onClose: () => void;
  onReportSuccess: () => void;
  title: string;
}
export const lectureReportData = [
  { id: 0, title: '욕설 또는 인신공격' },
  { id: 1, title: '음란성 또는 선정성' },
  { id: 2, title: '개인정보노출' },
];

export const LectureForMEReportModal: React.FC<ReportModalProps> = ({
  // isOpen,
  onClose,
  onReportSuccess,
  title,
}) => {
  return (
    <ReportModal
      onClose={onClose}
      data={lectureReportData}
      onReportSuccess={onReportSuccess}
      title={title}
    />
  );
};
