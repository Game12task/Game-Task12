// auth_handler.js - ملف التعامل مع مصادقة Firebase (التسجيل، الدخول، الخروج) (النسخة المحدثة لـ V9)

// =======================================================
// متطلبات التشغيل (استيراد الدوال والخدمات من firebase_config.js)
// =======================================================
import { auth, db } from "./firebase_config.js"; 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from "firebase/auth";
import { 
    doc, 
    setDoc, 
    updateDoc,
    serverTimestamp 
} from "firebase/firestore";

// =======================================================
// دوال المساعدة للواجهة (تبقى كما هي)
// =======================================================
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');
const logoutButton = document.getElementById('logoutButton'); // زر تسجيل الخروج في index.html

function displayMessage(message, isError = true) {
    if (authMessage) {
        authMessage.textContent = message;
        authMessage.style.color = isError ? 'red' : 'green';
    }
}

// =======================================================
// 1. دالة إنشاء سجل النقاط في Firestore
// =======================================================
async function createNewUserRecord(user, userName) {
    const userRef = doc(db, "users", user.uid);
    
    // استخدام setDoc لحفظ سجل المستخدم الجديد
    return await setDoc(userRef, {
        id: user.uid,
        name: userName,
        email: user.email,
        points: 0, // النقاط الأولية
        lastLogin: serverTimestamp(),
        createdAt: serverTimestamp()
    });
}

// =======================================================
// 2. دالة إنشاء حساب جديد (التسجيل)
// =======================================================
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail')?.value;
        const password = document.getElementById('registerPassword')?.value;
        const userName = document.getElementById('registerName')?.value; 
        
        displayMessage('جاري إنشاء الحساب...', false);

        try {
            // 1. إنشاء المستخدم في Firebase Auth (V9)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // 2. إنشاء سجل النقاط في Firestore 
            await createNewUserRecord(user, userName);
            
            displayMessage('تم إنشاء الحساب بنجاح! سيتم تحويلك.', false);
            
            // 3. التحويل الفوري بعد النجاح إلى index.html
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 1000); 

        } catch (error) {
            displayMessage(`خطأ في التسجيل: ${error.message}`, true);
        }
    });
}

// =======================================================
// 3. دالة تسجيل الدخول
// =======================================================
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;

        displayMessage('جاري تسجيل الدخول...', false);

        try {
            // 1. تسجيل الدخول في Firebase Auth (V9)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. تحديث تاريخ آخر دخول في قاعدة البيانات (V9)
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                lastLogin: serverTimestamp()
            });
            
            displayMessage('تم تسجيل الدخول بنجاح! سيتم تحويلك.', false);
            
            // 3. التحويل الفوري بعد النجاح إلى index.html
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);

        } catch (error) {
            displayMessage(`خطأ في الدخول: ${error.message}`, true);
        }
    });
}

// =======================================================
// 4. دالة تسجيل الخروج
// =======================================================
if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
        try {
            await signOut(auth); // دالة تسجيل الخروج (V9)
            console.log("User signed out.");
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Error signing out:", error);
            alert("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
        }
    });
}


// =======================================================
// 5. التحقق من حالة المصادقة (وظيفة تأمين الصفحات)
// =======================================================
function checkAuthStatus(redirectOnSuccess = false) {
    // استخدام onAuthStateChanged (V9)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // المستخدم مسجل دخوله
            console.log("User is logged in. UID:", user.uid);
            
            // حفظ بيانات المستخدم في التخزين المحلي للاستخدام في الواجهة
            localStorage.setItem('user_id', user.uid); 
            localStorage.setItem('username', user.displayName || user.email);
            
            // التوجيه إذا كنا في صفحة الدخول (login.html)
            if (window.location.pathname.includes('login.html') && redirectOnSuccess) {
                window.location.href = 'index.html'; 
            }
        } else {
            // المستخدم غير مسجل دخوله
            console.log("User is logged out.");
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            
            // تأمين الصفحة الرئيسية (index.html)
            if (window.location.pathname.includes('index.html')) { 
                window.location.href = 'login.html';
            }
        }
    });
}

// تنفيذ التحقق عند تحميل الصفحة
checkAuthStatus(window.location.pathname.includes('login.html'));

// تصدير دالة تسجيل الخروج للتحكم من أي مكان
window.signOutUser = () => signOut(auth).then(() => { window.location.href = 'login.html'; }).catch(console.error);
