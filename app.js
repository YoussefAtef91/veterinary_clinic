const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const Auth = require("./middlewares/auth");
const multer = require("multer");

const {
  home,
  login_page,
  login,
  register_page,
  register,
  logout,
} = require("./controllers/home_controllers.js");

const {
  appointment_page,
  appointment,
  showAppointments,
} = require("./controllers/appointment_controller.js");

const {
  shop_page,
  addInventory_page,
  addInventory,
  search,
  items,
  transaction,
} = require("./controllers/shop_controllers.js");

const {
  lost_page,
  found_page,
  post_page,
  post,
  contact,
} = require("./controllers/lostandfound_controller.js");

const app = express();
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    coookie: {
      maxAge: Infinity,
    },
  })
);
app.use(flash());

//Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/inventory_images");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log(filename);
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

//Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/clinic")
  .then(() => {
    console.log("db connected...");
  })
  .catch((err) => console.log(err));

//Get requests
app.get("/", Auth, home);
app.get("/login", Auth, login_page);
app.get("/register", Auth, register_page);
app.get("/appointment", Auth, appointment_page);
app.get("/showAppointments", Auth, showAppointments);
app.get("/shop", Auth, shop_page);
app.get("/addInventory", Auth, addInventory_page);
app.get("/items", Auth, items);
app.get("/lost", lost_page);
app.get("/found", found_page);
app.get("/post", Auth, post_page);

//Post requests
app.post("/login", Auth, login);
app.post("/register", Auth, register);
app.post("/logout", Auth, logout);
app.post("/appointment", Auth, appointment);
app.post("/addInventory", upload.single("image"), addInventory);
app.post("/search", Auth, search);
app.post("/transaction", Auth, transaction);
app.post("/post", upload.single("image"), post);
app.post("/contact", contact);

const handle404 = (req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
};
app.use(handle404);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
