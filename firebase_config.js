// firebase_config.js - إعدادات Firebase والمكتبات المطلوبة

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // مكتبة تسجيل الدخول
import { getFirestore } from "firebase/firestore"; // مكتبة قاعدة البيانات

// إعدادات تطبيق الويب الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyAVcEik2fSkKcgPVEbX_ZbcfWKvKek6ClU",
  authDomain: "game-task-84895.firebaseapp.com",
  projectId: "game-task-84895",
  storageBucket: "game-task-84895.firebasestorage.app",
  messagingSenderId: "769375333391",
  appId: "1:769375333391:web:08bc5711bc4d49274b077a",
  measurementId: "G-9SV2WYBKF7"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// تعريف الخدمات التي سنستخدمها
const auth = getAuth(app); 
const db = getFirestore(app);

// تصدير الخدمات ليمكن استخدامها في ملف auth_handler.js 
export { auth, db };
