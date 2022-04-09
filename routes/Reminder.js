const express = require('express')
const { Reminder } = require('../MailHandler/Mail')
const router = express.Router()
const Candidate = require('../models/candidate')

router.get('/', async (req, res) => {
  try {
    let submissions = await Candidate.find(
      { status: 'invited' },
      { email: 1, firstname: 1 }
    ).sort({
      createdAt: 1
    })
    // console.log(submissions)

    const allMails = submissions.map((x) => x.email)
    console.log(allMails)

    let reminder = await Reminder(allMails)
    console.log(reminder)

    res.status(200).send(submissions)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
