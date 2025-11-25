// auth_handler.js (جزء التسجيل)

// دالة لمعالجة تسجيل مستخدم جديد
function registerUser(email, password) {
    // 1. استخدم خدمة Authentication لإنشاء المستخدم
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // التسجيل ناجح!
            const user = userCredential.user;
            console.log("تم تسجيل المستخدم بنجاح:", user.uid);

            // 2. الخطوة الحاسمة: إنشاء سجل له في Firestore لحفظ النقاط
            return db.collection("users").doc(user.uid).set({
                email: user.email,
                points: 0, // يبدأ بصفر نقطة
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        })
        .then(() => {
            alert("تم إنشاء الحساب بنجاح! النقاط الأولية (0) محفوظة.");
            // يمكنك توجيه المستخدم لصفحة الأسئلة
            // window.location.href = "quiz.html"; 
        })
        .catch((error) => {
            // التعامل مع الأخطاء
            alert("خطأ في التسجيل: " + error.message);
        });
}

// يمكنك استدعاء هذه الدالة من نموذج التسجيل في login.html
// registerUser("test@example.com", "password123"); 
