import { useGetBookMark } from '../../../../entities/lectures/home/hooks/useGetBookMark';
// import { useGetLectures } from '../../../../entities/lectures/home/hooks/useGetLectures';
import { LectureCardList } from '../LectureCardList';

export const LectureCardListMyActivityContainer = () => {
  const { data: lectureData } = useGetBookMark();
  console.log('hello:', lectureData);

  return (
    <>
      <LectureCardList data={lectureData} />
    </>
  );
};
