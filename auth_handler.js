// auth_handler.js

// تحقق من أن Firebase مهيأ بشكل صحيح في firebase_config.js
if (typeof firebase === 'undefined' || !firebase.auth) {
    console.error("Firebase is not properly initialized or 'firebase-auth.js' is missing.");
}

const auth = firebase.auth();
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');

// =======================================================
// 1. تبديل الواجهات
// =======================================================

document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('register-form-container').style.display = 'block';
    authMessage.textContent = ''; // مسح الرسائل
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form-container').style.display = 'none';
    document.getElementById('login-form-container').style.display = 'block';
    authMessage.textContent = ''; // مسح الرسائل
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

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    displayMessage('جاري إنشاء الحساب...', false);

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // نجاح التسجيل
            // UserCredential.user.uid هو معرف المستخدم (UID)
            displayMessage('تم إنشاء الحساب بنجاح! سيتم تحويلك.', false);
            // يمكنك إضافة خطوة حفظ بيانات إضافية للمستخدم في Firestore هنا إذا احتجت
            
            // تحويل المستخدم إلى صفحة العروض offerwall.html
            setTimeout(() => {
                window.location.href = 'offerwall.html';
            }, 1000);

        })
        .catch((error) => {
            // فشل التسجيل
            displayMessage(`خطأ في التسجيل: ${error.message}`, true);
        });
});


// =======================================================
// 4. دالة تسجيل الدخول
// =======================================================

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    displayMessage('جاري تسجيل الدخول...', false);

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // نجاح تسجيل الدخول
            displayMessage('تم تسجيل الدخول بنجاح! سيتم تحويلك.', false);
            
            // تحويل المستخدم إلى صفحة العروض offerwall.html
            setTimeout(() => {
                window.location.href = 'offerwall.html';
            }, 1000);
        })
        .catch((error) => {
            // فشل تسجيل الدخول
            displayMessage(`خطأ في الدخول: ${error.message}`, true);
        });
});


// =======================================================
// 5. دالة تسجيل الخروج (مستخدمة في offerwall.html)
// =======================================================

function signOutUser() {
    auth.signOut().then(() => {
        // تم تسجيل الخروج بنجاح
        console.log("User signed out.");
        // تحويل المستخدم مرة أخرى إلى صفحة الدخول
        window.location.href = 'login.html';
    }).catch((error) => {
        // حدث خطأ
        console.error("Error signing out:", error);
        alert("حدث خطأ أثناء تسجيل الخروج. حاول مرة أخرى.");
    });
}


// =======================================================
// 6. التحقق من حالة المصادقة عند تحميل الصفحات (مهم لتأمين الصفحات)
// =======================================================

// هذا الكود يمكن وضعه داخل offerwall.html مباشرة أو داخل offerwall_handler.js
// لكن يفضل أن يكون في دالة يمكن استدعاؤها
function checkAuthStatus(redirectOnSuccess = false) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // المستخدم مسجل دخوله
            console.log("User is logged in. UID:", user.uid);
            
            // إذا كنا في صفحة الدخول (login.html) وسجل دخوله، حوله إلى offerwall.html
            if (window.location.pathname.includes('login.html') && redirectOnSuccess) {
                window.location.href = 'offerwall.html';
            }

            // إذا كنت في offerwall.html، يمكنك تحديث واجهة المستخدم هنا
            // (مثل استدعاء updateUI(user) من offerwall_handler.js)

        } else {
            // المستخدم غير مسجل دخوله
            console.log("User is logged out.");
            
            // إذا كنا في صفحة مؤمنة (مثل offerwall.html) ولم يسجل دخوله، حوله إلى login.html
            if (window.location.pathname.includes('offerwall.html')) {
                window.location.href = 'login.html';
            }
        }
    });
}

// عند تحميل login.html، تحقق مما إذا كان المستخدم مسجلاً بالفعل
// (هذا يمنع المستخدم من البقاء في login.html إذا كان قد سجل دخوله بالفعل)
if (window.location.pathname.includes('login.html')) {
    checkAuthStatus(true);
}
