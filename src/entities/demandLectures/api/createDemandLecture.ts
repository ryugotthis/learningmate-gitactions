import { authApiClient } from '../../../shared/api/authApiClient';
export interface DemandLectureData {
  title: string; // 제목
  content: string; // 내용
}

export const createDemandLecture = async (
  data: DemandLectureData
): Promise<any> => {
  try {
    const response = await authApiClient.post('/demand-lectures', data);
    return response.data;
  } catch (error) {
    console.error('📌 날강도 글 생성 실패1:', error);
    throw error;
  }
};
