const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      default: 'invited'
    },
    requiredDocs: {
      type: String,
      required: true
    },
    designation: {
      type: String
    },

    lastdatetosubmit: {
      type: Date,
      required: true
    },
    docs: []
  },
  { timestamps: true }
)

const Candidate = mongoose.model('candidate', candidateSchema)
module.exports = Candidate
