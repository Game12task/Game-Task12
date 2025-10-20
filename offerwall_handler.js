// offerwall_handler.js

// 1. استيراد خدمات Firebase
import { auth } from './firebase_config.js'; 
import { onAuthStateChanged, signOut } from "firebase/auth";

// 2. العناصر من DOM
const signOutButton = document.getElementById('sign-out');
const offerwallTarget = document.getElementById('cpa-offerwall-target');

// دالة لتضمين كود الـ Offerwall بعد إضافة الـ UID
function injectOfferwallCode(uid) {
    const trackingId = uid; // استخدام UID كمعرف تتبع (Sub ID)

    // هذا هو كود جدار العروض الخاص بك، تم تضمين الـ UID هنا:
    const offerwallCode = `
        <script type="text/javascript"> var lck = false; </script>
        <script type="text/javascript" src="https://installyourfiles.com/script_include.php?id=1850937&tracking_id=${trackingId}"></script> 
        <script type="text/javascript"> if (! lck ){ top.location = 'https://installyourfiles.com/help/ablk.php?lkt=4'; } </script>
        <noscript> يُرجى تفعيل جافا سكريبت للوصول إلى هذه الصفحة. <meta http-equiv="refresh" content="0;url=https://installyourfiles.com/help/enable_javascript.php?lkt=4" /></noscript>
    `;

    // إزالة المحتوى القديم وإضافة الكود الجديد
    offerwallTarget.innerHTML = offerwallCode;
}


// 3. تأمين الصفحة والتحقق من حالة الدخول
onAuthStateChanged(auth, (user) => {
    if (user) {
        // المستخدم مسجل دخوله، ابدأ تحميل جدار العروض بالـ UID الخاص به
        injectOfferwallCode(user.uid);
    } else {
        // المستخدم غير مسجل دخوله، توجيهه لصفحة الدخول
        alert("يجب تسجيل الدخول للوصول إلى هذه الصفحة.");
        window.location.href = 'login.html'; 
    }
});

// 4. دالة تسجيل الخروج
signOutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        // onAuthStateChanged ستقوم بالتوجيه إلى login.html تلقائياً
    } catch (error) {
        console.error("فشل تسجيل الخروج:", error);
        alert("فشل تسجيل الخروج.");
    }
});
