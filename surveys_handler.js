// surveys_handler.js - ملف لمعالجة وتدوير أسئلة الاستبيانات (مُعَدَّل إلى نظام الخيارات المتعددة)

// -----------------------------------------------------
// 1. قاعدة بيانات الأسئلة (استبيان 5 أسئلة - Q5)
// **ملاحظة:** تم استبدال 'answer' بـ 'options'.
// -----------------------------------------------------
const SURVEY_Q5_DAY1 = [
    { ID: 'S5-A01', category: 'Opinion', question: 'ما هو مدى رضاك العام عن محتوى الموقع؟', options: ['راضٍ جداً', 'راضٍ', 'محايد', 'غير راضٍ'] },
    { ID: 'S5-A02', category: 'Experience', question: 'ما هو الشيء الذي تراه الأكثر أهمية في الموقع؟', options: ['سرعة التحميل', 'تنوع الأسئلة', 'تصميم الواجهة'] },
    { ID: 'S5-A03', category: 'Interest', question: 'ما هي الفئة التي ترغب بزيادة الأسئلة فيها مستقبلاً؟', options: ['ثقافة عامة', 'رياضة', 'تاريخ', 'ديني'] },
    { ID: 'S5-A04', category: 'Design', question: 'هل تجد أن الألوان المستخدمة مريحة للعين؟', options: ['نعم، مريحة', 'مقبولة', 'لا، مزعجة'] },
    { ID: 'S5-A05', category: 'Engagement', question: 'كم مرة تقريباً تزور فيها الموقع في الأسبوع؟', options: ['مرة واحدة', '2-3 مرات', 'أكثر من 3 مرات'] },
];

const SURVEY_Q5_DAY2 = [
    { ID: 'S5-B01', category: 'Opinion', question: 'هل تواجه أي صعوبة في التنقل بين صفحات الموقع؟', options: ['لا توجد صعوبة', 'صعوبة بسيطة', 'صعوبة كبيرة'] },
    { ID: 'S5-B02', category: 'Experience', question: 'هل تفضل الأسئلة النصية أم الأسئلة المصورة (إذا توفرت)؟', options: ['النصية', 'المصورة', 'كلاهما'] },
    { ID: 'S5-B03', category: 'Interest', question: 'ما هي الميزة الجديدة التي تتمنى إضافتها؟', options: ['دردشة مباشرة', 'نظام إشعارات', 'ترتيب عالمي'] },
    { ID: 'S5-B04', category: 'Design', question: 'ما مدى سهولة استخدام واجهة حل الاستبيانات؟', options: ['سهل جداً', 'سهل', 'صعب نوعاً ما'] },
    { ID: 'S5-B05', category: 'Engagement', question: 'هل تشارك النقاط التي تحصل عليها مع أصدقائك؟', options: ['أشارك دائماً', 'أحياناً', 'لا أشارك'] },
];

// -----------------------------------------------------
// 2. قاعدة بيانات الأسئلة (استبيان 7 أسئلة - Q7)
// -----------------------------------------------------
const SURVEY_Q7_DAY1 = [
    { ID: 'S7-A01', category: 'Opinion', question: 'ما هي أهمية نظام جمع النقاط بالنسبة لك؟', options: ['مهم جداً', 'مهم', 'ليس مهماً جداً'] },
    { ID: 'S7-A02', category: 'Experience', question: 'هل تجد أن نظام التدوير اليومي للأسئلة مناسب؟', options: ['نعم، مناسب جداً', 'أفضل أن يكون أسبوعياً', 'أفضل أن يكون يومياً بشكل أوسع'] },
    { ID: 'S7-A03', category: 'Science', question: 'ما مدى دقة الأسئلة التي يتم طرحها في فئة العلوم؟', options: ['دقيقة جداً', 'جيدة', 'تحتاج لمراجعة'] },
    { ID: 'S7-A04', category: 'Geography', question: 'ما هو الجهاز الذي تستخدمه للوصول للموقع غالباً؟', options: ['هاتف محمول', 'حاسوب لوحي', 'حاسوب مكتبي'] },
    { ID: 'S7-A05', category: 'Literature', question: 'ما هو أفضل وقت لإطلاق تحديثات وميزات جديدة؟', options: ['عطلة نهاية الأسبوع', 'منتصف الأسبوع', 'لا فرق'] },
    { ID: 'S7-A06', category: 'Sport', question: 'هل تفضل الإجابة على الأسئلة في وضع الليل (Dark Mode)؟', options: ['أفضله دائماً', 'أستخدم الوضع العادي', 'لا يهم'] },
    { ID: 'S7-A07', category: 'Sport', question: 'كم سؤال تجده مناسباً في الاستبيان الواحد (بشكل عام)؟', options: ['5', '7', '10', 'أكثر'] },
];

