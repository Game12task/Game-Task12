<?php
// هذا الكود بسيط ومؤقت. يقوم بتسجيل كل عملية Postback في ملف نصي (postback_log.txt)
// لاحقاً، سيتم تعديله ليربط بـ Firebase ويضيف الرصيد فعلاً.

// 1. استقبال البيانات المرسلة من CPAGrip
// user_id سيحتوي على اسم المستخدم (الـ userID)
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : 'UNKNOWN';
// amount سيحتوي على قيمة الدولار المكتسبة ({payout})
$amount = isset($_GET['amount']) ? $_GET['amount'] : 0;

// 2. إعداد ملف التسجيل
$log_file = 'postback_log.txt'; // سيتم إنشاء هذا الملف تلقائياً على سيرفرك
$timestamp = date('Y-m-d H:i:s');

// 3. التحقق من صحة البيانات (تأكيد أن المبلغ رقم وأن هناك اسم مستخدم)
if (is_numeric($amount) && $amount > 0 && $user_id !== 'UNKNOWN') {
    
    // 💡 ملاحظة هامة: هذا هو المكان الذي سنضع فيه كود Firebase لاحقاً
    // ... الكود المستقبلي لإضافة $amount إلى حساب $user_id في Firebase ...
    
    // حالياً، نسجل العملية كنجاح
    $log_message = "$timestamp | SUCCESS | User: $user_id | Amount: $amount USD\n";
    
    // 4. إرسال الرقم 1 لـ CPAGrip لتأكيد أن الفلوس وصلت وتم تسجيلها
    echo 1;
} else {
    // فشل في استقبال بيانات صحيحة أو المبلغ صفر
    $log_message = "$timestamp | FAILURE | Missing or Invalid Data. User ID: $user_id, Amount: $amount\n";
    
    // 5. إرسال الرقم 0 لـ CPAGrip يفيد بفشل الاستلام
    echo 0;
}

// تسجيل الرسالة في ملف الـ Log للمراجعة
// FILE_APPEND يعني أن الرسائل الجديدة تُضاف في نهاية الملف
file_put_contents($log_file, $log_message, FILE_APPEND);

?>
