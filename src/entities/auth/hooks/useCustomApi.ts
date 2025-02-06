import { useMutation } from '@tanstack/react-query';
import { customPost, customGet, useApiClient } from '../api/custom';

export const useCustomPostApi = () => {
  const apiClientCustom = useApiClient(); // Interceptor가 적용된 apiClientCustom 가져오기
  return useMutation({
    mutationFn: ({ data, url }: { data: any; url: string }) =>
      customPost(apiClientCustom, data, url),
    onSuccess: (data) => {
      console.log(data, 'api Post 성공');
    },
    onError: (error) => {
      console.error('api Post 실패2:', error);
    },
  });
};

export const useCustomGetApi = () => {
  const apiClientCustom = useApiClient(); // Interceptor가 적용된 apiClientCustom 가져오기
  return useMutation({
    mutationFn: (url: string) => customGet(apiClientCustom, url),
    onSuccess: (data) => {
      console.log(data, 'api Get 성공');
    },
    onError: (error) => {
      console.error('api Get 실패2:', error);
    },
  });
};
