const Inventory = require("../models/inventory.js");
const Transaction = require("../models/transactions.js");

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

  const inventory = new Inventory({
    productName,
    productPrice,
    category,
    quantity,
    description,
    petType,
    image: req.file.filename,
  });

  await inventory.save();
  res.redirect("/shop");
};

const search = async (req, res) => {
  query = {};
  if (req.body.search) {
    const productName = req.body.search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    query.productName = { $regex: "\\b" + productName + "\\b", $options: "i" };
  }
  let category;
  let petType;
  if (req.body.cat_1) {
    category = "cat_1";
  } else if (req.body.cat_2) {
    category = "cat_2";
  } else if (req.body.cat_3) {
    category = "cat_3";
  }
  let petTypes = [];
  if (req.body.type_cats) {
    petTypes.push("cats");
  }
  if (req.body.type_dogs) {
    petTypes.push("dogs");
  }
  if (req.body.type_rabbits) {
    petTypes.push("rabbits");
  }

  const productPrice = parseInt(req.body.price);
  query.productPrice = { $lte: productPrice };

  if (category) {
    query.category = category;
  }

  if (petTypes.length > 0) {
    query.petType = { $in: petTypes };
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
  res.render(`items`, {
    title: "item",
    username: username,
    item,
    errorMessages: req.flash("error"),
    successMessages: req.flash("success"),
  });
};

const transaction = async (req, res) => {
  const username = req.session.username;
  const productId = req.body.productId;
  const productPrice = req.body.productPrice;
  const category = req.body.category;
  const petType = req.body.petType;
  const quantity = parseInt(req.body.qty);
  const stock = req.body.stock;

  const new_quantity = stock - quantity;

  const totalPrice = quantity * productPrice;
  if (quantity > stock) {
    req.flash("error", "Quantity out of stock");
    return res.redirect(`/items?id=${productId}`);
  }

  const transaction = new Transaction({
    username,
    productId,
    productPrice,
    category,
    quantity,
    petType,
    totalPrice,
  });

  await transaction.save();
  await Inventory.findOneAndUpdate(
    { _id: productId },
    { quantity: new_quantity }
  );
  req.flash("success", "Transaction completed successfully");
  res.redirect(`/items?id=${productId}`);
};

module.exports = {
  shop_page,
  addInventory_page,
  addInventory,
  search,
  items,
  transaction,
};
