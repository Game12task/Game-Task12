// firebase_config.js - إعدادات Firebase والخدمات الأساسية المطلوبة

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // خدمة المصادقة (Auth) لتسجيل الدخول ومعرّف المستخدم
import { getFirestore } from "firebase/firestore"; // خدمة قاعدة البيانات (Firestore) لحفظ النقاط والمهام
// import { getAnalytics } from "firebase/analytics"; // قم بإلغاء التعليق عند الحاجة لتحليلات Google

// إعدادات تطبيق الويب الخاص بك (تأكد من تحديثها دائماً)
const firebaseConfig = {
  apiKey: "AIzaSyAVcEik2fSkKcgPVEbX_ZbcfWKvKek6ClU",
  authDomain: "game-task-84895.firebaseapp.com",
  projectId: "game-task-84895",
  storageBucket: "game-task-84895.firebasestorage.app",
  messagingSenderId: "769375333391",
  appId: "1:769375333391:web:08bc5711bc4d49274b077a",
  measurementId: "G-9SV2WYBKF7" // رقم تحليلات Google
};

// تهيئة تطبيق Firebase الأساسي
const app = initializeApp(firebaseConfig);

// تعريف الخدمات التي سنستخدمها
const auth = getAuth(app); 
const db = getFirestore(app);
// const analytics = getAnalytics(app); // قم بتعريفها هنا عند الحاجة

// تصدير الخدمات ليمكن استخدامها في جميع ملفات الموقع (مثل auth_handler.js و tasks_handler.js)
export { app, auth, db };
