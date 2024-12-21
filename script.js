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

  // تحديد عناصر select لعرض قائمة الدول وقيم التواريخ
  const countrySelect = document.getElementById('countryOfBirth');
  const issueDaySelect = document.getElementById('issueDay');
  const issueMonthSelect = document.getElementById('issueMonth');
  const issueYearSelect = document.getElementById('issueYear');
  const expiryDaySelect = document.getElementById('expiryDay');
  const expiryMonthSelect = document.getElementById('expiryMonth');
  const expiryYearSelect = document.getElementById('expiryYear');

  // التحقق من وجود عناصر select قبل إضافة الخيارات
  if (countrySelect) {
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country;
      option.textContent = country;
      countrySelect.appendChild(option);
    });
  } else {
    console.error('Element with id "countryOfBirth" not found.');
  }

    // إضافة القيم إلى عناصر select الخاصة بالتواريخ
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')); // الأيام من 01 إلى 31
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')); // الأشهر من 01 إلى 12
  const issueYears = Array.from({ length: 2024 - 1980 + 1 }, (_, i) => 1980 + i); // السنوات من 1980 إلى 2024
  const expiryYears = Array.from({ length: 2055 - 1980 + 1 }, (_, i) => 1980 + i); // السنوات من 1980 إلى 2055

  // التحقق من وجود عناصر select الخاصة بالتواريخ قبل إضافة الخيارات
  if (issueDaySelect && issueMonthSelect && issueYearSelect && expiryDaySelect && expiryMonthSelect && expiryYearSelect) {
    days.forEach(day => {
      const option = document.createElement('option');
      option.value = day;
      option.textContent = day;
      issueDaySelect.appendChild(option);
      expiryDaySelect.appendChild(option.cloneNode(true));
    });

    months.forEach(month => {
      const option = document.createElement('option');
      option.value = month;
      option.textContent = month;
      issueMonthSelect.appendChild(option);
      expiryMonthSelect.appendChild(option.cloneNode(true));
    });

    issueYears.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      issueYearSelect.appendChild(option);
    });

    expiryYears.forEach(year => {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      expiryYearSelect.appendChild(option);
    });
  } else {
    console.error('Elements for date of issue or expiry not found.');
  }
});

function toggleApplicationNumberField() {
  // إظهار أو إخفاء حقل رقم الطلب بناءً على حالة المستخدم
  const applicationNumberField = document.getElementById('applicationNumberField');
  const statusSelect = document.getElementById('status');
  if (statusSelect && applicationNumberField) {
    applicationNumberField.style.display = statusSelect.value === 'new-applicant' ? 'block' : 'none';
  } else {
    console.error('Element with id "status" or "applicationNumberField" not found.');
  }
}

// قاعدة بيانات افتراضية للمستخدمين
const usersDatabase = [
  {
    applicationNumber: 'J902812',
    countryOfBirth: 'Lebanon',
    passportNumber: 'LR3724072',
    issueDay: '28',
    issueMonth: '09',
    issueYear: '2023',
    expiryDay: '27',
    expiryMonth: '09',
    expiryYear: '2033',
    status: 'Under Processing',
    submissionDate: '19-12-2024',
    applicantName: 'TAHA ALDANNAWI',
    notes: '⏳'
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
    status: 'Under Processing',
    submissionDate: '19-12-2024',
    applicantName: 'TAHA ALDANNAWI',
    notes: '⏳'
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

    if (data.status === 'Approved') {
  statusElem.style.color = 'green'; // تغيير اللون إلى الأخضر إذا كانت الحالة "Approved"
} else if (data.status === 'Under Processing') {
  statusElem.style.color = 'Gold'; // تغيير اللون إلى الأصفر إذا كانت الحالة "Under Processing"
} else if (data.status === 'Canceled') {
  statusElem.style.color = 'red'; // تغيير اللون إلى الأحمر إذا كانت الحالة "Canceled"
}

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
