// tasks_handler.js - ملف لمعالجة وتدوير مهام الأسئلة اليومية

// -----------------------------------------------------------------------
// 1. قاعدة بيانات الأسئلة (تم تقسيمها إلى مجموعتين لضمان التدوير اليومي)
// -----------------------------------------------------------------------

const TASKS_DAY1 = [
    // مهام دينية (DAY 1)
    { id: 'TR1-A', category: 'Religious', question: 'من هو الصحابي الذي أشار على النبي بحفر الخندق؟', answer: 'سلمان الفارسي', reward: 10 },
    { id: 'TR2-A', category: 'Religious', question: 'ما اسم السورة التي تسمى قلب القرآن؟', answer: 'يس', reward: 10 },
    
    // مهام ثقافية (DAY 1)
    { id: 'TC1-A', category: 'Cultural', question: 'ما هي الدولة التي تقع في قارتي آسيا وأوروبا؟', answer: 'تركيا', reward: 10 },
    { id: 'TC2-A', category: 'Cultural', question: 'ما هو العنصر الكيميائي الذي يرمز له بالرمز Fe؟', answer: 'الحديد', reward: 10 },
    
    // مهام رياضية (DAY 1)
    { id: 'TS1-A', category: 'Sports', question: 'من هو الهداف التاريخي لكأس العالم لكرة القدم؟', answer: 'ميروسلاف كلوزه', reward: 10 },
    { id: 'TS2-A', category: 'Sports', question: 'كم عدد اللاعبين في فريق كرة السلة؟', answer: 'خمسة', reward: 10 }
];

const TASKS_DAY2 = [
    // مهام دينية (DAY 2)
    { id: 'TR1-B', category: 'Religious', question: 'من هو أول الخلفاء الراشدين؟', answer: 'أبو بكر الصديق', reward: 10 },
    { id: 'TR2-B', category: 'Religious', question: 'ما اسم أول معركة بحرية في الإسلام؟', answer: 'ذات الصواري', reward: 10 },
    
    // مهام ثقافية (DAY 2)
    { id: 'TC1-B', category: 'Cultural', question: 'ما هي عاصمة اليابان؟', answer: 'طوكيو', reward: 10 },
    { id: 'TC2-B', category: 'Cultural', question: 'ما هو أسرع حيوان بري على وجه الأرض؟', answer: 'الفهد', reward: 10 },
    
    // مهام رياضية (DAY 2)
    { id: 'TS1-B', category: 'Sports', question: 'ما هي الرياضة التي تعرف بـ "الساحرة المستديرة"؟', answer: 'كرة القدم', reward: 10 },
    { id: 'TS2-B', category: 'Sports', question: 'ما هو عدد الميداليات الذهبية في الشعار الأولمبي؟', answer: 'صفر', reward: 10 }
];

// -----------------------------------------------------------------------
// 2. دالة تحديد مجموعة مهام اليوم
// -----------------------------------------------------------------------

/**
 * دالة تجلب المهام المتاحة لفئة معينة بناءً على اليوم (لضمان التجديد)
 * @param {string} category - الفئة المطلوبة (Religious، Cultural، Sports)
 * @returns {Array} - قائمة بجميع الأسئلة التابعة لهذه الفئة لليوم الحالي
 */
function getCurrentDailyTasks(category) {
    const today = new Date();
    // نستخدم رقم اليوم لتحديد المجموعة: فردي = DAY1، زوجي = DAY2
    const isDayOne = today.getDate() % 2 !== 0; 
    
    const currentTasksSet = isDayOne ? TASKS_DAY1 : TASKS_DAY2;

    // ترجع الأسئلة التابعة للفئة المطلوبة
    return currentTasksSet.filter(task => 
        task.category === category
    );
}


// -----------------------------------------------------------------------
// 3. وظائف التحقق من الإكمال اليومي
// -----------------------------------------------------------------------

// مجموع النقاط الممنوحة عند إكمال الفئة بالكامل
const TASK_REWARD_PER_CATEGORY = 50; 

/**
 * دالة للتحقق من إمكانية حل المهمة اليوم
 * @param {string} category - الفئة المراد التحقق منها
 * @returns {boolean} - true إذا كانت متاحة، false إذا تم حلها اليوم
 */
function isTaskAvailable(category) {
    // نستخدم اسم الفئة الذي تم تخزينه (Religious, Cultural, Sports)
    const categoryKey = `completed_task_${category}`;
    const lastCompletionDate = localStorage.getItem(categoryKey);

    // إذا لم تُحل من قبل، فهي متاحة
    if (!lastCompletionDate) {
        return true; 
    }
    
    // إذا كان تاريخ الإكمال مختلفاً عن اليوم، فهي متاحة
    const today = new Date().toDateString();
    return lastCompletionDate !== today;
}

