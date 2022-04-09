const express = require('express')
const router = express.Router()
const Candidate = require('../models/candidate')

router.get('/:email', async (req, res) => {
  try {
    let submissions = await Candidate.find(
      { email: req.params.email },
      { status: 1, updatedAt: 1, designation: 1 }
    )

    res.status(200).send(submissions)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