const SURVEY_Q7_DAY2 = [
    { ID: 'S7-B01', category: 'History', question: 'هل تفضل وجود خيار لـ "تخطي السؤال" في المهام؟', options: ['نعم', 'لا'] },
    { ID: 'S7-B02', category: 'Science', question: 'ما مدى وضوح الخط في الموقع وسهولة قراءته؟', options: ['واضح جداً', 'جيد', 'صعب القراءة'] },
    { ID: 'S7-B03', category: 'Science', question: 'هل تفضل إظهار الإجابة الصحيحة بعد الإجابة (حتى لو لم نعتمدها في هذا الاستبيان)؟', options: ['نعم', 'لا', 'لا فرق'] },
    { ID: 'S7-B04', category: 'Geography', question: 'هل تقوم بحل جميع الاستبيانات (5، 7، 10) كل يوم؟', options: ['نعم، كلها', 'أحل البعض فقط', 'أحل واحداً فقط'] },
    { ID: 'S7-B05', category: 'Literature', question: 'كم الوقت تقريباً تقضيه في حل تحديات الموقع يومياً؟', options: ['أقل من 5 دقائق', '5-10 دقائق', 'أكثر من 10 دقائق'] },
    { ID: 'S7-B06', category: 'Sport', question: 'هل تفضل مشاركة الإنجازات على وسائل التواصل الاجتماعي؟', options: ['أفعلها دائماً', 'أحياناً', 'لا أفعلها'] },
    { ID: 'S7-B07', category: 'Sport', question: 'هل هناك أي فئة أسئلة يجب حذفها نهائياً؟', options: ['لا، جميعها جيدة', 'فئة واحدة محددة', 'أكثر من فئة'] },
];

// -----------------------------------------------------
// 3. قاعدة بيانات الأسئلة (استبيان 10 أسئلة - Q10)
// -----------------------------------------------------
const SURVEY_Q10_DAY1 = [
    { ID: 'S10-A01', category: 'Math', question: 'هل تعتبر أسئلة الرياضيات (إن وجدت) صعبة جداً؟', options: ['نعم', 'لا'] },
    { ID: 'S10-A02', category: 'History', question: 'ما هو مستوى تعقيد أسئلة التاريخ الذي تفضله؟', options: ['سهل', 'متوسط', 'صعب'] },
    { ID: 'S10-A03', category: 'Science', question: 'هل نظام النقاط الحالي محفز بالنسبة لك؟', options: ['محفز جداً', 'محفز نوعاً ما', 'غير محفز'] },
    { ID: 'S10-A04', category: 'Geography', question: 'هل تفضل أن تكون المكافآت مادية (جوائز) بدلاً من النقاط؟', options: ['نعم', 'لا'] },
    { ID: 'S10-A05', category: 'Literature', question: 'هل تجد أن حجم الخط المستخدم في الموقع مناسب؟', options: ['مناسب', 'أفضل أن يكون أكبر', 'أفضل أن يكون أصغر'] },
    { ID: 'S10-A06', category: 'Sport', question: 'هل تفضل أسئلة الرياضات المحلية أو العالمية؟', options: ['المحلية', 'العالمية', 'كلاهما'] },
    { ID: 'S10-A07', category: 'Religion', question: 'ما مدى أهمية فئة الأسئلة الدينية بالنسبة لك؟', options: ['مهمة جداً', 'مهمة', 'ليست مهمة جداً'] },
    { ID: 'S10-A08', category: 'General', question: 'هل تفضل الإجابة باستخدام لوحة المفاتيح أو اللمس (Mobile)?', options: ['لوحة المفاتيح', 'اللمس', 'لا فرق'] },
    { ID: 'S10-A09', category: 'General', question: 'هل تفضل وجود مؤثرات صوتية عند الإجابة على سؤال؟', options: ['نعم', 'لا'] },
    { ID: 'S10-A10', category: 'Math', question: 'ما مدى احتمالية أن توصي بالموقع لصديق؟', options: ['محتمل جداً', 'محتمل', 'غير محتمل'] },
];

