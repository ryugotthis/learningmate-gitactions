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
    retry: false, // ✅ 실패 시 재시도 안 함
    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
  });
};
