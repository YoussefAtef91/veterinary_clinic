const Appointment = require("../models/appointment.js");

const appointment_page = (req, res) => {
  res.render("appointments", {
    title: "appointments",
    username: req.session.username,
    messages: req.flash("error"),
  });
};

const appointment = async (req, res) => {
  const petName = req.body.name;
  const petType = req.body.petType;
  const petAge = parseInt(req.body.age);
  const reason = req.body.reason;
  const history = req.body.history;
  const veterinarian = req.body.veterinarian;
  const date = req.body.date;
  const time = parseInt(req.body.time);

  const username = req.session.username;
  const appointment = new Appointment({
    petOwner: username,
    petName,
    petType,
    petAge,
    reason,
    history,
    veterinarian,
    date,
    time,
  });

  appointment.save();
  res.redirect("appointment");
};

const showAppointments = async (req, res) => {
  const username = req.session.usename;
  const appointments = await Appointment.find({ petOwner: username });
  res.render("showAppointments", { title: "show appointments", appointments });
};

module.exports = { appointment_page, appointment, showAppointments };
