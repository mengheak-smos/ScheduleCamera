const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1diHHL05XvKOnQZ_wIoavvk_5Oy0lakd-sWr6vMcrrGrA9KPNvAkpH2RDUGaX821c/exec';

const form = document.getElementById('bookingForm');

form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    department: document.getElementById('department').value,
    eventTitle: document.getElementById('eventTitle').value,
    startDate: document.getElementById('startDate').value,
    endDate: document.getElementById('endDate').value,
    venue: document.getElementById('venue').value,
    notes: document.getElementById('notes').value
  };

  console.log('Sending:', data);

  try {

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(data)
    });

    console.log('HTTP Status:', response.status);

    const text = await response.text();

    console.log('RAW RESPONSE:', text);

    let result;

    try {
      result = JSON.parse(text);
    } catch(err) {
      alert('Apps Script did not return JSON');
      console.error(text);
      return;
    }

    console.log('RESULT:', result);

    if(result.status === 'success') {

      alert('Booking submitted successfully');

      form.reset();

    } else {

      alert(result.message || 'Submission failed');
    }

  } catch(error) {

    console.error('FETCH ERROR:', error);

    alert('System Error: ' + error.message);
  }

});