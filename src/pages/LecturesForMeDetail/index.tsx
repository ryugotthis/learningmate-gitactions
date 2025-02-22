import { useParams } from 'react-router-dom';
import Header from '../../widgets/header';
import { useDemandLecture } from '../../entities/recomended/hooks/useDemandLecture';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { CommentInput } from '../../features/recommended/CommentInput';
import { CommentList } from '../../features/recommended/CommemtList';
import { useAuthStore, useLikeStore } from '../../shared/model/store';
import { UpIcon } from '../../shared/ui/icons/UpIcon';
import { useState } from 'react';
import { UpVoteButton } from '../../features/recommended/UpVoteButton';
import { usePostDemandLectureLikes } from '../../entities/recomended/hooks/usePostDemandLectureLikes';
import Editor from '../../shared/ui/icons/Editor';
import { useFetchDemandLectureDetailItem } from '../../entities/recomended/hooks/useFetchDemandLectureDetailItem';
import { LinkIcon } from '../../shared/ui/icons/LinkIcon';
import { MoreIcon } from '../../shared/ui/icons/MoreIcon';

// 날짜 형식 변경
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear().toString().slice(2); // '2025' → '25'
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월 → '01'
  const day = String(date.getDate()).padStart(2, '0'); // 9일 → '09'
  return `${year}.${month}.${day}`;
};
export const LecturesForMeDetail = () => {
  const { accessToken, accessName } = useAuthStore();
  console.log('토큰값', accessToken);
  console.log('닉네임', accessName);
  // const { isLikesToggled, setIsLikesToggled } = useLikeStore();

  // const [isVoteUpClicked, setIsVoteUpClicked] = useState(false);
  // const handleVoteUpButton = (postId: number) => {
  //   setIsVoteUpClicked(!isVoteUpClicked);
  //   mutate(postId);
  //   console.log('추천버튼클릭:', isVoteUpClicked);
  // };

  const { id } = useParams(); // ✅ URL에서 id 추출
  const postId = Number(id); // 문자열을 숫자로 변환
  const {
    data: lecturesForMeData,
    isLoading,
    isError,
    error,
  } = useFetchDemandLectureDetailItem(postId);

  // const { data: lectureForMe } = useFetchDemandLectureDetailItem(postId)
  // console.log(
  //   lecturesForMeData?.find((lecture: any) => lecture.id === Number(id))
  // );
  console.log('왜안나와?', lecturesForMeData);
  console.log('id', id);
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
            <div className="flex gap-5 items-center">
              <button className="flex p-2 border border-surface-line rounded-4xl">
                <LinkIcon />
                <span>링크 복사</span>
              </button>
              <div className="relative">
                <button onClick={() => setIsMoreToggled(!isMoreToggled)}>
                  <MoreIcon />
                </button>
                {isMoreToggled && (
                  <ul className="absolute w-[121px] mt-[7px] text-[16px] font-medium bg-white rounded-md shadow-[0_0_5px_rgba(0,0,0,0.1)]">
                    {accessName === lecture.user.name ? (
                      <>
                        <li className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark">
                          수정
                        </li>
                        <li className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark">
                          삭제
                        </li>
                      </>
                    ) : (
                      <li className="py-[12px] px-[16px] cursor-pointer text-font-sub font-bold whitespace-nowrap hover:bg-surface-dark">
                        신고
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* 본문 영역 */}
        <section className="relative p-5 h-100">
          <Editor initialData={lecture.content} readOnly={true} />

          {/* UpVote 버튼 */}
          <aside>
            <UpVoteButton
              // onClick={() => handleVoteUpButton(lecture.id)}
              // isVoteUpClicked={isVoteUpClicked}
              postId={lecture.id}
              likes={lecture.likes}
            />
            {/* <button
              onClick={handleVoteUpButton} 
              className={`absolute left-[-60px] top-1/3 transform -translate-y-1/2 flex flex-col justify-center gap-1 items-center text-sm border-2 rounded-4xl py-5 px-2 cursor-pointer ${
                isVoteUpClicked
                  ? 'border-primary-default'
                  : 'border-surface-line'
              }`}
            >
              <UpIcon className="text-surface-line w-3" />
              <span>102K</span>
            </button> */}
          </aside>
        </section>
        {/* 댓글 영역 */}
        <section>
          {/* 댓글 리스트 */}
          <CommentList postId={lecture.id} />
          {/* 댓글 입력 */}
          <CommentInput postId={lecture.id} />
        </section>
      </div>
    </>
  );
};
