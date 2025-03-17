import { useQuery } from '@tanstack/react-query';
import { getBookMark } from '../api/getBookMark';
import { useAuthStore } from '../../../shared/store/authstore';
// import { fetchLectures } from '../api/FetchLectures';

// ✅ React Query 훅
export const useGetBookMark = ({
  sort,
  page,
  platforms,
}: {
  sort: string;
  page: number;
  platforms?: string[];
}) => {
  const { isLoggedIn } = useAuthStore();
  return useQuery({
    queryKey: ['bookmark', { sort, page, platforms }], // ✅ 쿼리 키 (캐싱)
    queryFn: () => getBookMark({ sort, page, platforms }), // ✅ API 호출 함수
    staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지

    refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
    enabled: isLoggedIn, // ✅ 로그인한 경우에만 실행
  });
};
