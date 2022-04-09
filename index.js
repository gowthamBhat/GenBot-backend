const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const morgan = require('morgan')
require('./database/db')()

//* custom routes
const MailRoute = require('./routes/MailRoute')
const InviteRoute = require('./routes/invite')
const Submissions = require('./routes/Submissions')
const Pendings = require('./routes/Pendings')
const Accepted = require('./routes/Accepted')
const Reminder = require('./routes/Reminder')
const Status = require('./routes/Status')

process.on('uncaughtException', (e) => {
  console.log('WE GOT AN UNCAUGHT EXCEPTION')
  console.log(e)

  process.exit(1)
})
process.on('unhandledRejection', (e) => {
  console.log('WE GOT AN UNHANDLED PROMISE')
  console.log(e)

  process.exit(1)
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))
app.use(function timeLogger(req, res, next) {
  let requestTime = new Date()
  requestTime = requestTime.toLocaleTimeString()
  console.log(`REQUEST TIME - ${requestTime}`)
  next()
})

app.use('/uploads', express.static('uploads'))
app.use('/mailroute', MailRoute)
app.use('/invite', InviteRoute)
app.use('/submissions', Submissions)
app.use('/pendings', Pendings)
app.use('/accepted', Accepted)
app.use('/reminder', Reminder)
app.use('/status', Status)

app.get('/', (req, res) => {
  res.send('welcome bot')
})

const port = process.env.PORT || 8000
app.listen(port, (error) => {
  if (error) console.log(error)

  console.log(`listing on port ${port}...`)
})
