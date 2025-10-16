// surveys_handler.js - ملف لمعالجة وتدوير أسئلة الاستبيانات

// -----------------------------------------------------
// 1. قاعدة بيانات الأسئلة (استبيان 5 أسئلة - Q5)
// -----------------------------------------------------
const SURVEY_Q5_DAY1 = [
    { ID: 'S5-A01', category: 'General', question: 'ما هو الشيء الذي يزيد وزنه كلما أخذت منه؟', answer: 'الحفرة' },
    { ID: 'S5-A02', category: 'General', question: 'أي مدينة تُعرف باسم "مدينة الضباب"؟', answer: 'لندن' },
    { ID: 'S5-A03', category: 'General', question: 'كم عدد حبات القمح في الكيلوغرام الواحد؟', answer: 'لا يمكن معرفته' },
    { ID: 'S5-A04', category: 'General', question: 'من هو أول رائد فضاء عربي؟', answer: 'الأمير سلطان بن سلمان' },
    { ID: 'S5-A05', category: 'General', question: 'كم كوكب في المجموعة الشمسية (بدون بلوتو)؟', answer: '8' },
];

const SURVEY_Q5_DAY2 = [
    { ID: 'S5-B01', category: 'General', question: 'أين يقع أكبر محيط في العالم؟', answer: 'المحيط الهادئ' },
    { ID: 'S5-B02', category: 'General', question: 'من هو مؤلف رواية "ألف ليلة وليلة"؟', answer: 'لا يوجد مؤلف واحد' },
    { ID: 'S5-B03', category: 'General', question: 'ما هو الشيء الذي يمشي ويقف وليس له أرجل؟', answer: 'الساعة' },
    { ID: 'S5-B04', category: 'General', question: 'ما هي الدولة التي لديها أطول خط ساحلي في العالم؟', answer: 'كندا' },
    { ID: 'S5-B05', category: 'General', question: 'ما هو العنصر الكيميائي الذي رمزه K؟', answer: 'البوتاسيوم' },
];

// -----------------------------------------------------
// 2. قاعدة بيانات الأسئلة (استبيان 7 أسئلة - Q7)
// -----------------------------------------------------
const SURVEY_Q7_DAY1 = [
    { ID: 'S7-A01', category: 'History', question: 'من هو مكتشف قانون الجاذبية؟', answer: 'إسحاق نيوتن' },
    { ID: 'S7-A02', category: 'History', question: 'ما هي أقدم عاصمة مأهولة في العالم؟', answer: 'دمشق' },
    { ID: 'S7-A03', category: 'Science', question: 'كم يوماً في السنة الكبيسة؟', answer: '366' },
    { ID: 'S7-A04', category: 'Geography', question: 'ما هو البحر الذي يفصل بين أوروبا وأفريقيا؟', answer: 'البحر الأبيض المتوسط' },
    { ID: 'S7-A05', category: 'Literature', question: 'ما هي القارة التي ليس بها زواحف سامة؟', answer: 'أنتاركتيكا' },
    { ID: 'S7-A06', category: 'Sport', question: 'ما هو الشيء الذي تراه ولا يراك؟', answer: 'الظل' },
    { ID: 'S7-A07', category: 'Sport', question: 'كم نقطة تُمنح للفريق الفائز في كرة القدم؟', answer: '3' },
];

const SURVEY_Q7_DAY2 = [
    { ID: 'S7-B01', category: 'History', question: 'من هو أول من طاف حول الكرة الأرضية؟', answer: 'ماجلان' },
    { ID: 'S7-B02', category: 'Science', question: 'ما هو أسرع حيوان بري على وجه الأرض؟', answer: 'الفهد' },
    { ID: 'S7-B03', category: 'Science', question: 'ما هي عاصمة أستراليا؟', answer: 'كانبيرا' },
    { ID: 'S7-B04', category: 'Geography', question: 'ما هو الشيء الذي كلما زاد نقص؟', answer: 'العمر' },
    { ID: 'S7-B05', category: 'Literature', question: 'أين يقع برج بيزا المائل؟', answer: 'إيطاليا' },
    { ID: 'S7-B06', category: 'Sport', question: 'ما هي الرياضة التي تُعرف بـ "ملكة الرياضات"؟', answer: 'ألعاب القوى' },
    { ID: 'S7-B07', category: 'Sport', question: 'ما هو أكبر عضو في جسم الإنسان؟', answer: 'الجلد' },
];

