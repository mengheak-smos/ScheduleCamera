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

  try {

    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if(result.status === 'success') {
      alert('Booking submitted successfully');
      form.reset();
    } else {
      alert('Error submitting booking');
    }

  } catch(error) {
    console.error(error);
    alert('System Error');
  }
});