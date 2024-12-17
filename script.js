document.addEventListener('DOMContentLoaded', function() {
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

  const countrySelect = document.getElementById('countryOfBirth');

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
});

function toggleApplicationNumberField() {
  const applicationNumberField = document.getElementById('applicationNumberField');
  const statusSelect = document.getElementById('status');
  if (statusSelect && applicationNumberField) {
    applicationNumberField.style.display = statusSelect.value === 'new-applicant' ? 'block' : 'none';
  } else {
    console.error('Element with id "status" or "applicationNumberField" not found.');
  }
}

function checkStatus() {
  showLoader();
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

    if (applicationNumber === 'j553344' && 
        countryOfBirth === 'Syria' && 
        passportNumber === 'N01133502' && 
        issueDay === '19' && issueMonth === '04' && issueYear === '2024' && 
        expiryDay === '18' && expiryMonth === '10' && expiryYear === '2026') {
      
      showResults({
        applicationNumber: applicationNumber,
        status: "مقبول",
        submissionDate: "2024-04-01",
        applicantName: "John Doe",
        notes: "None"
      });

    } else {
      showResults(null);
    }

    hideLoader();
  }, 3000); // مدة الانتظار 3 ثواني
}

function showLoader() {
  document.getElementById('loader').style.display = 'none';
}

function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}

function showResults(data) {
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

    errorMessage.style.display = 'none';
    modal.style.display = 'block';
  } else {
    errorMessage.style.display = 'block';
    modal.style.display = 'none';
  }
}

document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('results-modal').style.display = 'none';
});
