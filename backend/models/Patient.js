const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  tokenNo: {
    type: Number,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "waiting"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Patient", patientSchema);