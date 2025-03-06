import { useGetLectures } from '../../../../entities/lectures/home/hooks/useGetLectures';
import { LectureCardList } from '../LectureCardList';

export const LectureCardListHomeContainer = () => {
  const { data: lectureData } = useGetLectures();
  console.log('강의데이터테스트1111111111:', lectureData);

  return (
    <>
      <LectureCardList data={lectureData} />
    </>
  );
};
