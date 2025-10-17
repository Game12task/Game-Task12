// قائمة الأسئلة المتاحة لليوم (يمكنك تغييرها يومياً)
const ALL_TASKS = [
    // مهام دينية
    { id: 'T001', category: 'ديني', question: 'من هو الصحابي الذي أشار على النبي بحفر الخندق؟', answer: 'سلمان الفارسي', reward: 10 },
    { id: 'T002', category: 'ديني', question: 'ما اسم السورة التي تسمى قلب القرآن؟', answer: 'يس', reward: 10 },
    
    // مهام ثقافية
    { id: 'T003', category: 'ثقافي', question: 'ما هي الدولة التي تقع في قارتي آسيا وأوروبا؟', answer: 'تركيا', reward: 10 },
    { id: 'T004', category: 'ثقافي', question: 'ما هو العنصر الكيميائي الذي يرمز له بالرمز Fe؟', answer: 'الحديد', reward: 10 },
    
    // مهام رياضية
    { id: 'T005', category: 'رياضي', question: 'من هو الهداف التاريخي لكأس العالم لكرة القدم؟', answer: 'ميروسلاف كلوزه', reward: 10 },
    { id: 'T006', category: 'رياضي', question: 'كم عدد اللاعبين في فريق كرة السلة؟', answer: 'خمسة', reward: 10 }
];

// **********************************************
// لا تقم بتعديل الدوال التالية
// **********************************************

/**
 * دالة تجلب المهام المتاحة لفئة معينة
 * @param {string} category - الفئة المطلوبة (ديني، ثقافي، رياضي)
 * @returns {Array} - قائمة بالمهام غير المكتملة
 */
function getCurrentDailyTasks(category) {
    const today = new Date().toDateString();
    const completedTasksKey = `completedTasks_${today}`;
    const completedTasks = JSON.parse(localStorage.getItem(completedTasksKey) || '{}');

    return ALL_TASKS.filter(task => 
        task.category === category && !completedTasks[task.id]
    );
}

/**
 * دالة لتحديد النقاط الممنوحة للفئة (يمكن استخدامها لاحقاً لمهام أكبر)
 * @param {string} category - الفئة
 * @returns {number} - مجموع النقاط
 */
function getTaskReward(category) {
    // يمكنك تعديل هذه الدالة لتحدد مجموع النقاط لكل فئة. 
    // حالياً، سنعود لجمع نقاط كل سؤال بشكل منفصل.
    // بما أننا نستخدم نظام سؤال بسؤال، سنعيد فقط قيمة موحدة
    
    // **ملاحظة: النقاط يجب أن تمنح في نهاية التحدي المتسلسل.**
    
    // (لتجاوز المشكلة الحالية، سنعيد قيمة افتراضية هنا)
    return 50; 
}


/**
 * دالة لتسجيل إكمال المهمة
 * @param {string} category - الفئة المكتملة
 */
function markTaskCompleted(category) {
    const today = new Date().toDateString();
    const categoryKey = `completed_category_${category}_${today}`;
    localStorage.setItem(categoryKey, 'true');
}

/**
 * دالة للتحقق من إمكانية حل المهمة اليوم
 * @param {string} category - الفئة المراد التحقق منها
 * @returns {boolean} - true إذا كانت متاحة، false إذا تم حلها اليوم
 */
function isTaskAvailable(category) {
    const today = new Date().toDateString();
    const categoryKey = `completed_category_${category}_${today}`;
    return localStorage.getItem(categoryKey) !== 'true';
}
