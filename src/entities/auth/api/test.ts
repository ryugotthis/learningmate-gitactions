import axios from 'axios';
import { useAuthStore } from '../../../shared/model/store';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export const apiClientCustom = axios.create({
  baseURL: 'http://15.164.2.37:8080/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// 쿠키에서 특정 키(refresh) 읽기
const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
};

export const useApiClient = () => {
  const { setAccessToken, clearAccessToken } = useAuthStore.getState();
  const navigate = useNavigate();

  // Set up request interceptor
  apiClientCustom.interceptors.request.use((config) => {
    // const { accessToken } = useAuthStore.getState();

    // if (accessToken) {
    //   config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }

    // 쿠키에서 Refresh Token 읽기
    const refreshToken = getCookie('refresh');
    if (refreshToken) {
      config.headers['Cookie'] = `refresh=${refreshToken}`;
    }

    return config;
  });

  // Set up response interceptor
  apiClientCustom.interceptors.response.use(
    (response) => {
      // 성공 응답 처리
      console.log('인터셉터 응답 성공');
      return response;
    },
    async (error) => {
      console.log('인터셉터 응답 에러');
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재시도 방지 플래그 설정
        console.log('401에러');

        try {
          // 토큰 재발급 요청
          console.log('토큰 재발급 요청 시도 중...');
          const tokenResponse = await apiClientCustom.post('/re-issue', null, {
            headers: {
              Cookie: `refresh=${getCookie('refresh')}`, // Refresh 토큰 포함
            },
            withCredentials: true, // 쿠키 전송 활성화
          });

          // 새 accessToken 저장
          const newAccessToken = tokenResponse.data.accessToken;
          setAccessToken(newAccessToken);

          // 원래 요청의 Authorization 헤더 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // 원래 요청 재시도
          console.log('토큰 재발급 성공, 요청 재시도 중...');
          return apiClientCustom(originalRequest);
        } catch (refreshError) {
          // 토큰 재발급 실패 시 상태 초기화, login페이지로 이동
          console.error('토큰 재발급 실패:', refreshError);
          clearAccessToken();
          navigate('/login');
          throw refreshError;
        }
      }

      // 기타 에러 처리
      console.log('토큰 발급 외의 에러 발생');
      console.error(
        '기타 응답 에러 발생:',
        error.response?.status,
        error.message
      );
      return Promise.reject(error); // 기타 에러는 그대로 처리
    }
  );

  // Return the apiClient for use
  return apiClientCustom;
};

export const reissue = async (): Promise<any> => {
  // 가상의 API URL을 사용하여 POST 요청
  try {
    const response = await apiClientCustom.post(`/re-issue`);

    // 서버로부터 받은 데이터 반환
    return response.data;
  } catch (error) {
    console.log('api post 실패1:', error);
    throw error;
  }
};

export const useReissue = () => {
  // const apiClientCustom = useApiClient(); // Interceptor가 적용된 apiClientCustom 가져오기
  return useMutation({
    mutationFn: reissue,
    onSuccess: (data) => {
      console.log(data, 'api Post 성공');
    },
    onError: (error) => {
      console.error('api Post 실패2:', error);
    },
  });
};
