const express = require('express')
const router = express.Router()
const Candidate = require('../models/candidate')
const { inviter } = require('../MailHandler/Mail')
router.post('/', async (req, res) => {
  console.log('req from invite route', req)

  try {
    let invitation = new Candidate({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      lastdatetosubmit: req.body.lastdate,
      requiredDocs: req.body.requiredDocs,
      designation: req.body.designation
    })

    let aknowladgement = await inviter(invitation)
    invitation = await invitation.save()
    res.status(200).send(aknowladgement)
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
