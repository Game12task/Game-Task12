// auth_handler.js

// 1. استيراد خدمة المصادقة (auth) وقاعدة البيانات (db) من ملف التهيئة
import { auth, db } from './firebase_config.js'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// 2. الحصول على عناصر DOM
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');

const loginContainer = document.getElementById('login-form-container');
const registerContainer = document.getElementById('register-form-container');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// 3. دالة تبديل العرض بين تسجيل الدخول والتسجيل
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
    authMessage.textContent = ''; // مسح الرسالة القديمة
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    authMessage.textContent = ''; // مسح الرسالة القديمة
});

// 4. دالة التسجيل (إنشاء حساب جديد)
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerEmail.value;
    const password = registerPassword.value;
    authMessage.textContent = '...جاري إنشاء الحساب';

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // **الخطوة الإضافية:** إنشاء مستند للمستخدم في Firestore لتخزين النقاط/المعلومات
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            points: 0, // نقطة البداية للمستخدم
            createdAt: new Date()
        });

        authMessage.textContent = 'تم التسجيل بنجاح! جاري التوجيه...';
        // التوجيه إلى صفحة الأسئلة
        window.location.href = 'questions.html'; 

    } catch (error) {
        // عرض رسالة خطأ واضحة
        let errorMessage = 'حدث خطأ غير معروف.';
        if (error.code === 'auth/weak-password') {
            errorMessage = 'كلمة المرور ضعيفة جداً. يجب أن تكون 6 أحرف على الأقل.';
        } else if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'البريد الإلكتروني مُستخدم بالفعل.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'صيغة البريد الإلكتروني غير صحيحة.';
        }
        authMessage.textContent = `فشل التسجيل: ${errorMessage}`;
        console.error("Registration Error:", error);
    }
});


// 5. دالة تسجيل الدخول
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;
    authMessage.textContent = '...جاري تسجيل الدخول';

    try {
        await signInWithEmailAndPassword(auth, email, password);
        
        authMessage.textContent = 'تم الدخول بنجاح! جاري التوجيه...';
        // التوجيه إلى صفحة الأسئلة
        window.location.href = 'questions.html'; 

    } catch (error) {
        // عرض رسالة خطأ واضحة
        let errorMessage = 'حدث خطأ غير معروف.';
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'صيغة البريد الإلكتروني غير صحيحة.';
        }
        authMessage.textContent = `فشل الدخول: ${errorMessage}`;
        console.error("Login Error:", error);
    }
});

// ملاحظة مهمة جداً: تم تضمين استخدام `db` (Firestore) هنا لحفظ النقاط التمهيدية
// عند التسجيل، وهذا يضمن أمن وفعالية نظام النقاط كما ذكرت في خطتك.
      
