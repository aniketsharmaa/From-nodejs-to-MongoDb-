const wa = require('@open-wa/wa-automate');

const axios = require('axios').default;

wa.create({
  sessionId: "graduation_project",
  multiDevice: true, //required to enable multiDevice support
  authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  hostNotificationLang: 'PT_BR',
  logConsole: false,
  popup: true,
  qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(client => start(client));

function start(client) {
  client.onMessage(async message => {
    if (message.body === 'Hi') {
      await client.sendText(message.from, 'This is BSPHCL bot created by Aniket Raj in the guidence of DBA Mr. Ajay Kumar. This bot generally used to provide convinence to the user who have complaints related to this organisation, User can check there complaint status with the help of this bot. User just have to send their complaint number to this bot.');
    } else {
      if( +message.body == NaN ) return await client.sendText(message.from, 'Invalid complaint number. please send a numeric input');
      const complaintNumber = +message.body;
      axios.get('http://localhost:3000/complaints/')
        .then(async function (response) {
          let foundComplaint = response.data.user.filter(function (data) {
            if (complaintNumber == data.complaintNumberr) {
              return data;
            }
          });
          if (foundComplaint.length == 0) return await client.sendText(message.from,'Complaint Not Found');
          let status;
          if (foundComplaint[0].status == 'pending') {
            status = 'Pending'
          } else if (foundComplaint[0].status == 'partially_solved') {
            status = 'Partially Solved';
          } else if (foundComplaint[0].status == 'solved') {
            status = 'Solved';
          } else if (foundComplaint[0].status == 'not_feasible') {
            status = 'Not Feasible';
          } else {
            status = 'N/A';
          }
          return await client.sendText(message.from, 'Your Status is ' + status)
        })
        .catch(async function (error) {
          return await client.sendText(message.from, 'Failed To Fetch Complaint Status')
        });
    }
    console.log(message.body);
  });
}

