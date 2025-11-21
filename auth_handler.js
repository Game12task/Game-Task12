// ** 1. إعداد رابط API (الرابط الصحيح والنهائي من جوجل) **
// الرابط الجديد: https://script.google.com/macros/s/AKfycbyI2G_WGjWfwrVG2NcEk1M7WOHer1lXdXsqpQA3XaHepDGwKjNwilyFgXwgTnErgvOoCQ/exec
const API_URL = 'https://script.google.com/macros/s/AKfycbyI2G_WGjWfwrVG2NcEk1M7WOHer1lXdXsqpQA3XaHepDGwKjNwilyFgXwgTnErgvOoCQ/exec';


// ** 2. وظيفة تسجيل مستخدم جديد (Register) **
async function registerUser(name) {
    if (!name) {
        return { status: 'error', message: 'الرجاء إدخال اسم المستخدم.' };
    }

    try {
        const url = `${API_URL}?action=addUser&name=${encodeURIComponent(name)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success') {
            localStorage.setItem('game_user_id', data.ID);
            localStorage.setItem('game_username', name);
            window.location.href = 'index.html';
            return { status: 'success', message: 'تم التسجيل بنجاح.' };
        } else {
            return { status: 'error', message: data.message || 'خطأ في عملية التسجيل.' };
        }
    } catch (error) {
        console.error('Registration Error:', error);
        return { status: 'error', message: 'حدث خطأ في الاتصال بالخادم.' };
    }
}


// ** 3. وظيفة تسجيل الدخول (Login) **
async function loginUser(name) {
    if (!name) {
        return { status: 'error', message: 'الرجاء إدخال اسم المستخدم.' };
    }

    try {
        const url = `${API_URL}?action=findUser&name=${encodeURIComponent(name)}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'success') {
            localStorage.setItem('game_user_id', data.ID);
            localStorage.setItem('game_username', name);
            window.location.href = 'index.html';
            return { status: 'success', message: 'تم تسجيل الدخول بنجاح.' };
        } else {
            return { status: 'error', message: data.message || 'خطأ: لم يتم العثور على اسم المستخدم.' };
        }
    } catch (error) {
        console.error('Login Error:', error);
        return { status: 'error', message: 'حدث خطأ في الاتصال بالخادم.' };
    }
}


// ** 4. وظيفة التحقق من حالة الدخول (لحماية الصفحات) **
function checkAuthAndRedirect() {
    const userID = localStorage.getItem('game_user_id');
    const currentPage = window.location.pathname.split('/').pop();

    if (!userID) {
        if (currentPage !== 'login.html') {
            window.location.href = 'login.html';
        }
    } else {
        if (currentPage === 'login.html') {
            window.location.href = 'index.html';
        }
    }
}
