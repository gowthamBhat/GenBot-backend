const express = require('express')
const router = express.Router()
const Candidate = require('../models/candidate')

router.get('/', async (req, res) => {
  console.log('req from invite route', req)

  try {
    let submissions = await Candidate.find({ status: 'submitted' }).sort({
      createdAt: 1
    })

    res.status(200).send(submissions)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
