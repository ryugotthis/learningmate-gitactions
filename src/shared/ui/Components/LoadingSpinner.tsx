import { SyncLoader } from 'react-spinners';
export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
        <SyncLoader color="#17af6d" className="text-primary-default" />
        <p className="mt-4">강의 생성중이야!</p>
      </div>
    </div>
  );
};
