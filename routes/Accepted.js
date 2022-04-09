const express = require('express')
const { accepter, decliner } = require('../MailHandler/Mail')
const router = express.Router()
const Candidate = require('../models/candidate')

router.get('/', async (req, res) => {
  console.log('req from pendings route', req)

  try {
    let submissions = await Candidate.find({ status: 'accepted' }).sort({
      createdAt: 1
    })

    res.status(200).send(submissions)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})
router.post('/', async (req, res) => {
  try {
    const result = await Candidate.updateOne(
      { email: req.body.email },
      {
        $set: {
          status: `accepted`
        }
      }
    )
    const acceptMail = await accepter(req.body.email, req.body.firstname)

    res.status(200).send(acceptMail)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})
router.post('/reject', async (req, res) => {
  try {
    const result = await Candidate.updateOne(
      { email: req.body.email },
      {
        $set: {
          status: `rejected`
        }
      }
    )

    const acceptMail = await decliner(req.body.email, req.body.firstname)

    res.status(200).send(acceptMail)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
