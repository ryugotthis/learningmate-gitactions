import { authApiClient } from '../../../shared/api/authApiClient';

export const deleteProfileImage = async (): Promise<any> => {
  try {
    const response = await authApiClient.delete(`/users/profile-image`);
    return response.data;
  } catch (error) {
    console.error('📌이미지 삭제 실패1:', error);
    throw error;
  }
};
