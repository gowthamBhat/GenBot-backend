const nodemailer = require('nodemailer')
const path = require('path')
require('dotenv').config()

async function Sender(files) {
  const pathFilledArray = files.pdfFile.map((x) => {
    return {
      filename: x.filename,
      path: path.join(__dirname, '../uploads/' + x.filename)
    }
  })

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

    auth: {
      user: process.env.GMAIL_USERNAME, // generated ethereal user
      pass: process.env.GMAIL_PASSWORD // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.GMAIL_USERNAME, // sender address
    to: 'gowthambhat1998@gmail.com', // list of receivers
    subject: 'pdf files been sent', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>check attachment</b>', // html body,
    attachments: pathFilledArray
    //   path: path.join(__dirname, '../uploads/1646051753505--Online Shopping use case.pdf')
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return info.messageId
}

// function checkPath(files) {
//   const pathFilledArray = files.pdfFile.map((x) => {
//     return { path: '../uploads/' + x.filename }
//   })
//   console.log(pathFilledArray)
// }
// Sender().catch(console.error)

module.exports = Sender
