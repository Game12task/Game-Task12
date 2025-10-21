// auth_handler.js - ملف التعامل مع مصادقة Firebase (التسجيل، الدخول، الخروج) (النسخة النهائية والمصححة)

// =======================================================
// متطلبات التشغيل
// =======================================================
// يتم افتراض أن هذه المتغيرات (auth, db) متاحة عالميًا بعد تحميل مكتبات Firebase و firebase_config.js
if (typeof firebase === 'undefined' || !firebase.auth || !firebase.firestore) {
    console.error("Firebase services (Auth or Firestore) are not properly initialized or libraries are missing.");
}

// الوصول إلى الخدمات التي تم تهيئتها في firebase_config.js
const auth = firebase.auth();
const db = firebase.firestore(); // **الوصول إلى Firestore لقاعدة بيانات النقاط**

// =======================================================
// دوال المساعدة للواجهة
// =======================================================
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');

function displayMessage(message, isError = true) {
    authMessage.textContent = message;
    authMessage.style.color = isError ? 'red' : 'green';
}

// =======================================================
// 1. تبديل الواجهات (Login/Register) - (موجودة الآن في login.html)
// =======================================================
// **تنبيه: تم الاحتفاظ بها لكنها غير مستخدمة في حالتنا الحالية لأن logic التبديل موجود في login.html**

document.getElementById('showRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('register-form-container').style.display = 'block';
    authMessage.textContent = '';
});

document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
    authMessage.textContent = '';
});


// =======================================================
// 2. دالة إنشاء سجل النقاط في Firestore
// =======================================================
function createNewUserRecord(user, userName) {
    const userRef = db.collection("users").doc(user.uid);
    
    // إنشاء سجل المستخدم بالاسم والنقاط (تبدأ بـ 0)
    return userRef.set({
        id: user.uid,
        name: userName,
        email: user.email,
        points: 0, 
        lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// =======================================================
// 3. دالة إنشاء حساب جديد (التسجيل) - مع تحويل لـ index.html
// =======================================================

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const userName = document.getElementById('registerName').value; // الاسم من login.html
        
        displayMessage('جاري إنشاء الحساب...', false);

        // 1. إنشاء المستخدم في Firebase Auth
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // 2. إنشاء سجل النقاط في Firestore وتتبعه
                return createNewUserRecord(user, userName);
            })
            .then(() => {
                displayMessage('تم إنشاء الحساب بنجاح! سيتم تحويلك.', false);
                
                // 3. ✅ التحويل الفوري بعد النجاح إلى index.html
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 1000); 
            })
            .catch((error) => {
                displayMessage(`خطأ في التسجيل: ${error.message}`, true);
            });
    });
}


// =======================================================
// 4. دالة تسجيل الدخول - مع تحويل لـ index.html
// =======================================================

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        displayMessage('جاري تسجيل الدخول...', false);

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // تحديث تاريخ آخر دخول في قاعدة البيانات
                const userRef = db.collection("users").doc(user.uid);
                return userRef.update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                 displayMessage('تم تسجيل الدخول بنجاح! سيتم تحويلك.', false);
                
                // ✅ التحويل الفوري بعد النجاح إلى index.html
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            })
            .catch((error) => {
                displayMessage(`خطأ في الدخول: ${error.message}`, true);
            });
    });
}


// =======================================================
// 5. دالة تسجيل الخروج
// =======================================================

function signOutUser() {
    auth.signOut().then(() => {
        console.log("User signed out.");
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Error signing out:", error);
        alert("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
    });
}


// =======================================================
// 6. التحقق من حالة المصادقة (وظيفة تأمين الصفحات)
// =======================================================

function checkAuthStatus(redirectOnSuccess = false) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // المستخدم مسجل دخوله
            console.log("User is logged in. UID:", user.uid);
            
            // ✅ التحديث التلقائي إذا كنا في صفحة الدخول (توجيه لـ index.html)
            if (window.location.pathname.includes('login.html') && redirectOnSuccess) {
                window.location.href = 'index.html'; 
            }
        } else {
            // المستخدم غير مسجل دخوله
            console.log("User is logged out.");
            
            // إذا كنا في صفحة مؤمنة (index.html) ولم يسجل دخوله، حوله إلى login.html
            // تم إزالة offerwall.html لأنها لم تعد الصفحة الرئيسية
            if (window.location.pathname.includes('index.html')) { 
                window.location.href = 'login.html';
            }
        }
    });
}

// عند تحميل login.html، تحقق مما إذا كان المستخدم مسجلاً بالفعل
if (window.location.pathname.includes('login.html')) {
    checkAuthStatus(true);
}

// تصدير دالة تسجيل الخروج لتكون متاحة من أي صفحة أخرى
window.signOutUser = signOutUser;
