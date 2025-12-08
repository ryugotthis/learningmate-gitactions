
import { useEffect } from 'react';
import { useErrorstore } from '@/shared/store/errorStore';
import { FailedIcon } from './icons';
const  ErrorToast = () => {
    const { errorState, errorMessage, clearErrorState } = useErrorstore();

    useEffect(() => {
    if (!errorState) return;

    // 에러 상태가 true가 되면 2초 후에 자동 초기화
    const timer = setTimeout(() => {
      clearErrorState();
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorState, clearErrorState]);

  if (!errorState) return null;

  return (
     <div role="alert" className="fixed bottom-[50px] flex gap-[6px] md:gap-[6px] items-center rounded-4xl px-[20px] md:px-[24px] py-[8px] md:py-[12px] border-2 border-error text-font bg-white">
            <FailedIcon />
            <p className="text-sm-500 md:text-md-500">
              {errorMessage}
            </p>
          </div>

        )
    }

export default ErrorToast;