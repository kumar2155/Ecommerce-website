const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const { stringify } = require("querystring");
const { type } = require("os");
const { default: Stripe } = require("stripe");
require("dotenv").config(); // Load environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(process.env.STRIPE_SECRET_KEY);
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://kumarswamy:9731203309@cluster0.9pxnb.mongodb.net/ecommerce"
  )
  .then(console.log("mongo connected"));

app.get("/", (req, res) => {
  res.send("express is running on server");
});

//create image storage
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//create schema
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

//create api adding product
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id = 1;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let las_product = last_product_array[0];
    id = las_product.id + 1;
  } else {
    id: 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: 1,
    name: req.body.name,
  });
});

//create api removing product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: 1,
    name: req.body.name,
  });
});

//creating api for get all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log(products);
  console.log("all products are fetched");
  res.send(products);
});

//create schema for user model
const users = mongoose.model("users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartdata: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating endpoint for register user
app.post("/signup", async (req, res) => {
  let check = await users.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "existing users found" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartdata: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//create endpoint forlogin
app.post("/login", async (req, res) => {
  let user = await users.findOne({ email: req.body.email });
  if (user) {
    const passcompare = req.body.password === user.password;
    if (passcompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong_password" });
    }
  } else {
    res.json({ success: false, errors: "wrong_emailid" });
  }
});

//create endpoint for newcollections
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollections = products.slice(1).slice(-8);
  console.log("newccollwction fetched");
  res.send(newcollections);
});

//create endpoint for popular
app.get("/popularmen", async (req, res) => {
  let products = await Product.find({ category: "men" });
  let popularinmen = products.slice(0, 4);
  console.log("popular fetched");
  res.send(popularinmen);
});

//creating middleware to fetch user
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please autenticate valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "please authenticatate using valid token" });
    }
  }
};

//creating endpoinnt for add cartdata
app.post("/addtocart", fetchuser, async (req, res) => {
  console.log("added", req.body.itemid);
  let userdata = await users.findOne({ _id: req.user.id });
  userdata.cartdata[req.body.itemid] += 1;
  await users.findOneAndUpdate(
    { _id: req.user.id },
    { cartdata: userdata.cartdata }
  );
  res.send("added");
});

//create endpoint for removing cartdata
app.post("/removefromcart", fetchuser, async (req, res) => {
  console.log("removed", req.body.itemid);
  let userdata = await users.findOne({ _id: req.user.id });
  if (userdata.cartdata[req.body.itemid] > 0)
    userdata.cartdata[req.body.itemid] -= 1;
  await users.findOneAndUpdate(
    { _id: req.user.id },
    { cartdata: userdata.cartdata }
  );
  res.send("added");
});

//create endpoint for get cartdata
app.post("/getcart", fetchuser, async (req, res) => {
  console.log("getcart");
  let userdata = await users.findOne({ _id: req.user.id });
  res.json(userdata.cartdata);
});
const authMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, "secret_ecom");
    req.user = verified.user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
  }
};

const orderschema = new mongoose.Schema({
  userid: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
});
const orderModel = mongoose.model("Order", orderschema);
const userModel = mongoose.model("users"); // You already defined this as "users" earlier

const placeorder = async (req, res) => {
  const frontend_url = "http://localhost:3000";

  try {
    const neworder = new orderModel({
      userid: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await neworder.save();
    await userModel.findByIdAndUpdate(req.body.userid, { cartdata: {} });

    const line_items = req.body.items.map((item) => ({
      //   let price = Number(item.new_price); // Ensure it's a number

      // if (isNaN(price)) {
      //   console.error(Invalid price for item: ${item.name}, item);
      //   throw new Error(Invalid price for item: ${item.name});
      // }
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.new_price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "delivery charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`,
    });

    res.json({ sucess: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyorder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

//user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userid: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/verify", verifyorder);
orderRouter.post("/userorders", authMiddleware, userOrders);
app.use("/api/order", orderRouter);
app.post("/api/order/place", (req, res) => {
  console.log("Received Order Data:", req.body);
});
app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port" + port);
  } else {
    console.log("error" + error);
  }
});
