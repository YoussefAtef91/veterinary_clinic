const Inventory = require("../models/inventory.js");

const shop_page = async (req, res) => {
  const inventory = await Inventory.find();
  res.render("shop", {
    title: "shop",
    username: req.session.username,
    inventory,
  });
};

const addInventory_page = async (req, res) => {
  res.render("addInventory", {
    title: "Add Inventory",
    username: req.session.username,
  });
};

const addInventory = async (req, res) => {
  const {
    productName,
    productPrice,
    category,
    quantity,
    description,
    petType,
  } = req.body;
  const image = {
    data: req.file.buffer, // Access the file buffer from req.file
    contentType: req.file.mimetype, // Access the file mimetype from req.file
  };
  const inventory = new Inventory({
    productName,
    productPrice,
    category,
    quantity,
    description,
    petType,
    image,
  });
  await inventory.save();
  res.redirect("/shop");
};

const search = async (req, res) => {
  const productName = req.body.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let category;
  let petType;
  if (req.body.cat_1) {
    category = "cat_1";
  } else if (req.body.cat_2) {
    category = "cat_2";
  } else if (req.body.cat_3) {
    category = "cat_3";
  }

  if (req.body.type_cats) {
    petType = "cats";
  } else if (req.body.type_dogs) {
    petType = "dogs";
  } else if (req.body.type_rabbits) {
    petType = "rabbits";
  }
  const productPrice = parseInt(req.body.price);
  const query = {
    productName: { $regex: "\\b" + productName + "\\b", $options: "i" },
    productPrice: { $lte: productPrice },
  };

  if (category) {
    query.category = category;
  }

  if (petType) {
    query.petType = petType;
  }
  const inventory = await Inventory.find(query);
  res.render("shop", {
    title: "shop",
    username: req.session.username,
    inventory,
  });
};

const items = async (req, res) => {
  const id = req.query.id;
  const username = req.session.username;
  const item = await Inventory.findOne({ _id: id });
  res.render(`items`, { title: "item", username: username, item });
};

module.exports = { shop_page, addInventory_page, addInventory, search, items };
