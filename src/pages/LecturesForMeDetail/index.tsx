import { useParams } from 'react-router-dom';
import Header from '../../widgets/header';
import { useDemandLecture } from '../../entities/recomended/hooks/useDemandLecture';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { CommentInput } from '../../features/recommended/CommentInput';
import { CommentList } from '../../features/recommended/CommemtList';
import { useEffect, useState } from 'react';
import { UpVoteButton } from '../../features/recommended/UpVoteButton';
import Editor from '../../shared/ui/icons/Editor';
import { useFetchDemandLectureDetailItem } from '../../entities/recomended/hooks/useFetchDemandLectureDetailItem';
import { OptionsMenu } from '../../widgets/menu/ui/recommand/OptionsMenu';
import { useLocation } from 'react-router-dom';
import { CheckIcon } from '../../shared/ui/icons/CheckIcon';

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
  const postId = Number(id); // 문자열을 숫자로 변환
  const {
    data: lecturesForMeData,
    isLoading,
    isError,
    error,
  } = useFetchDemandLectureDetailItem(postId);
  // 글 등록후 메시지 표시
  const location = useLocation();
  const [submitStatus, setSubmitStatus] = useState<string | null>(
    location.state?.submitStatus || null
  );

  console.log('왜안나와?', lecturesForMeData);
  console.log('id', id);

  // 1초 후에 메시지 제거
  // 컴포넌트가 마운트될 때 submitStatus가 있다면 일정 시간 후 제거
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 1000); // 1000ms = 1초 후 메시지 제거
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // console.log(
  //   '되니?',
  //   lecturesForMeData?.find((lecture: any) => lecture.id === Number(id))
  // );
  const [isMoreToggled, setIsMoreToggled] = useState(false);
  if (isLoading) return <p>⏳ 로딩 중...</p>;
  if (isError)
    return <p className="text-red-500">❌ 오류 발생: {error.message}</p>;
  if (!lecturesForMeData) return <p>❌ 데이터를 불러올 수 없습니다.</p>;
  console.log('강의데이터받아써?');

  // ✅ `lecturesForMeData`는 객체이므로, 바로 `lecture`로 사용
  const lecture = lecturesForMeData;

  // const handleMoreButton = () => {
  //   accessName === lecture.user.name?
  // }

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
              {lecture.user.profileImage ? (
                lecture.user.profileImage
              ) : (
                <ProfileIcon />
              )}
              <span>{lecture.user.name}</span>
            </div>
            {/* 옵션 메뉴 */}
            <OptionsMenu name={lecture.user.name} postId={lecture.id} />
          </div>
        </header>
        {/* 본문 영역 */}
        <section className="relative p-5 h-100">
          <Editor initialData={lecture.content} readOnly={true} />

          {/* UpVote 버튼 */}
          <aside className="absolute left-[-60px] top-1/3 transform -translate-y-1/2 ">
            <UpVoteButton
              // onClick={() => handleVoteUpButton(lecture.id)}
              // isVoteUpClicked={isVoteUpClicked}
              postId={lecture.id}
              likes={lecture.likes}
            />
          </aside>
        </section>

        {/* 댓글 영역 */}
        <section className="relative">
          {/* 하단에 등록 성공 메시지 표시 */}
          <div className="absolute w-full flex justify-center  ">
            {submitStatus === 'success' && (
              <div className=" flex justify-end bg-white gap-[6px] border-2 border-primary-default rounded-4xl px-[24px] py-[12px]">
                <CheckIcon className="text-primary-default" />
                <p className="font-bold text-success">글 등록 성공!</p>
              </div>
            )}
          </div>
          {/* 댓글 리스트 */}
          <CommentList postId={lecture.id} />
          {/* 댓글 입력 */}
          <CommentInput postId={lecture.id} />
        </section>
      </div>
    </>
  );
};
