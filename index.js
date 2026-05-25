const SHEET_NAME = 'Sheet1';
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    const data = JSON.parse(e.postData.contents);

    const timestamp = new Date();

    sheet.appendRow([
      timestamp,
      data.name,
      data.department,
      data.eventTitle,
      data.startDate,
      data.endDate,
      data.venue,
      data.notes
    ]);

    const message = `📅 New Booking Schedule\n\n`
      + `👤 Name: ${data.name}\n`
      + `🏢 Department: ${data.department}\n`
      + `📝 Event: ${data.eventTitle}\n`
      + `📍 Venue: ${data.venue}\n`
      + `📆 Start: ${data.startDate}\n`
      + `📆 End: ${data.endDate}\n`
      + `🗒 Notes: ${data.notes}`;

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    UrlFetchApp.fetch(telegramUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

  const data = sheet.getDataRange().getValues();

  const headers = data.shift();

  const result = data.map(row => ({
    timestamp: row[0],
    name: row[1],
    department: row[2],
    eventTitle: row[3],
    startDate: row[4],
    endDate: row[5],
    venue: row[6],
    notes: row[7]
  }));

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}