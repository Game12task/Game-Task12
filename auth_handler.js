// auth_handler.js
// ملف التعامل مع مصادقة Firebase (التسجيل، الدخول، الخروج)

// =======================================================
// متطلبات التشغيل
// =======================================================
if (typeof firebase === 'undefined' || !firebase.auth) {
    console.error("Firebase is not properly initialized or 'firebase-auth.js' is missing.");
}

const auth = firebase.auth();
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const authMessage = document.getElementById('authMessage');

// [باقي الدوال (تبديل الواجهات، التسجيل، الدخول، الخروج) كما هي...]
// (أفترض أنها موجودة وصحيحة من الخطوات السابقة)


// =======================================================
// 6. التحقق من حالة المصادقة (وظيفة تأمين الصفحات) - التعديل هنا
// =======================================================

function checkAuthStatus(redirectOnSuccess = false) {
    auth.onAuthStateChanged((user) => {
        if (user) {
            // المستخدم مسجل دخوله
            console.log("User is logged in. UID:", user.uid);
            
            // 1. التحديث التلقائي إذا كنا في صفحة الدخول (توجيه)
            if (window.location.pathname.includes('login.html') && redirectOnSuccess) {
                window.location.href = 'offerwall.html';
            }

            // 2. التحديث وتحميل CPA (مهم لصفحة offerwall.html)
            if (window.location.pathname.includes('offerwall.html')) {
                // **هذا السطر يستدعي الدالة الجديدة من offerwall_handler.js**
                if (typeof checkAuthStatusAndLoadCPA === 'function') {
                    checkAuthStatusAndLoadCPA(user); 
                }
            }

        } else {
            // المستخدم غير مسجل دخوله
            console.log("User is logged out.");
            
            // إذا كنا في صفحة مؤمنة (offerwall.html) ولم يسجل دخوله، حوله إلى login.html
            if (window.location.pathname.includes('offerwall.html')) {
                window.location.href = 'login.html';
            }
        }
    });
}

// ... [باقي الكود في auth_handler.js]
