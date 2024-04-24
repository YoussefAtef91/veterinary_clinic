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
} = require("./controllers/shop_controllers.js");

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
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });
app.use(upload.single("image"));
mongoose
  .connect("mongodb://127.0.0.1:27017/clinic")
  .then(() => {
    console.log("db connected...");
  })
  .catch((err) => console.log(err));

app.get("/", Auth, home);
app.get("/login", Auth, login_page);
app.get("/register", Auth, register_page);
app.get("/appointment", appointment_page);
app.get("/showAppointments", showAppointments);
app.get("/shop", shop_page);
app.get("/addInventory", addInventory_page);
app.get("/items", items);

app.post("/login", login);
app.post("/register", register);
app.post("/logout", logout);
app.post("/appointment", appointment);
app.post("/addInventory", upload.single("image"), addInventory);
app.post("/search", search);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
