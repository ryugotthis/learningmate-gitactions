// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// 🔹 Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: 'AIzaSyC1IHAH5w65Iu999PXaBVJG8U4hamaFjHI',
  authDomain: 'learningmate-email.firebaseapp.com',
  projectId: 'learningmate-email',
  storageBucket: 'learningmate-email.firebasestorage.app',
  messagingSenderId: '215337013056',
  appId: '1:215337013056:web:b4b4a139fcead427e9b4a5',
  measurementId: 'G-K1YX20N1WT',
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
