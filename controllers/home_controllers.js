const Users = require("../models/users.js");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  res.render("home", { title: "Home", username: req.session.username });
};

const login_page = (req, res) => {
  res.render("login", {
    title: "login page",
    messages: req.flash("error"),
  });
};

const login = async (req, res) => {
  const username = req.body.username;
  const PlaintextPassword = req.body.password;
  const user = await Users.findOne({ username });

  if (user) {
    const passwordMatch = await bcrypt.compare(
      PlaintextPassword,
      user.password
    );

    if (passwordMatch) {
      req.session.username = user.username;
      res.redirect("/");
    } else {
      req.flash("error", "Password is incorrect");
      res.redirect("/login");
    }
  } else {
    req.flash("error", "This username doesn't exist");
    res.redirect("/login");
  }
};

const register_page = (req, res) => {
  res.render("register", { title: "Register", messages: req.flash("error") });
};

const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const Plaintextpassword = req.body.password;
  const confirmPassword = req.body.confirm;

  const existingUser = await Users.findOne({ username });

  if (existingUser) {
    req.flash("error", "Username already taken");
    res.redirct("register");
  } else if (Plaintextpassword !== confirmPassword) {
    req.flash("error", "passwords don't match");
  } else {
    if (Plaintextpassword.length < 8) {
      req.flash("error", "Password must be more than 8 letters");
    } else {
      const password = await bcrypt.hash(Plaintextpassword, 10);

      const user = new Users({ username, email, password });
      await user.save();

      console.log("user signed up successfully...");
      res.redirect("login");
    }
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("loggod out");
      res.redirect("/login");
    }
  });
};

module.exports = { home, login_page, login, register_page, register, logout };
