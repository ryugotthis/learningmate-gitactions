import { useParams } from 'react-router-dom';
import Header from '../../widgets/header';
import { useDemandLecture } from '../../entities/recomended/hooks/useDemandLecture';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { useRef, useState } from 'react';
import { useCreateDemandLectureComment } from '../../entities/recomended/api/comments/createDemandLectureComment';
import { CommentInput } from '../../features/recommended/CommentInput';

// 날짜 형식 변경
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear().toString().slice(2); // '2025' → '25'
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월 → '01'
  const day = String(date.getDate()).padStart(2, '0'); // 9일 → '09'
  return `${year}.${month}.${day}`;
};
export const LecturesForMeDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 추출
  const {
    data: lecturesForMeData,
    isLoading,
    isError,
    error,
  } = useDemandLecture();
  console.log(
    lecturesForMeData.find((lecture: any) => lecture.id === Number(id))
  );
  console.log('왜안나와?', lecturesForMeData);
  console.log('id', id);
  console.log(
    '되니?',
    lecturesForMeData.find((lecture: any) => lecture.id === Number(id))
  );

  if (isLoading) return <p>⏳ 로딩 중...</p>;
  if (isError)
    return <p className="text-red-500">❌ 오류 발생 {error.message}</p>;
  if (!lecturesForMeData || !Array.isArray(lecturesForMeData))
    return <p>❌ 데이터를 불러올 수 없습니다.</p>;
  // ✅ 문자열 id를 숫자로 변환 후 해당 강의 찾기
  const lecture = lecturesForMeData.find(
    (lecture: any) => lecture.id === Number(id)
  );

  if (!lecture) return <p>❌ 해당 강의를 찾을 수 없습니다.</p>;

  // 댓글 생성하기
  const { mutate, isPending } = useCreateDemandLectureComment(); // ✅ 댓글 등록 API 사용
  const commentRef = useRef<HTMLTextAreaElement | null>(null); // ✅ `useRef`로 입력값 관리
  const handleCommentSubmit = (postId: number) => {
    if (!commentRef.current?.value.trim()) return; // ✅ 빈 문자열 방지

    mutate(
      { postId, data: { content: commentRef.current.value } }, // ✅ API 호출
      {
        // responseData은 서버에서 보내주는 응답, 내가 보낸게 아님
        onSuccess: (responseData) => {
          if (commentRef.current) commentRef.current.value = ''; // ✅ 성공 후 입력창 초기화
          console.log('댓글 등록 성공!', responseData);
        },
        onError: (error) => {
          console.error('댓글 등록 실패:', error);
        },
      }
    );
  };
  return (
    <>
      {/* 제목 영역 */}
      <Header />
      <div className="w-2/3 mx-auto">
        <header className="mt-30 flex flex-col gap-3 border-b border-gray-300 p-5 ">
          <h1 className="text-3xl font-bold">{lecture.title}</h1>
          <div className="text-xs text-font-sub-default flex gap-5">
            <div className="flex items-center gap-1">
              <DateIcon />

              <span>{formatDate(lecture.createTime)}</span>
            </div>

            <div className="flex items-center gap-1">
              <ViewsIcon />

              <span>{lecture.views}</span>
            </div>

            <div className="flex items-center gap-1">
              <CommentIcon />

              <span>{lecture.comments}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <ProfileIcon />
              <span>닉네임</span>
            </div>
            <div className="flex gap-5">
              <button className="flex p-2 border border-surface-line rounded-4xl">
                <div>링크아이콘</div>
                <span>링크 복사</span>
              </button>
              <button>```</button>
            </div>
          </div>
        </header>
        {/* 본문 영역 */}
        <section className="p-5 h-100">
          <p>{lecture.content}</p>
        </section>
        {/* 댓글 영역 */}
        <section>
          {/* 댓글 리스트 */}
          {/* 댓글 입력 */}
          <CommentInput postId={lecture.id} />
        </section>
      </div>
    </>
  );
};
