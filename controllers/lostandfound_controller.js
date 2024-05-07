const lost_page = (req, res) => {
  res.render("lost", { title: "Lost", username: req.session.username });
};

const found_page = (req, res) => {
  res.render("found", { title: "Found", username: req.session.username });
};

module.exports = { lost_page, found_page };
