import { useGetBookMark } from '../../../../entities/lectures/home/hooks/useGetBookMark';
// import { useGetLectures } from '../../../../entities/lectures/home/hooks/useGetLectures';
import { LectureCardList } from '../LectureCardList';

export const LectureCardListMyActivityContainer = () => {
  const { data: lectureData } = useGetBookMark();
  console.log('hello:', lectureData);

  return (
    <>
      {lectureData ? (
        <LectureCardList data={lectureData} />
      ) : (
        <div className="flex justify-center items-center h-[186px] md:h-[600px] p-[10px] text-font-sub text-md-400">
          북마크를 등록해줘
        </div>
      )}
      <LectureCardList data={lectureData} />
    </>
  );
};
