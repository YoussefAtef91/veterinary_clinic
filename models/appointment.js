const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    petOwner: {
      type: String,
      require: true,
    },
    petName: {
      type: String,
    },
    petType: {
      type: String,
      require: true,
    },
    petAge: {
      type: Number,
      require: true,
    },
    reason: {
      type: String,
    },
    history: {
      type: String,
    },
    veterinarian: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    time: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Appointments = mongoose.model("Appointments", appointmentSchema);
module.exports = Appointments;
