import { authApiClient } from '../../../shared/api/authApiClient';

export const createLecture = async (url: any): Promise<any> => {
  try {
    console.log('강의 추가', url);
    const response = await authApiClient.post(`/lectures`, url);
    return response.data;
  } catch (error) {
    console.error('📌강의 추가 실패1:', error);
    console.log('강의 추가', url);
    throw error;
  }
};
