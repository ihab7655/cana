document.addEventListener('DOMContentLoaded', function() {
  // قائمة الدول
  const countries = [
    "Algeria", "Bahrain", "Comoros", "Djibouti", "Egypt", "Iraq", "Jordan", "Kuwait", 
    "Lebanon", "Libya", "Mauritania", "Morocco", "Oman", "Palestine", "Qatar", 
    "Saudi Arabia", "Somalia", "Sudan", "Syria", "Tunisia", "United Arab Emirates", "Yemen",
    "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium",
    "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark",
    "Estonia", "Finland", "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
    "Ireland", "Italy", "Kazakhstan", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
    "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway",
    "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", 
    "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom"
  ];

  // تحديد عنصر select لعرض قائمة الدول
  const countrySelect = document.getElementById('countryOfBirth');

  // التحقق من وجود عنصر select قبل إضافة الخيارات
  if (countrySelect) {
    // إضافة كل دولة كخيار في عنصر select
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  } else {
    console.error('Element with id "countryOfBirth" not found.'); // عنصر select غير موجود
  }

  // تحديد عناصر النموذج التي يجب ملؤها
  const statusFormElements = document.querySelectorAll('#statusForm input[required], #statusForm select[required]');

  // إضافة رسالة تنبيه لكل حقل مطلوب لم يتم ملؤه
  statusFormElements.forEach(element => {
    const warningMessage = document.createElement('span');
    warningMessage.style.color = 'red';
    warningMessage.style.display = 'none';
    warningMessage.textContent = 'يرجى تعبئة الحقل';
    element.parentElement.appendChild(warningMessage);

    // التحقق من ملء جميع الحقول المطلوبة وإظهار رسالة التنبيه
    element.addEventListener('input', function() {
      if (element.value) {
        warningMessage.style.display = 'none';
      } else {
        warningMessage.style.display = 'inline';
      }
    });

    // تحقق أولي عند تحميل الصفحة
    if (!element.value) {
      warningMessage.style.display = 'inline';
    }
  });
});

function toggleApplicationNumberField() {
  // إظهار أو إخفاء حقل رقم الطلب بناءً على حالة المستخدم
  const applicationNumberField = document.getElementById('applicationNumberField');
  const statusSelect = document.getElementById('status');
  if (statusSelect && applicationNumberField) {
    applicationNumberField.style.display = statusSelect.value === 'new-applicant' ? 'block' : 'none';
  } else {
    console.error('Element with id "status" or "applicationNumberField" not found.'); // العناصر غير موجودة
  }
}

// قاعدة بيانات افتراضية للمستخدمين
const usersDatabase = [
  {
    applicationNumber: 'j553344',
    countryOfBirth: 'Syria',
    passportNumber: 'N01133502',
    issueDay: '19',
    issueMonth: '04',
    issueYear: '2024',
    expiryDay: '18',
    expiryMonth: '10',
    expiryYear: '2026',
    status: 'مقبول',
    submissionDate: '2024-04-01',
    applicantName: 'John Doe',
    notes: 'None'
  },
  {
    applicationNumber: 'x789012',
    countryOfBirth: 'Morocco',
    passportNumber: 'A12345678',
    issueDay: '10',
    issueMonth: '02',
    issueYear: '2023',
    expiryDay: '09',
    expiryMonth: '02',
    expiryYear: '2025',
    status: 'معلق',
    submissionDate: '2023-02-15',
    applicantName: 'Jane Smith',
    notes: 'يرجى تقديم المزيد من المستندات'
  }
];

function checkStatus() {
  // إظهار شاشة الانتظار
  document.getElementById('loader').style.display = 'block';

  // محاكاة التحقق من حالة الطلب بمدة انتظار 2 ثواني
  setTimeout(function() {
    const applicationNumber = document.getElementById('applicationNumber').value;
    const countryOfBirth = document.getElementById('countryOfBirth').value;
    const passportNumber = document.getElementById('passportNumber').value;
    const issueDay = document.getElementById('issueDay').value;
    const issueMonth = document.getElementById('issueMonth').value;
    const issueYear = document.getElementById('issueYear').value;
    const expiryDay = document.getElementById('expiryDay').value;
    const expiryMonth = document.getElementById('expiryMonth').value;
    const expiryYear = document.getElementById('expiryYear').value;

    // البحث في قاعدة البيانات عن المستخدم
    const user = usersDatabase.find(user =>
      user.applicationNumber === applicationNumber &&
      user.countryOfBirth === countryOfBirth &&
      user.passportNumber === passportNumber &&
      user.issueDay === issueDay && user.issueMonth === issueMonth && user.issueYear === issueYear &&
      user.expiryDay === expiryDay && user.expiryMonth === expiryMonth && user.expiryYear === expiryYear
    );

    // إخفاء شاشة الانتظار بعد 2 ثواني
    document.getElementById('loader').style.display = 'none';

    // إظهار النتائج المناسبة
    if (user) {
      showResults(user);
    } else {
      showResults(null); // إظهار رسالة خطأ إذا كانت البيانات غير صحيحة
    }
  }, 2000); // مدة الانتظار 2 ثواني
}

function showResults(data) {
  // إظهار النتائج في نافذة منبثقة
  const modal = document.getElementById('results-modal');
  const applicationNumberElem = document.getElementById('resultApplicationNumber');
  const statusElem = document.getElementById('resultStatus');
  const submissionDateElem = document.getElementById('resultSubmissionDate');
  const applicantNameElem = document.getElementById('resultApplicantName');
  const notesElem = document.getElementById('resultNotes');
  const errorMessage = document.getElementById('errorMessage');

  if (data) {
    applicationNumberElem.textContent = data.applicationNumber;
    statusElem.textContent = data.status;
    submissionDateElem.textContent = data.submissionDate;
    applicantNameElem.textContent = data.applicantName;
    notesElem.textContent = data.notes;

    // تغيير لون النص في خانة الملاحظات إلى الأحمر
    notesElem.style.color = 'red';

    errorMessage.style.display = 'none'; // إخفاء رسالة الخطأ
    modal.style.display = 'block'; // إظهار النافذة المنبثقة بالنتائج
  } else {
    errorMessage.style.display = 'block'; // إظهار رسالة الخطأ
    modal.style.display = 'none'; // إخفاء النافذة المنبثقة
  }
}

// إغلاق النافذة المنبثقة عند النقر على زر الإغلاق
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('results-modal').style.display = 'none';
});
