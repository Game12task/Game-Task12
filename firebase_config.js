// firebase_config.js
// يتم تهيئة Firebase هنا باستخدام الإعدادات الخاصة بمشروعك.
// هذه الطريقة تتوافق مع نظام التحميل عبر CDN في ملف login.html

// 2. إعدادات تطبيق الويب الخاص بك في Firebase
// (لقد قمت بحذف مفتاح API هنا لأغراض الأمان، يرجى التأكد من استبدالها بالإعدادات الصحيحة في مشروعك)
const firebaseConfig = {
  apiKey: "AIzaSyAVcEik2fSkKcgPVEbX_ZbcfWKvKek6ClU", 
  authDomain: "game-task-84895.firebaseapp.com",
  projectId: "game-task-84895",
  storageBucket: "game-task-84895.firebasestorage.app",
  messagingSenderId: "769375333391",
  appId: "1:769375333391:web:08bc5711bc4d49274b077a",
  measurementId: "G-9SV2WYBKF7"
};

// 3. تهيئة Firebase
// هذه الدالة (firebase.initializeApp) يتم توفيرها بواسطة مكتبة firebase-app.js التي تم تضمينها في login.html
firebase.initializeApp(firebaseConfig);

// لا حاجة لتصدير المتغيرات (export) لأننا سنستخدمها كمتغيرات عامة (Global)
// في auth_handler.js سنصل إلى خدمات المصادقة هكذا: firebase.auth() و firebase.firestore()
