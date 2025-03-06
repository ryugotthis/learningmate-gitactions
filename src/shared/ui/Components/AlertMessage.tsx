import { CheckIcon } from '../icons/CheckIcon';
import { ErrorIcon } from '../icons/ErrorIcon';

export const AlertMessage = ({
  type,
  message,
}: {
  type: string;
  message: string;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-[100px] ">
      <div
        className={`flex items-center px-[24px] py-[12px] gap-[6px] border-2 ${
          type === 'success' ? ' border-primary-default' : 'border-error'
        } rounded-[50px] bg-white`}
      >
        {type === 'success' ? (
          <CheckIcon className="text-primary-default" />
        ) : (
          <ErrorIcon className="text-error" />
        )}

        <div className="text-font-default text-md-500">{message}</div>
      </div>
    </div>
  );
};