/**
 * دالة لتسجيل إكمال المهمة (التحدي الموحد للفئة)
 * @param {string} category - الفئة المكتملة
 */
function markTaskCompleted(category) {
    const today = new Date().toDateString();
    const categoryKey = `completed_task_${category}`;
    // تخزين تاريخ اليوم للإشارة إلى أنها اكتملت اليوم
    localStorage.setItem(categoryKey, today);
    
    // 💡 ملاحظة: هنا سيتم إضافة نقطة المكافأة إلى قاعدة بيانات Firebase لاحقاً
    // addRewardToUser(TASK_REWARD_PER_CATEGORY); 
}

// -----------------------------------------------------------------------
// 4. وظيفة عرض المهام على الصفحة (تُستخدم في tasks_questions_day1.html)
// -----------------------------------------------------------------------

function loadTasksPage(category) {
    const tasksContainer = document.getElementById('tasks-container');
    const titleElement = document.getElementById('task-title');
    const submitButton = document.getElementById('submit-btn');
    const completedDiv = document.getElementById('completed-div');
    
    // 1. تحديد اسم الفئة باللغة العربية للعرض
    let arabicTitle = '';
    if (category === 'Religious') arabicTitle = 'مهام دينية';
    else if (category === 'Cultural') arabicTitle = 'مهام ثقافية';
    else if (category === 'Sports') arabicTitle = 'مهام رياضية';
    
    titleElement.textContent = `${arabicTitle} - ${TASK_REWARD_PER_CATEGORY} نقطة`;

    // 2. التحقق من التجديد اليومي
    if (!isTaskAvailable(category)) {
        tasksContainer.innerHTML = ''; // تفريغ الحاوية
        completedDiv.style.display = 'block'; // إظهار رسالة الإكمال
        submitButton.style.display = 'none';
        return;
    }
    
    // 3. جلب أسئلة اليوم وبناء هيكل الأسئلة
    const tasks = getCurrentDailyTasks(category);
    tasksContainer.innerHTML = ''; // تفريغ الحاوية قبل البناء

    tasks.forEach((task, index) => {
        const taskHtml = `
            <div class="question-group" data-task-id="${task.id}">
                <div class="question">السؤال ${index + 1}: ${task.question}</div>
                <input type="text" id="answer-${task.id}" class="answer-input" placeholder="اكتب إجابتك هنا">
                <span id="status-${task.id}" style="font-size: 0.9em; margin-top: 5px; display: block;"></span>
            </div>
        `;
        tasksContainer.innerHTML += taskHtml;
    });

    submitButton.style.display = 'block'; // إظهار زر الإنهاء
}

// -----------------------------------------------------------------------
// 5. وظيفة التحقق من جميع الإجابات عند النقر على زر الإنهاء
// -----------------------------------------------------------------------

function checkAllAnswers() {
    const category = localStorage.getItem('current_task_category');
    const tasks = getCurrentDailyTasks(category);
    let allCorrect = true;
    let correctCount = 0;

    tasks.forEach(task => {
        const inputElement = document.getElementById(`answer-${task.id}`);
        const statusElement = document.getElementById(`status-${task.id}`);
        
        const userAnswer = inputElement.value.trim().toLowerCase();
        const correctAnswer = task.answer.trim().toLowerCase();

        if (userAnswer === correctAnswer) {
            statusElement.textContent = 'صحيح ✅';
            statusElement.style.color = '#4ade80';
            correctCount++;
        } else {
            statusElement.textContent = `خاطئ ❌. الإجابة الصحيحة: ${task.answer}`;
            statusElement.style.color = '#f87171';
            allCorrect = false;
        }
    });

    // ⭐️ إذا كانت جميع الإجابات صحيحة ⭐️
    if (allCorrect) {
        // تسجيل الإكمال اليومي
        markTaskCompleted(category);
        
        // إعطاء رسالة للمستخدم
        setTimeout(() => {
            alert(`تهانينا! أكملت جميع مهام ${category} وحصلت على ${TASK_REWARD_PER_CATEGORY} نقطة!`);
            window.location.href = 'index.html'; // العودة للصفحة الرئيسية
        }, 1500);
    } else {
         // إذا كان هناك خطأ، ننتظر فترة ونمسح رسالة الخطأ فقط 
         // ملاحظة: لا نسجل الإكمال، ليتمكن المستخدم من المحاولة مرة أخرى في نفس اليوم.
        alert('هناك بعض الإجابات الخاطئة. يرجى تصحيحها والمحاولة مرة أخرى.');
        setTimeout(() => {
            // يمكن مسح رسائل الخطأ بعد فترة لإتاحة المحاولة
        }, 3000); 
    }
}
