import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { CloseIcon } from '../../../../shared/ui/icons/CloseIcon';
// import { useCreateUpVoteOpinion } from '../../../../entities/lectures/home/opinion/hooks/useCreateUpVoteOpinion';

export const OpinionModal = ({
  onClose,
  postId, // postId를 prop으로 받아야 합니다.
  opinion,
  isPending,
  mutate,
  type,
}: {
  onClose: () => void;
  postId: number;
  opinion?: any;
  isPending: boolean;
  mutate: any;
  type: string;
}) => {
  // 제목과 내용을 상태로 관리합니다.
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  console.log('아이디확인', postId);

  // 수정시 ㅇopinion이 있으면 초기값을 설정합니다.
  useEffect(() => {
    if (opinion) {
      setTitle(opinion.title || '');
      setReason(opinion.reason || '');
    }
  }, [opinion]);

  // usePostUpVoteOpinion 훅에서 반환하는 mutate 함수를 사용합니다.

  const handleSubmit = () => {
    // 입력값 유효성 검사 등을 수행할 수 있습니다.
    if (!title.trim() || !reason.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    // 수정 put 일때는 opinionId를 보내고 일반 post 경우에는 postId 보냄
    const payload = opinion
      ? { opinionId: postId, data: { title, reason } }
      : { postId, data: { title, reason } };

    // mutation 실행: postId와 OpinionData를 전달합니다.
    mutate(payload, {
      onSuccess: (data: any) => {
        console.log('!!!의견 post 성공:', data);
        onClose(); // 성공 후 모달 닫기
      },
      onError: (error: any) => {
        const axiosError = error as AxiosError;
        console.error(
          '추천의견 post 실패:',
          axiosError.response ? axiosError.response.status : axiosError.message
        );
      },
    });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30"
      // onClick={onClose}
    >
      <div
        className="bg-white w-[563px] rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-[24px]">
          <h2 className="text-[24px] font-bold">{`${type} 의견`}</h2>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex gap-[24px] px-[24px] pt-[14px] pb-[10px]">
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            maxLength={50}
            className="w-full flex-1 border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span>{title.length}/50</span>
        </div>
        <div className="px-[24px]">
          <div className="border-b"></div>
        </div>
        <div className="flex flex-col gap-[10px] px-[24px] pt-[14px] pb-[16px]">
          <textarea
            placeholder="내용을 입력해주세요"
            maxLength={1000}
            className="w-full h-[240px] outline-none border border-gray-300 p-2 rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex justify-end">
            <span>{reason.length}/1000</span>
          </div>
        </div>
        <div className="px-[24px] pt-[8px] pb-[24px]">
          <button
            className="w-full px-[24px] py-[12px] text-[14px] bg-primary-default text-white rounded-4xl"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? '등록 중...' : '등록'}
          </button>
        </div>
      </div>
    </div>
  );
};