// -----------------------------------------------------
// 3. قاعدة بيانات الأسئلة (استبيان 10 أسئلة - Q10)
// -----------------------------------------------------
const SURVEY_Q10_DAY1 = [
    { ID: 'S10-A01', category: 'Math', question: 'ما هي النسبة المئوية لـ 0.5؟', answer: '50%' },
    { ID: 'S10-A02', category: 'History', question: 'في أي عام سقط جدار برلين؟', answer: '1989' },
    { ID: 'S10-A03', category: 'Science', question: 'ما هو الكوكب الأقرب إلى الشمس؟', answer: 'عطارد' },
    { ID: 'S10-A04', category: 'Geography', question: 'ما هي أصغر دولة في العالم من حيث المساحة؟', answer: 'الفاتيكان' },
    { ID: 'S10-A05', category: 'Literature', question: 'من كتب مسرحية "روميو وجولييت"؟', answer: 'شكسبير' },
    { ID: 'S10-A06', category: 'Sport', question: 'كم عدد اللاعبين في فريق كرة السلة؟', answer: '5' },
    { ID: 'S10-A07', category: 'Religion', question: 'ما هي أطول سورة في القرآن الكريم؟', answer: 'البقرة' },
    { ID: 'S10-A08', category: 'General', question: 'ما هو الطائر الذي لا يطير؟', answer: 'النعامة' },
    { ID: 'S10-A09', category: 'General', question: 'ما هو الشيء الذي له أسنان ولا يأكل؟', answer: 'المشط' },
    { ID: 'S10-A10', category: 'Math', question: 'كم ضلعًا للمثلث؟', answer: '3' },
];

const SURVEY_Q10_DAY2 = [
    { ID: 'S10-B01', category: 'Math', question: 'ما هو ناتج (5+5) * 2؟', answer: '20' },
    { ID: 'S10-B02', category: 'History', question: 'متى بدأت الحرب العالمية الثانية؟', answer: '1939' },
    { ID: 'S10-B03', category: 'Science', question: 'ما هو الغاز الذي يشكل معظم الغلاف الجوي للأرض؟', answer: 'النيتروجين' },
    { ID: 'S10-B04', category: 'Geography', question: 'ما هي أكبر صحراء حارة في العالم؟', answer: 'الصحراء الكبرى' },
    { ID: 'S10-B05', category: 'Literature', question: 'ما هو لقب الكاتب الروسي ليو تولستوي؟', answer: 'الكونت' },
    { ID: 'S10-B06', category: 'Sport', question: 'ما هي الدولة الأكثر فوزاً بكأس العالم لكرة القدم؟', answer: 'البرازيل' },
    { ID: 'S10-B07', category: 'Religion', question: 'من هو خامس الخلفاء الراشدين؟', answer: 'عمر بن عبد العزيز' },
    { ID: 'S10-B08', category: 'General', question: 'ما هو المخلوق الذي لديه 3 قلوب؟', answer: 'الأخطبوط' },
    { ID: 'S10-B09', category: 'General', question: 'ما هو الشيء الذي يبتل عند التجفيف؟', answer: 'المنشفة' },
    { ID: 'S10-B10', category: 'Math', question: 'ما هو أصغر عدد أولي؟', answer: '2' },
];


// -----------------------------------------------------
// 4. دالة تحديد مجموعة أسئلة اليوم (تم تحديثها)
// -----------------------------------------------------
function getCurrentSurveySet(surveyType) {
    const today = new Date();
    const dayOfMonth = today.getDate(); 
    const isDayOne = dayOfMonth % 2 !== 0; 
    
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
// 5. دالة التحقق من التجديد اليومي
// -----------------------------------------------------
function isSurveyAvailable(surveyID) {
    const lastCompletionDate = localStorage.getItem(`survey_${surveyID}_last_completed`);
    if (!lastCompletionDate) {
        return true; 
    }
    const today = new Date().toDateString(); 
    return lastCompletionDate !== today;
}

function markSurveyCompleted(surveyID) {
    const today = new Date().toDateString();
    localStorage.setItem(`survey_${surveyID}_last_completed`, today);
}
