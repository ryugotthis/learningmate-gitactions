// import * as functions from "firebase-functions/v2"; // ✅ v2 사용
// import * as admin from "firebase-admin";
// import * as nodemailer from "nodemailer";

// admin.initializeApp();
// const db = admin.firestore();

// // 🔹 Firebase Secret Manager에서 환경 변수 로드
// const smtpUser = functions.defineSecret("SMTP_USER");
// const smtpPass = functions.defineSecret("SMTP_PASS");

// export const sendVerificationCode = functions.https.onCall(
//   { secrets: [smtpUser, smtpPass] }, // ✅ runWith 대신 secrets 사용
//   async (data, context) => {
//     const email = data.email;
//     if (!email) {
//       throw new functions.https.HttpsError("invalid-argument", "이메일이 필요합니다.");
//     }

//     const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

//     await db.collection("email_verifications").doc(email).set({
//       code: verificationCode,
//       expiresAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 5 * 60000)),
//     });

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: smtpUser.value(),
//         pass: smtpPass.value(),
//       },
//     });

//     const mailOptions = {
//       from: smtpUser.value(),
//       to: email,
//       subject: "인증 코드 요청",
//       text: `인증 코드: ${verificationCode} (5분 내로 입력하세요)`,
//     };

//     await transporter.sendMail(mailOptions);
//     return { success: true };
//   }
// );

// const functions = require('firebase-functions');

// exports.helloWorld = functions
//   .region('asia-northeast3')
//   .https.onRequest((request: any, response: any) => {
//     response.send('Hello from Firebase!');
//   });
import * as functions from 'firebase-functions/v2';
import { onCall } from 'firebase-functions/v2/https';

import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import { defineSecret } from 'firebase-functions/params';

admin.initializeApp();
const db = admin.firestore();

// 🔹 Firebase Secret Manager에서 환경 변수 로드
const smtpUser = defineSecret('SMTP_USER');
const smtpPass = defineSecret('SMTP_PASS');

// 🔹 데이터 타입 정의 (이메일을 포함한 요청 데이터)
interface RequestData {
  email: string;
}

// 🔹 올바른 Firebase Functions v2 문법 사용
export const sendVerificationCode = functions.https.onCall<RequestData>(
  { secrets: [smtpUser, smtpPass],
cors: true, // ✅ CORS 활성화
    region: 'asia-northeast3', // ✅ 리전 설정 (선택사항)

    }, // ✅ runWith 대신 secrets 사용
  async (request) => {
    // ✅ `request`로 변경
    if (!request.data.email) {
      // ✅ `request.data.email` 사용
      throw new functions.https.HttpsError(
        'invalid-argument',
        '이메일이 필요합니다.'
      );
    }

    const email = request.data.email; // ✅ `request.data.email`
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    await db
      .collection('email_verifications')
      .doc(email)
      .set({
        code: verificationCode,
        expiresAt: admin.firestore.Timestamp.fromDate(
          new Date(Date.now() + 5 * 60000)
        ),
      });
    // 🔹 SMTP 설정 (Gmail SMTP 사용)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser.value(), // Gmail 주소 입력
        pass: smtpPass.value(), // Google 앱 비밀번호 입력
      },
    });

    const mailOptions = {
      from: smtpUser.value(),
      to: email,
      subject: '인증 코드 요청',
      text: `인증 코드: ${verificationCode} (5분 내로 입력하세요)`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  }
);

// 🔹 인증 코드 검증 기능 (사용자가 입력한 코드 확인)
export const verifyCode = onCall<{ email: string; code: string }>(
  {cors: true, // ✅ CORS 활성화
    region: 'asia-northeast3', // ✅ 리전 설정
    },
  // { enforceAuth: false }, // ✅ Firebase 인증 비활성화
  async (request) => {
    const data = request.data; // ✅ request.data를 변수로 정의

    if (!data.email || !data.code) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        '이메일과 인증 코드가 필요합니다.'
      );
    }

    const { email, code } = data; // ✅ 구조 분해 할당

    // Firestore에서 인증 코드 가져오기
    const doc = await db.collection('email_verifications').doc(email).get();

    // 🔹 데이터가 존재하는지 확인
    if (!doc.exists || !doc.data()) {
      throw new functions.https.HttpsError(
        'not-found',
        '인증 코드가 없습니다.'
      );
    }

    const docData = doc.data(); // ✅ Firestore에서 가져온 데이터를 `docData`로 변경

    if (!docData || !docData.code) {
      throw new functions.https.HttpsError(
        'not-found',
        '인증 코드가 존재하지 않습니다.'
      );
    }

    if (docData.code !== code) {
      throw new functions.https.HttpsError(
        'permission-denied',
        '인증 코드가 일치하지 않습니다.'
      );
    }

    if (!docData.expiresAt || docData.expiresAt.toMillis() < Date.now()) {
      throw new functions.https.HttpsError(
        'deadline-exceeded',
        '인증 코드가 만료되었습니다.'
      );
    }

    // 인증 코드가 유효하면 Firestore 문서 업데이트
    await db.collection('email_verifications').doc(email).set(
      {
        verified: true, // ✅ 인증 여부 저장
      },
      { merge: true }
    );

    return { success: true, message: '인증 완료' };
  }
);
