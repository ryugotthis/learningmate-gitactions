// Axios 기본 설정
import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
  timeout: 6000, // 3초 타임아웃 설정
});