const SURVEY_Q10_DAY2 = [
    { ID: 'S10-B01', category: 'Math', question: 'هل تميل إلى الغش في الإجابة على الأسئلة؟', options: ['أغش دائماً', 'أغش أحياناً', 'لا أغش أبداً'] },
    { ID: 'S10-B02', category: 'History', question: 'ما هو انطباعك عن تصميم الأزرار والروابط في الموقع؟', options: ['ممتاز', 'جيد', 'ضعيف'] },
    { ID: 'S10-B03', category: 'Science', question: 'ما مدى دقة الإحصائيات (مثل عدد النقاط المكتسبة) التي تراها؟', options: ['دقيقة جداً', 'جيدة', 'غير دقيقة'] },
    { ID: 'S10-B04', category: 'Geography', question: 'هل تفضل تحديات زمنية (وقت محدد للإجابة)؟', options: ['نعم', 'لا'] },
    { ID: 'S10-B05', category: 'Literature', question: 'هل تشجعك التحديات اليومية على زيارة الموقع يومياً؟', options: ['نعم', 'لا'] },
    { ID: 'S10-B06', category: 'Sport', question: 'ما هي أهمية وجود صور وشعارات في أسئلة الرياضة؟', options: ['مهم جداً', 'مهم', 'ليس مهماً'] },
    { ID: 'S10-B07', category: 'Religion', question: 'هل تفضل أن تكون أسئلة الدين من القرآن والسنة فقط؟', options: ['نفضل ذلك', 'نريد تنويعاً', 'لا فرق'] },
    { ID: 'S10-B08', category: 'General', question: 'هل تفضل استخدام التطبيق على الهاتف بدلاً من المتصفح (إذا توفر)؟', options: ['نعم', 'لا'] },
    { ID: 'S10-B09', category: 'General', question: 'هل لديك أي اقتراحات إضافية لتحسين الموقع؟', options: ['نعم، لدي الكثير', 'لدي اقتراح واحد', 'ليس لدي'] },
    { ID: 'S10-B10', category: 'Math', question: 'هل مستوى الجوائز الممنوحة (افتراضياً) مرضي؟', options: ['مرضي جداً', 'مرضي', 'غير مرضي'] },
];

// -----------------------------------------------------
// 4. دالة تحديد مجموعة أسئلة اليوم (المنطق) - بدون تغيير
// -----------------------------------------------------
function getCurrentSurveySet(surveyType) {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const isDayOne = (dayOfWeek === 0 || dayOfWeek === 2 || dayOfWeek === 4); 

    if (surveyType === 'Q5') {
        return isDayOne ? SURVEY_Q5_DAY1 : SURVEY_Q5_DAY2;
    } 
    
    if (surveyType === 'Q7') {
        return isDayOne ? SURVEY_Q7_DAY1 : SURVEY_Q7_DAY2;
    }
    
    if (surveyType === 'Q10') {
        return isDayOne ? SURVEY_Q10_DAY1 : SURVEY_Q10_DAY2;
    }
    
    return []; 
}

// -----------------------------------------------------
// 5. دالة جلب مكافأة الاستبيان - بدون تغيير
// -----------------------------------------------------
function getSurveyReward(surveyType) {
    switch(surveyType) {
        case 'Q5': return 5;
        case 'Q7': return 7;
        case 'Q10': return 10;
        default: return 0;
    }
}

// -----------------------------------------------------
// 6. دالة التحقق من التجديد اليومي - بدون تغيير
// -----------------------------------------------------
function isSurveyAvailable(surveyType) {
    const userId = localStorage.getItem('user_id');
    if (!userId) return false; 
    
    const lastCompletionKey = `survey_completed_${userId}_${surveyType}`;
    const lastCompletionDate = localStorage.getItem(lastCompletionKey);
    
    const today = new Date().toDateString(); 
    
    return lastCompletionDate !== today;
}

// -----------------------------------------------------
// 7. دالة تسجيل الإنجاز - بدون تغيير
// -----------------------------------------------------
function markSurveyCompleted(surveyType) {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    const lastCompletionKey = `survey_completed_${userId}_${surveyType}`;
    const today = new Date().toDateString();
    localStorage.setItem(lastCompletionKey, today);
     }
