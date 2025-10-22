// auth_handler.js - ملف التعامل مع مصادقة Firebase (التسجيل، الدخول، الخروج)

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
    serverTimestamp,
    getDoc 
} from "firebase/firestore";

// =======================================================
// دوال المساعدة للواجهة
// =======================================================
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');
const logoutButton = document.getElementById('logoutButton');

function displayMessage(message, isError = true) {
    if (authMessage) {
        authMessage.textContent = message;
        authMessage.style.color = isError ? 'red' : 'green';
    }
}

// دالة تحديث واجهة المستخدم بالـ ID والنقاط
function updateUI(user) {
    const userIdDisplay = document.getElementById('userIdDisplay');
    if (userIdDisplay) {
        // عرض الـ UID كاملاً
        userIdDisplay.textContent = user ? user.uid : 'غير مسجل';
    }

    // استدعاء دالة تحميل النقاط والمهام من tasks_handler إذا كانت موجودة
    if (user && window.loadUserTasksAndPoints) {
        window.loadUserTasksAndPoints(user.uid);
    }
}

// =======================================================
// 1. دالة إنشاء سجل النقاط في Firestore
// =======================================================
async function createNewUserRecord(user, userName) {
    const userRef = doc(db, "users", user.uid);
    
    // إنشاء سجل المستخدم بالاسم الذي أدخله
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
            // 1. إنشاء المستخدم في Firebase Auth
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
            // 1. تسجيل الدخول في Firebase Auth
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 2. تحديث تاريخ آخر دخول في قاعدة البيانات 
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
            await signOut(auth);
            console.log("User signed out.");
            window.location.href = 'login.html';
        } catch (error) {
            console.error("Error signing out:", error);
            displayMessage("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.", true); 
        }
    });
}


// =======================================================
// 5. التحقق من حالة المصادقة وتأمين الصفحات
// =======================================================
// هذه الدالة تعمل على مدار عمر التطبيق لتحديث حالة المستخدم والتحويل عند اللزوم
onAuthStateChanged(auth, (user) => {
    const isLoginPage = window.location.pathname.includes('login.html');
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';

    if (user) {
        // المستخدم مسجل دخوله 
        console.log("User is logged in. UID:", user.uid);
        updateUI(user);
        
        // إذا كان في صفحة الدخول وهو مسجل، نوجّهه إلى الصفحة الرئيسية
        if (isLoginPage) {
            window.location.href = 'index.html'; 
        }

    } else {
        // المستخدم غير مسجل دخوله
        console.log("User is logged out.");
        updateUI(null);
        
        // إذا كان في الصفحة الرئيسية وهو غير مسجل، نوجّهه إلى صفحة الدخول (تأمين الصفحة)
        if (isIndexPage) { 
            window.location.href = 'login.html';
        }
    }
});


// تصدير دالة تحديث الواجهة لتستخدم في ملفات أخرى
export { updateUI };
