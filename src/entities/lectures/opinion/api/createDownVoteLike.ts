import { authApiClient } from '../../../../shared/api/authApiClient';

export interface DemandLectureData {
  title: string; // 제목
  content: string; // 내용
}

export const createDownVoteLike = async (opinionId: number): Promise<any> => {
  try {
    console.log('포스트날강도추천데이터');
    const response = await authApiClient.post(
      `/down-vote/${opinionId}/like`,
      null
    );
    return response.data;
  } catch (error) {
    console.error('📌 포스트날강도 추천 실패1:', error);
    throw error;
  }
};
