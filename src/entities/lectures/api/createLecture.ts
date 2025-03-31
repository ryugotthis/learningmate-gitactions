import { authApiClient } from '../../../shared/api/authApiClient';

export const createLecture = async (url: any): Promise<any> => {
  try {
    const response = await authApiClient.post(`/lectures`, url);
    return response.data;
  } catch (error) {
    console.error('📌강의 추가 실패1:', error);

    throw error;
  }
};
