import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://15.164.2.37/api/v1', // 가상의 API 기본 URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// const [lectures, setLectures] = useState([]); // ✅ 강의 데이터 저장
// useEffect(() => {
//   const fetchLectures = async () => {
//     try {
//       const response = await apiClient.get('/platforms'); // ✅ API 요청
//       setLectures(response.data); // ✅ 데이터 저장
//     } catch (err) {
//       console.log(err);
//       console.error('❌ 강의 데이터를 가져오는 중 오류 발생:', err);
//     }
//   };

//   fetchLectures();
//   console.log(lectures);
// }, []); // ✅ 마운트될 때 한 번 실행

export const fetchPlatforms = async (): Promise<any> => {
  console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
  const response = await apiClient.get('/platforms');
  console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력
  return response.data.data; // ✅ 올바르게 `data`만 반환
};

// export const platform = async (): Promise<any> => {
//   try {
//     console.log('플랫폼 요청 URL:', `${apiClient.defaults.baseURL}/platforms`);
//     const response = await apiClient.get('/platforms');

//     console.log('📌 API 응답 데이터:', response.data); // ✅ 응답 데이터 출력
//     // await apiClient.get('/platforms'); // 서버에 로그아웃 요청
//     return response.data.data; // ✅ 올바르게 `data`만 반환
//   } catch (error) {
//     console.error('플랫폼 실패1:', error);
//     // 에러가 AxiosError인지 확인 후 요청 URL 출력
//     if (axios.isAxiosError(error)) {
//       console.log(
//         '요청 URL:',
//         error.config?.url || 'URL 정보를 가져올 수 없습니다.'
//       );
//     } else {
//       console.log('AxiosError가 아닌 에러 발생');
//     }
//     console.log('플랫폼  실패 URL:', `${apiClient.defaults.baseURL}/platforms`);
//     throw error;
//   }
// };
