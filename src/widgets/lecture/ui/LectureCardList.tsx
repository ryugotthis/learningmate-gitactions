import { LectureCard } from './LectureCard';

export const LectureCardList = (data: any) => {
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {data?.data?.map((lecture: any, index: number) => (
          <LectureCard key={`${lecture.id}-${index}`} data={lecture} />
        ))}
      </div>
    </>
  );
};
