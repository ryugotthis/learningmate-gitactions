import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../widgets/header';
// 아이콘
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { CheckIcon } from '../../shared/ui/icons/CheckIcon';

// 컴포넌트
import { CommentInput } from '../../widgets/comment/CommentInput';
import { CommentList } from '../../widgets/comment/CommemtList';
import { UpVoteButton2 } from '../../features/demandLectures/UpVoteButton2';
import { OptionsMenu } from '../../widgets/menu/ui/recommand/OptionsMenu';
import { UpVoteButtonContainer } from '../../features/demandLectures/UpVoteButtonContainer';
import Editor from '../../shared/ui/icons/Editor';

// 훅
import { useGetDemandLectureDetailItem } from '../../entities/recomended/hooks/useGetDemandLectureDetailItem';
import { useFormatDate } from '../../shared/util/useFormatDate';
import SEO from '../../shared/ui/Components/SEO';
// import { useLocation } from 'react-router-dom';

export const LecturesForMeDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 추출
  const postId = Number(id); // 문자열을 숫자로 변환
  const {
    data: lecturesForMeData, // 날강도 데이터
    isLoading,
    isError,
    error,
  } = useGetDemandLectureDetailItem(postId);

  const location = useLocation(); // 글 등록후 상세 페이지 이동시 전달한 메시지 표시
  const [submitStatus, setSubmitStatus] = useState<string | null>(
    location.state?.submitStatus || null
  );

  // 글 등록 성공 메시지 표시
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 2000); // 1000ms = 2초 후 메시지 제거
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

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
      <SEO
        title={`러닝메이트 - ${lecture?.title}`}
        description="본문을 확인하세요"
        image="Logo.png"
        url={`lectures-for-me/${postId}`}
        type="article"
      />
      {/* 제목 영역 */}
      <Header />
      <div className="w-[326px] md:w-[624px] lg:w-[1152px] first-line: my-[100px] mx-auto">
        <header className=" flex flex-col border-b border-gray-300 px-[16px] md:px-[24px] pb-[16px] md:pb-[24px] ">
          <h1 className="title-md-600 md:title-lg-600">{lecture.title}</h1>
          <div className="text-sm-500 text-font-sub flex gap-[12px] pt-[4px] pb-[16px]">
            <div className="flex items-center gap-[4px]">
              <DateIcon />

              <span>{useFormatDate(lecture.createTime)}</span>
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
            <div className="flex items-center gap-[16px]">
              {lecture?.user?.profileImage ? (
                <img
                  src={lecture.user.profileImage}
                  className="w-[40px] h-[40px]"
                  alt="profileImage"
                />
              ) : (
                <ProfileIcon />
              )}
              <span className="text-sm-400 text-font-default">
                {lecture?.user?.name}
              </span>
            </div>
            {/* 옵션 메뉴 */}
            <OptionsMenu name={lecture?.user?.name} postId={lecture.id} />
          </div>
        </header>
        {/* 본문 영역 */}
        <section className="relative p-5 h-100">
          <Editor initialData={lecture?.content} readOnly={true} />

          {/* UpVote 버튼 */}
          <aside className="hidden lg:block absolute left-[-60px] top-1/3 transform -translate-y-1/2 ">
            <UpVoteButtonContainer
              // onClick={() => handleVoteUpButton(lecture.id)}
              // isVoteUpClicked={isVoteUpClicked}
              postId={lecture?.id}
              likes={lecture?.likes}
            />
          </aside>
          <aside className="lg:hidden fixed right-[16px] md:right-[120px] bottom-[50px] z-50">
            <UpVoteButton2 postId={lecture?.id} />
            {/* <button className="fixed flex justify-center items-center w-[64px] h-[64px] rounded-full border-2 border-primary-default bg-white right-[100px] bottom-[100px] z-50">
              <UpVoteIcon className="text-primary-default w-[24px] h-[24px]" />
            </button> */}
          </aside>
        </section>

        {/* 댓글 영역 */}
        <section className="relative">
          {/* 댓글 리스트 */}
          <CommentList postId={lecture.id} />
          {/* 댓글 입력 */}
          <CommentInput postId={lecture.id} />
        </section>
      </div>
      {/* 하단에 등록 성공 메시지 표시 */}
      <div className="absolute w-full flex justify-center  ">
        {submitStatus === 'success' && (
          <div className="fixed bottom-[50px] flex justify-end bg-white gap-[6px] border-2 border-primary-default rounded-4xl px-[24px] py-[12px]">
            <CheckIcon className="text-primary-default" />
            <p className="text-md-500 text-font-default">글 등록 성공!</p>
          </div>
        )}
      </div>
    </>
  );
};
