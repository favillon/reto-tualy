const { exec } = require('child_process');
let emailFrom = 'email@email.com'
let emailRcpt = 'user@example.com'
let subject = 'Reto Tualy v1'
let service = 5
let totalaService =1000
const curlSend = `curl --ssl-reqd \
--url 'smtp://smtp.mailtrap.io:2525' \
--user '4691c277aec232:8ba0f8498c238d' \
--mail-from ${emailFrom} \
--mail-rcpt ${emailRcpt} \
--upload-file - <<EOF
From: Magic Elves <${emailFrom}>
To: Mailtrap Inbox <${emailRcpt}>
Subject: ${subject}
Content-Type: multipart/alternative; boundary="boundary-string"

--boundary-string
Content-Type: text/plain; charset="utf-8"
Content-Transfer-Encoding: quoted-printable
Content-Disposition: inline

Congrats for sending test email with Mailtrap!

Inspect it using the tabs above and learn how this email can be improved.
Now send your email using our fake SMTP server and integration of your choice!

Good luck! Hope it works.

--boundary-string
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: quoted-printable
Content-Disposition: inline

<!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <h1>Hello world?</h1>
    <p>Services : ${service}</p>
    <p>TotalServices : ${totalaService}</p>
  </body>
</html>

--boundary-string--
EOF`
exec(curlSend, (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log(`stdout: ${stdout}`);
   console.log(`stderr: ${stderr}`);
  }
});