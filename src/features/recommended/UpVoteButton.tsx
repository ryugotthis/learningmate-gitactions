import { usePostDemandLectureLikes } from '../../entities/recomended/hooks/usePostDemandLectureLikes';
import { UpIcon } from '../../shared/ui/icons/UpIcon';

interface UpVoteButtonProps {
  onClick: () => void;
  isVoteUpClicked: boolean;
  postId: number;
}

export const UpVoteButton = ({
  onClick,
  isVoteUpClicked,
  postId,
}: UpVoteButtonProps) => {
  // const { mutate } = usePostDemandLectureLikes();
  return (
    <>
      <button
        onClick={onClick}
        className={`absolute left-[-60px] top-1/3 transform -translate-y-1/2 flex flex-col justify-center gap-1 items-center text-sm border-2 rounded-4xl py-5 px-2 cursor-pointer ${
          isVoteUpClicked ? 'border-primary-default' : 'border-surface-line'
        }`}
      >
        <UpIcon className="text-surface-line w-3" />
        <span>102K</span>
      </button>
    </>
  );
};
