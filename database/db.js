const mongoose = require('mongoose')
module.exports = function () {
  const dataBaseUrl = process.env.DB_URL

  mongoose
    .connect(dataBaseUrl)
    .then(() => {
      console.log(`connected to ${dataBaseUrl}`)
    })
    .catch((err) => {
      console.log('error encounterd', err)
    })
}
