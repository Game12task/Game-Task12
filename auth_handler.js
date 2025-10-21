// auth_handler.js
// ملف التعامل مع مصادقة Firebase (التسجيل، الدخول، الخروج)

// =======================================================
// متطلبات التشغيل
// =======================================================
// يجب أن تكون مكتبات Firebase و firebase_config.js محملة قبل هذا الملف
if (typeof firebase === 'undefined' || !firebase.auth) {
    console.error("Firebase is not properly initialized or 'firebase-auth.js' is missing.");
}

const auth = firebase.auth();
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');

// =======================================================
// 1. تبديل الواجهات (Login/Register)
// =======================================================

document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('register-form-container').style.display = 'block';
    authMessage.textContent = '';
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
    authMessage.textContent = '';
});


// =======================================================
// 2. دالة عرض رسائل الخطأ/النجاح
// =======================================================

function displayMessage(message, isError = true) {
    authMessage.textContent = message;
    authMessage.style.color = isError ? 'red' : 'green';
}


// =======================================================
// 3. دالة إنشاء حساب جديد (التسجيل)
// =======================================================

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        displayMessage('جاري إنشاء الحساب...', false);

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                displayMessage('تم إنشاء الحساب بنجاح! سيتم تحويلك.', false);
                
                setTimeout(() => {
                    window.location.href = 'offerwall.html';
                }, 1000);
            })
            .catch((error) => {
                displayMessage(`خطأ في التسجيل: ${error.message}`, true);
            });
    });
}


// =======================================================
// 4. دالة تسجيل الدخول
// =======================================================

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        displayMessage('جاري تسجيل الدخول...', false);

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                displayMessage('تم تسجيل الدخول بنجاح! سيتم تحويلك.', false);
                
                setTimeout(() => {
                    window.location.href = 'offerwall.html';
                }, 1000);
            })
            .catch((error) => {
                displayMessage(`خطأ في الدخول: ${error.message}`, true);
            });
    });
}


// =======================================================
// 5. دالة تسجيل الخروج (متاحة عالمياً ليستخدمها offerwall.html)
// =======================================================

function signOutUser() {
    auth.signOut().then(() => {
        console.log("User signed out.");
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Error signing out:", error);
        // نستخدم console.error بدلاً من alert() لتجنب المشاكل في iframe
        console.error("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
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
            
            // 1. التحديث التلقائي إذا كنا في صفحة الدخول
            if (window.location.pathname.includes('login.html') && redirectOnSuccess) {
                window.location.href = 'offerwall.html';
            }

            // 2. تحديث واجهة المستخدم وتحميل CPA (مهم لصفحة offerwall.html)
            if (window.location.pathname.includes('offerwall.html')) {
                // تحديث اسم المستخدم ورصيده في واجهة offerwall
                if (typeof updateUI === 'function') {
                    updateUI(user);
                }

                // تحميل عروض CPA وإضافة UID المستخدم لها
                if (typeof loadCpaLocker === 'function') {
                    loadCpaLocker(user.uid); 
                }
            }

        } else {
            // المستخدم غير مسجل دخوله (الإجابة "لا" من Firebase)
            console.log("User is logged out.");
            
            // إذا كنا في صفحة مؤمنة (offerwall.html) ولم يسجل دخوله، حوله إلى login.html
            if (window.location.pathname.includes('offerwall.html')) {
                window.location.href = 'login.html';
            }
        }
    });
}

// عند تحميل login.html، تحقق مما إذا كان المستخدم مسجلاً بالفعل
if (window.location.pathname.includes('login.html')) {
    checkAuthStatus(true);
}
