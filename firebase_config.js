// firebase_config.js

// 1. استيراد (Import) وظائف Firebase التي نحتاجها
// - initializeApp: لتهيئة تطبيق Firebase.
// - getAuth: للحصول على خدمة المصادقة (Authentication).
// - getFirestore: للحصول على خدمة قاعدة البيانات (إذا احتجناها لاحقاً للنقاط/الأسئلة).
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2. إعدادات تطبيق الويب الخاص بك في Firebase (ممنوعة من التغيير)
const firebaseConfig = {
  apiKey: "AIzaSyAVcEik2fSkKcgPVEbX_ZbcfWKvKek6ClU", // هذا هو مفتاحك، لا تشاركه علناً!
  authDomain: "game-task-84895.firebaseapp.com",
  projectId: "game-task-84895",
  storageBucket: "game-task-84895.firebasestorage.app",
  messagingSenderId: "769375333391",
  appId: "1:769375333391:web:08bc5711bc4d49274b077a",
  measurementId: "G-9SV2WYBKF7"
};

// 3. تهيئة Firebase وتصدير الخدمات
// تهيئة التطبيق
const app = initializeApp(firebaseConfig);

// الحصول على خدمة المصادقة وتصديرها لاستخدامها في auth_handler.js
export const auth = getAuth(app);

// الحصول على خدمة قاعدة البيانات وتصديرها (استعداداً لتخزين النقاط)
export const db = getFirestore(app);

// ملاحظة: قمت بإزالة getAnalytics لأنها غالباً لا تستخدم في ملف التهيئة، ويمكن إضافتها لاحقاً.
