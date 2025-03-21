import { useInfiniteQuery } from '@tanstack/react-query';
import { getLectures } from '../api/getLectures';
// import { fetchLectures } from '../api/FetchLectures';
export const useGetLectures = ({
  platforms,
  title,
  sort,
}: {
  platforms?: string[];
  title?: string | null;
  sort?: string;
}) => {
  return useInfiniteQuery({
    queryKey: ['lectures', { platforms, title, sort }],
    queryFn: ({ pageParam, queryKey }) => {
      // queryKey의 두 번째 요소에서 추가 인자 추출
      const [_key, params] = queryKey as [
        string,
        { platforms?: string[]; title?: string; sort?: string }
      ];
      return getLectures({
        pageParam,
        platforms: params.platforms,
        title: params.title,
        sort: params.sort,
      });
    },
    getNextPageParam: (lastPage) => {
      console.log('lastPage', lastPage);
      // lastPage.last가 true면 더 이상 데이터가 없음을 의미
      return lastPage.last ? undefined : lastPage.page + 1;
    },
    initialPageParam: 0, // 첫 페이지 번호를 지정 (필요 시)
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });
};

// ✅ React Query 훅
// export const useGetLectures = (pageParam = 1,platform?: string, title?: string) => {
//   return useQuery({
//     queryKey: ['lectures'], // ✅ 쿼리 키 (캐싱)
//     queryFn: () => getLectures( {pageParam ,
//       platform,
//       title}), // ✅ API 호출 함수
//     staleTime: 5000, // ✅ 5초 동안 fresh 상태 유지

//     refetchOnWindowFocus: false, // ✅ 창이 포커스를 받을 때 자동 리패치 방지
//   });
// };
