// require('dotenv').config()
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
const app = express();
import connectDB from "./db/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Review from "./models/Review.js";
import Cart from "./models/Cart.js";
import Wishlist from "./models/Wishlist.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// const extractUserIdMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     console.error('No Authorization header provided');
//     return res.status(401).json({ error: 'No Authorization header provided' });
//   }

//   const parts = authHeader.split(' ');

//   if (parts.length !== 2 || parts[0] !== 'Bearer') {
//     console.error('Authorization header is not in the correct format');
//     return res.status(401).json({ error: 'Authorization header is not in the correct format' });
//   }

//   const token = parts[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     console.log('User ID:', req.userId);
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.status(401).json({ error: 'Invalid token' });
//   }

//   next();
// };

// const getUserIdFromLocalStorage = () => {
//   return localStorage.getItem('user');
// };

app.get("/", (req, res) => {
  res.json({ message: "backend connected!" });
});

// app.listen(process.env.PORT, () => {
//   console.log(`Example app listening on port ${process.env.PORT}`)
// })

app.post("/signup", async (req, res) => {
  // Assuming your User model is properly defined and imported
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User added successfully" });
    })
    .catch((error) => {
      if (error.code === 11000) {
        // Duplicate key violation for the 'email' field
        res.status(400).json({ message: "Email already exists" });
      } else {
        // Other errors
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
});

app.get("/filter", async (req, res) => {
  const filteredData = await Product.find(req.query);
  res.json(filteredData);
});
app.get("/pagination", async (req, res) => {
  const users = await Product.find();
  res.json(users);
  console.log(users);
});

app.post("/addproduct", async (req, res) => {
  // Assuming your User model is properly defined and imported
  try {
    // Extract product details from the request body
    const {
      name,
      description,
      price,
      quantityAvailable,
      images,
      category,
      gender,
    } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      name,
      description,
      price,
      quantityAvailable,
      images,
      category,
      gender,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken: token, userId: user._id });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

app.post("/addreview", async (req, res) => {
  try {
    const { product, user, stars, head, desc, fit } = req.body;

    const newReview = new Review({
      product,
      user,
      stars,
      head,
      desc,
      fit,
    });

    const savedReview = await newReview.save();

    res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/findreviews", async (req, res) => {
  const filteredData = await Review.find(req.query).populate("user");
  res.json(filteredData);
});

app.post("/add-to-cart", async (req, res) => {
  try {
    const { productId, UserId, quantity } = req.body;
    console.log(req.body);
    console.log("ProductId:", productId);
    console.log("Quantity:", quantity);
    console.log("UserId:", UserId);

    if (!UserId) {
      return res.status(400).json({ error: "User ID not found" });
    }

    let cart = await Cart.findOne({ user: UserId });

    if (!cart) {
      cart = new Cart({ user: UserId, items: [] });
    }

    const existingItem = cart.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += quantity || 1;
    } else {
      // If the product is not in the cart, add it
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/cart", async (req, res) => {
  try {
    // Ensure that req.userId is available (user is authenticated)
    if (!req.query.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the cart for the authenticated user
    const cart = await Cart.findOne({ user: req.query.userId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.json({ items: [] }); // If the cart is empty
    }

    res.json({ items: cart.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/add-to-wishlist", async (req, res) => {
  try {
    const { productId, UserId, quantity } = req.body;
    console.log(req.body);
    console.log("ProductId:", productId);
    console.log("Quantity:", quantity);
    console.log("UserId:", UserId);

    if (!UserId) {
      return res.status(400).json({ error: "User ID not found" });
    }

    let wishlist = await Wishlist.findOne({ user: UserId });

    if (!wishlist) {
      wishlist = new Wishlist({ user: UserId, items: [] });
    }

    const existingItem = wishlist.items.find((item) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      // If the product is already in the wishlist, update the quantity
      existingItem.quantity += quantity || 1;
    } else {
      // If the product is not in the wishlist, add it
      wishlist.items.push({ product: productId, quantity: quantity || 1 });
    }

    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/wishlist", async (req, res) => {
  try {
    // Ensure that req.userId is available (user is authenticated)
    if (!req.query.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the cart for the authenticated user
    const wishlist = await Wishlist.findOne({
      user: req.query.userId,
    }).populate("items.product");

    if (!wishlist) {
      return res.json({ items: [] }); // If the wishlist is empty
    }

    res.json({ items: wishlist.items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/testlog", authenticateToken, async (req, res) => {
  res.json("route can be accessed");
});

app.delete("/remove-from-cart", async (req, res) => {
  try {
    const { productId, UserId } = req.body;

    if (!UserId) {
      return res.status(400).json({ error: "User ID not found" });
    }

    let cart = await Cart.findOne({ user: UserId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Remove the product from the cart items array
    cart.items = cart.items.filter((item) => !item.product.equals(productId));
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});