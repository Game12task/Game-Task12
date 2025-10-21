// firebase_config.js
// تم تهيئة Firebase هنا باستخدام الإعدادات الخاصة بمشروعك (طريقة المتغيرات العامة/CDN).

// 1. إعدادات تطبيق الويب الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyAVcEik2fSkKcgPVEbX_ZbcfWKvKek6ClU", 
  authDomain: "game-task-84895.firebaseapp.com",
  projectId: "game-task-84895",
  storageBucket: "game-task-84895.firebasestorage.app",
  messagingSenderId: "769375333391",
  appId: "1:769375333391:web:08bc5711bc4d49274b077a",
  measurementId: "G-9SV2WYBKF7"
};

// 2. تهيئة التطبيق الأساسي
// 'firebase' هو متغير عام (Global) يتم توفيره من خلال ملف firebase-app.js في HTML
const app = firebase.initializeApp(firebaseConfig);

// 3. تعريف الخدمات المطلوبة (أصبحت الآن متاحة كمتغيرات عامة)
const db = app.firestore();
const auth = app.auth();

// 4. (هام) تمكين التخزين المؤقت لـ Firestore (Persistence)
// هذا يسمح للتطبيق بالعمل بشكل أسرع ويحل مشكلة "جاري التحميل..."
db.enablePersistence()
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          console.log("Multiple tabs open, Firestore persistence is disabled.");
      } else if (err.code == 'unimplemented') {
          console.log("The current browser does not support persistence.");
      } else {
          console.error("Failed to enable Firestore persistence:", err);
      }
  });

// ملاحظة: الآن يمكنك الوصول إلى 'db' و 'auth' مباشرة في أي ملف JavaScript آخر
// يتم تحميله بعد هذا الملف، مثل auth_handler.js.
