const express = require('express')
const cors = require('cors')

const app = express()
const morgan = require('morgan')

const MailRoute = require('./routes/MailRoute')
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

// const dataBaseUrl = 'mongodb://localhost:27017/foodies' //! need to be saved in ENV-VAR
// mongoose
//   .connect(dataBaseUrl)
//   .then(() => {
//     console.log(`connected to ${dataBaseUrl}`)
//   })
//   .catch((err) => {
//     console.log('error encounterd', err)
//   })

app.get('', (req, res) => {
  res.send('welcome bot')
})

const port = process.env.PORT || 8000
app.listen(port, (error) => {
  if (error) console.log(error)

  console.log(`listing on port ${port}...`)
})
