// tasks_handler.js - ملف لمعالجة المهام اليومية

// -----------------------------------------------------
// 1. قاعدة بيانات المهام اليومية (5 أسئلة لكل يوم)
// تحتوي كل مهمة على (question, options, correctAnswer, points)
// -----------------------------------------------------

// المهام ليوم الأحد، الثلاثاء، الخميس (Day 1)
const DAILY_TASKS_DAY1 = [
    // المهمة 1: دينية
    {
        ID: 'T1-D01',
        category: 'Religious',
        question: 'من هو أول الخلفاء الراشدين؟',
        options: ['عمر بن الخطاب', 'علي بن أبي طالب', 'أبو بكر الصديق', 'عثمان بن عفان'],
        correctAnswer: 'أبو بكر الصديق',
        points: 5 
    },
    // المهمة 2: ثقافية
    {
        ID: 'T1-C02',
        category: 'Cultural',
        question: 'ما هو اسم أول عملة رقمية مشهورة غير البيتكوين تم إصدارها؟',
        options: ['اللايتكوين (Litecoin)', 'الإيثيريوم (Ethereum)', 'الريبل (Ripple)', 'لم تظهر بعد'],
        correctAnswer: 'اللايتكوين (Litecoin)',
        points: 5
    },
    // المهمة 3: رياضية
    {
        ID: 'T1-S03',
        category: 'Sports',
        question: 'ما هي الدولة التي فازت بأول كأس عالم لكرة القدم عام 1930؟',
        options: ['البرازيل', 'الأرجنتين', 'أوروغواي', 'إيطاليا'],
        correctAnswer: 'أوروغواي',
        points: 5
    },
    // المهمة 4: تاريخية (جديدة)
    {
        ID: 'T1-H04',
        category: 'Historical',
        question: 'في أي عام سقط جدار برلين؟',
        options: ['1991', '1989', '1985', '1995'],
        correctAnswer: '1989',
        points: 5
    },
     // المهمة 5: علمية/تقنية (جديدة)
    {
        ID: 'T1-Sc05',
        category: 'Scientific/Technological',
        question: 'ما هو العنصر الكيميائي الذي يرمز له بالرمز Au؟',
        options: ['الفضة', 'النحاس', 'الذهب', 'الحديد'],
        correctAnswer: 'الذهب',
        points: 5
    }
];

// المهام ليوم الإثنين، الأربعاء، الجمعة (Day 2)
const DAILY_TASKS_DAY2 = [
    // المهمة 1: دينية
    {
        ID: 'T2-D01',
        category: 'Religious',
        question: 'في أي شهر هجري تم فرض الصيام؟',
        options: ['رجب', 'شوال', 'رمضان', 'ذو الحجة'],
        correctAnswer: 'رمضان',
        points: 5
    },
    // المهمة 2: ثقافية
    {
        ID: 'T2-C02',
        category: 'Cultural',
        question: 'ما هي القارة التي يمر بها خط الاستواء ومدار الجدي ومدار السرطان معاً؟',
        options: ['آسيا', 'أفريقيا', 'أمريكا الجنوبية', 'أستراليا'],
        correctAnswer: 'أفريقيا',
        points: 5
    },
    // المهمة 3: رياضية
    {
        ID: 'T2-S03',
        category: 'Sports',
        question: 'كم عدد حلقات العلم الأولمبي (التي تمثل القارات)؟',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        points: 5
    },
    // المهمة 4: تاريخية (جديدة)
    {
        ID: 'T2-H04',
        category: 'Historical',
        question: 'ما هو الاسم القديم لمدينة إسطنبول؟',
        options: ['أنقرة', 'القسطنطينية', 'روما', 'أثينا'],
        correctAnswer: 'القسطنطينية',
        points: 5
    },
     // المهمة 5: علمية/تقنية (جديدة)
    {
        ID: 'T2-Sc05',
        category: 'Scientific/Technological',
        question: 'ما هو الغاز الأكثر وفرة في الغلاف الجوي للأرض؟',
        options: ['الأكسجين', 'ثاني أكسيد الكربون', 'النيتروجين', 'الهيدروجين'],
        correctAnswer: 'النيتروجين',
        points: 5
    }
];


// -----------------------------------------------------
// 2. دالة جلب المهام لليوم الحالي
// -----------------------------------------------------
function getCurrentDailyTasks() {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    // يوم 0 هو الأحد، يوم 1 هو الإثنين
    const isDayOne = (dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4); 

    return isDayOne ? DAILY_TASKS_DAY1 : DAILY_TASKS_DAY2;
}

// -----------------------------------------------------
// 3. دالة التحقق من التجديد اليومي للمهام
// -----------------------------------------------------
function isTaskAvailable(taskId) {
    const userId = localStorage.getItem('user_id');
    if (!userId) return false; 
    
    // المفتاح للتخزين: task_completed_USERID_TASKID_TODAYSDATE
    const completionKey = `task_completed_${userId}_${taskId}`;
    const lastCompletionDate = localStorage.getItem(completionKey);
    
    const today = new Date().toDateString(); 
    
    // المهمة متاحة إذا لم يتم إكمالها اليوم
    return lastCompletionDate !== today;
}

// -----------------------------------------------------
// 4. دالة تسجيل إكمال المهمة
// -----------------------------------------------------
function markTaskCompleted(taskId) {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    const completionKey = `task_completed_${userId}_${taskId}`;
    const today = new Date().toDateString();
    localStorage.setItem(completionKey, today);
}
