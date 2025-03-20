// import { useQuery } from '@tanstack/react-query';
// import { fetchDemandLecture } from '../api/postDemandLecture';

// export const useDemandLecture = () => {
//   return useQuery({
//     queryKey: ['demandLecture'],
//     queryFn: fetchDemandLecture, // ✅ `fetchDemandLecture` 실행
//     staleTime: 5000,
//     retry: 1,
//   });
// };

import { getDemandLecture } from '../api/getDemandLectures';
import { useQuery } from '@tanstack/react-query';

interface UseFetchLecturesProps {
  page: number;
  size: number;
  sort: string;
}
// ✅ React Query 훅
export const useGetDemandLecture = ({
  page = 0,

  sort = 'decs',
}: UseFetchLecturesProps) => {
  return useQuery({
    queryKey: ['demandLectures', sort, page], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getDemandLecture({ page, sort }), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지
    retry: 1, // ✅ 요청 실패 시 한 번만 재시도
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
