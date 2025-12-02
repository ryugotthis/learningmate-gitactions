// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// 🔹 Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// 🔹 Firebase 초기화
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

// ✅ 함수의 반환 타입을 명시 (success, message를 포함)
interface VerifyCodeResponse {
  success: boolean;
  message: string;
}

// 🔹 Firebase Cloud Functions 호출을 위한 함수 정의
export const sendVerificationCode = httpsCallable(
  functions,
  'sendVerificationCode'
);
// ✅ `verifyCode`의 반환 타입을 명확히 지정
export const verifyCode = httpsCallable<
  { email: string; code: string },
  VerifyCodeResponse
>(functions, 'verifyCode');
