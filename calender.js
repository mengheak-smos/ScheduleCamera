const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1diHHL05XvKOnQZ_wIoavvk_5Oy0lakd-sWr6vMcrrGrA9KPNvAkpH2RDUGaX821c/exec';

async function loadCalendar() {

  const response = await fetch(SCRIPT_URL);
  const data = await response.json();

  const events = data.map(item => ({
    title: item.eventTitle + ' - ' + item.venue,
    start: item.startDate,
    end: item.endDate,
    description: item.notes
  }));

  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    events: events,
    editable: false,
    selectable: true,
    eventClick: function(info) {
      alert(
        'Event: ' + info.event.title + '\n\n'
        + 'Start: ' + info.event.start + '\n\n'
        + 'Description: ' + info.event.extendedProps.description
      );
    }
  });

  calendar.render();
}

loadCalendar();