import { authApiClient } from '../../../shared/api/authApiClient';

export interface DemandLectureData {
  title: string; // 제목
  content: string; // 내용
}

export const updateDemandLecture = async (
  postId: number,
  data: DemandLectureData
): Promise<any> => {
  try {
    const response = await authApiClient.put(
      `/demand-lectures/${postId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error('📌 수정demandLecture 실패1:', error);
    throw error;
  }
};
