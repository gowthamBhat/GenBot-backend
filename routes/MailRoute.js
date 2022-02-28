const express = require('express')

const multer = require('multer')
const Sender = require('../MailHandler/Mail')
const router = express.Router()
const stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '__' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(null, false) //i can throw any error message here, if the file type is unknown
    //insted of null i can pass new Error('error mesage')
  }
}

const upload = multer({
  storage: stroage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10mb
  },

  fileFilter: fileFilter
})
let uploadMultile = upload.fields([{ name: 'pdfFile', maxCount: 15 }])

router.post('/', uploadMultile, async (req, res) => {
  try {
    let aknowladgement = await Sender(req.files)
    res.status(200).send({ process: 'success', akn: aknowladgement })
  } catch (err) {
    console.log(err)

    res.status(400).send('something went wrong while saving the file')
  }
})

module.exports = router
