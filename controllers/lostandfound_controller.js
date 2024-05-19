const Missing = require("../models/missing.js");
const moment = require("moment");

const lost_page = async (req, res) => {
  const missings = await Missing.find({ status: "missing" });
  res.render("lost", {
    title: "Lost",
    username: req.session.username,
    missings,
    moment,
  });
};

const found_page = (req, res) => {
  res.render("found", { title: "Found", username: req.session.username });
};

const post_page = (req, res) => {
  res.render("post", { title: "Post", username: req.session.username });
};

const post = async (req, res) => {
  const petName = req.body.petName;
  const postOwner = req.session.username;
  const petType = req.body.petType;
  const location = req.body.location;
  const status = req.body.status;
  const date = req.body.date;
  const comment = req.body.comment;
  const contactEmail = req.body.contactEmail;
  const contactNumber = req.body.contactNumber;
  const image = req.file.filename;
  const post = new Missing({
    petName,
    postOwner,
    petType,
    location,
    status,
    date,
    comment,
    contactEmail,
    contactNumber,
    image,
  });
  await post.save();
  res.redirect("/post");
};

const contact = async (req, res) => {
  // console.log(req.body);
  const id = req.body.id;
  const missing = await Missing.findOne({ _id: id });
  if (missing) {
    res.render("contact", {
      title: "Contact",
      username: req.session.username,
      missing,
    });
  }
};

module.exports = { lost_page, found_page, post_page, post, contact };
