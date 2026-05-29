// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const User = require("./User"); // your schema
// const Cart = require("./Cart");
// const Product = require("./Product");
// //require("dotenv").config();
// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// const Order = require("./Order");
// const app = express();
// app.use(cors());
// app.use(express.json());



// console.log("ENV CHECK:", process.env.EMAIL);

// const multer = require("multer");
// const path = require("path");

// const SibApiV3Sdk = require("sib-api-v3-sdk");

// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// let apiKey = apiInstance.authentications["apiKey"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

// //OTP GENERATING WORK
// //CREATING TRANSPORT
// // const transporter = nodemailer.createTransport({
// //   host: "smtp.gmail.com",
// //  port: 465,
// // secure: true,
 
// //   auth: {
// //     user: process.env.EMAIL,
// //     pass: process.env.EMAIL_PASS
// //   }
// // });
// //GENERATE OTP
// app.use("/uploads", express.static("uploads"));
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// };



// //profile 
// app.get("/api/profile/:id", async (req, res) => {
//   try {

//     const user = await User.findById(req.params.id)
//       .select("-password");

//     res.json(user);

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });








// //testing
// // transporter.verify((error, success) => {
// //   if (error) {
// //     console.log("Email error:", error);
// //   } else {
// //     console.log("Email server is ready");
// //   }
// // });





// app.use(express.json());





// //creating uploads if its not exist
// const fs = require("fs");
// if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

// // Storage location & filename
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });



// const upload = multer({ storage });













// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected Successfully"))
//   .catch((err) => console.log("❌ MongoDB Error:", err));

// // Routes
// // app.post("/api/register", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     // ❌ remove bcrypt hashing
// //     // const hashedPassword = await bcrypt.hash(password, 10);

// //     // ✔ save raw password directly
// //     const newUser = new User({ email, password });

// //     await newUser.save();

// //     res.json({ message: "Registration successful" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Error registering user" });
// //   }
// // });
// //TESTING NEW REGISTER ROUTE
// const pendingUsers = {};  

// app.post("/api/register", async (req,res)=>{
//   try{

//     const { email, password } = req.body;

//     const otp = generateOTP();
//     const otpExpire = new Date(Date.now() + 60000); // 60 sec

//     const newUser = new User({
//       email,
//       password,
//       otp,
//       otpExpire
//     });

//         pendingUsers[email] = {
//       email,
//       password,
//       otp,
//       otpExpire
//     };
//     //await newUser.save();

//     // await transporter.sendMail({
//     //   from: process.env.EMAIL,
//     //   to: email,
//     //   subject: "OTP Verification",
//     //   text: `Your OTP is ${otp}. Valid for 60 seconds.`
//     // });

//     res.json({
//       success:true,
//       message:"OTP sent to email"
//     });

//   }catch(err){
//     console.log(err);
//     res.status(500).json({message:"Server error"});
//   }
// });
// //VERIFY OTP ROUTE

// // app.post("/api/verify-otp", async (req,res)=>{
// //   try{

// //     const { email, otp } = req.body;

// //     const user = await User.findOne({ email });

// //     if(!user){
// //       return res.json({success:false,message:"User not found"});
// //     }

// //     if(user.otp !== otp){
// //       return res.json({success:false,message:"Wrong OTP"});
// //     }

// //     if(new Date() > user.otpExpire){
// //       return res.json({success:false,message:"OTP expired"});
// //     }

// //     user.isVerified = true;
// //     user.otp = null;
// //     user.otpExpire = null;

// //     await user.save();

// //     res.json({
// //       success:true,
// //       message:"Email verified successfully"
// //     });

// //   }catch(err){
// //     res.status(500).json({message:"Server error"});
// //   }
// // });




// app.post("/api/verify-otp", async (req,res)=>{
//    const { email, otp } = req.body;

//    const pendingUser = pendingUsers[email];

//    if(!pendingUser)
//      return res.json({success:false, message:"No pending user"});

//    if(pendingUser.otp !== otp)
//      return res.json({success:false, message:"Wrong OTP"});

//    if(new Date() > pendingUser.otpExpire)
//      return res.json({success:false, message:"OTP expired"});

//    const newUser = new User({
//       email: pendingUser.email,
//       password: pendingUser.password
//    });

//    await newUser.save();

//    delete pendingUsers[email];

//    res.json({success:true, message:"Account created"});
// });



























// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ success: false, message: "Email or password missing" });
//     }

//     // Check if user exists
//     const user = await User.findOne({ email, password });

//     if (!user) {
//       return res.json({ success: false, message: "Invalid email or password" });
//       console.log("not found");
//     }

//     // User exists → login success
//       const token = jwt.sign(
//       { id: user._id },
//       "junaid_secret_key",
//       { expiresIn: "1d" }
//     );

//     return res.json({
//       success: true,
//       message: "Login successful",
//        token,
//       userId: user._id
//     });


//     //return res.json({ success: true, message: "Login successful" });
//   } catch (err) {
//     console.log("Login Error:", err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // app.post("/api/cart/add", async (req, res) => {
// //   try {
// //     const { userId, productId, name, price, image, quantity } = req.body;

// //     if (!userId || !productId) {
// //       return res.status(400).json({ success: false, message: "Missing data" });
// //     }

// //     // Check if product already exists in cart
// //     const existingItem = await Cart.findOne({ userId, productId });
// //     if (existingItem) {
// //       // Increase quantity if already exists
// //       existingItem.quantity += quantity;
// //       await existingItem.save();
// //       return res.json({ success: true, message: "Cart updated", item: existingItem });
// //     }

// //     // Add new product
// //     const newCartItem = new Cart({ userId, productId, name, price, image, quantity });
// //     await newCartItem.save();

// //     res.json({ success: true, message: "Product added to cart", item: newCartItem });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });





// // app.post("/api/cart/add", async (req, res) => {
// //   try {

// //     console.log("Auth header:", req.headers.authorization);
// // console.log("Token:", token);
// // console.log("Decoded:", decoded);

// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token) return res.status(401).json({ message: "No token" });

// //     const decoded = jwt.verify(token, "junaid_secret_key");
// //     const userId = decoded.id;

// //     const { product } = req.body;

// //     let cart = await Cart.findOne({ userId });
// //     if (!cart) {
// //       cart = new Cart({ userId, items: [] });
// //     }

// //     const exist = cart.items.find(i => i.productId === product.productId);
// //     if (exist) exist.quantity += 1;
// //     else cart.items.push(product);

// //     await cart.save();

// //     res.json({ success: true, cart });

// //   } catch (err) {
// //     console.log("JWT Error:", err.message);
// //     res.status(401).json({ message: "Invalid token" });
// //   }
// // });




// app.post("/api/cart/add", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     const decoded = jwt.verify(token, "junaid_secret_key");
//     const userId = decoded.id;

//     const { productId, name, price, image, quantity } = req.body;
//     if (!productId) return res.status(400).json({ message: "productId required" });

//     // Find existing cart or create new
//     let cart = await Cart.findOne({ userId });
//     if (!cart) cart = new Cart({ userId, items: [] });

//     // Make sure items array contains only valid objects
//     cart.items = cart.items.filter(i => i && i.productId);

//     // Check if product already exists
//     const exist = cart.items.find(i => i.productId === productId);
//     if (exist) exist.quantity += quantity || 1;
//     else cart.items.push({ productId, name, price, image, quantity: quantity || 1 });

//     await cart.save();

//     res.json({ success: true, cart });
//   } catch (err) {
//     console.log("JWT Error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// app.post("/api/cart/delete", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     const decoded = jwt.verify(token, "junaid_secret_key");
//     const userId = decoded.id;

//     const { productId } = req.body;
//     if (!productId) return res.status(400).json({ message: "productId required" });

//     // Find the user's cart
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     // Remove the item
//     cart.items = cart.items.filter(item => item.productId !== productId);

//     await cart.save();

//     res.json({ success: true, cart });
//   } catch (err) {
//     console.log("JWT Error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });


// app.delete("/api/cart/delete/:productId", async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ message: "No token" });

//     const token = authHeader.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     const decoded = jwt.verify(token, "junaid_secret_key");
//     const userId = decoded.id;

//     const { productId } = req.params; // <-- get from URL
//     if (!productId) return res.status(400).json({ message: "productId required" });

//     // Find user's cart
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     // Remove the item
//     cart.items = cart.items.filter(item => item.productId !== productId);

//     await cart.save();

//     res.json({ success: true, cart });
//   } catch (err) {
//     console.log("JWT Error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });














// app.get("/api/product/search", async (req, res) => {
//   try {
//     const query = req.query.q;

//     const products = await Product.find({
//       name: { $regex: query, $options: "i" }
//     });

//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: "Search failed" });
//   }
// });


// app.get("/api/cart", async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token" });

//     const decoded = jwt.verify(token, "junaid_secret_key");
//     const userId = decoded.id;

//     const cart = await Cart.findOne({ userId }); // now this works
//     res.json({ success: true, cart: cart || { items: [] } });

//   } catch (err) {
//     console.log("JWT Error:", err.message);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });






// app.get("/api/products", async (req, res) => {
//   try {
//     if (!Product) {
//       return res.status(500).json({ message: "Product model not loaded" });
//     }

//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     console.error("REAL ERROR:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

// app.get("/api/product/:id", async (req, res) => {

//   const product = await Product.findById(req.params.id);

//   res.json(product);
// });











// app.use("./uploads", express.static("uploads"));

// app.post("/api/products", upload.single("image"), async (req, res) => {
//   try {
//     const { name, price, description } = req.body;

//     if (!name || !price) {
//       return res.status(400).json({ message: "Name and price are required" });
//     }

//     // If a file was uploaded, save the path; otherwise null
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     const newProduct = new Product({
//       name,
//       price,
//       description,
//       image,
//     });

//     await newProduct.save();
//     res.status(201).json(newProduct);

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to add product" });
//   }
// });





// app.delete("/api/products/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ message: "Product deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete product" });
//   }
// });

// app.get("/test", (req, res) => {
//   res.json({ message: "Server is working" });
// });



// const authMiddleware = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token" });
//   }

//   try {
//     const decoded = jwt.verify(token, "junaid_secret_key");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };




// //order api
// // app.post("/api/order", authMiddleware, async (req, res) => {
// //   try {
// //     const { name, phone, address } = req.body;

// //     const userId = req.user.id;

// //     const cart = await Cart.findOne({ userId }).populate("items.productId");

// //     if (!cart || cart.items.length === 0) {
// //       return res.status(400).json({ message: "Cart is empty" });
// //     }

// //     // 📧 Email setup
// //     const transporter = nodemailer.createTransport({
// //       service: "gmail",
// //       auth: {
// //         user: process.env.EMAIL,
// //         pass: process.env.EMAIL_PASS
// //       }
// //     });

// //     let message = `
// // New Order Received:

// // Name: ${name}
// // Phone: ${phone}
// // Address: ${address}

// // Items:
// // `;

// //     cart.items.forEach(item => {
// //       message += `${item.productId.name} - Qty: ${item.quantity}\n`;
// //     });

// //     await transporter.sendMail({
// //       from: "yourgmail@gmail.com",
// //       to: "yourgmail@gmail.com",
// //       subject: "New Order - Junaid Store",
// //       text: message
// //     });

// //     // 🛒 Clear cart
// //     cart.items = [];
// //     await cart.save();

// //     res.json({ message: "Order placed successfully!" });

// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });




// // app.post("/api/order", authMiddleware, async (req, res) => {
// //   try {
// //     const { address, phone } = req.body;
// //     const userId = req.user.id;

// //     const cart = await Cart.findOne({ userId });

// //     if (!cart || cart.items.length === 0) {
// //       return res.status(400).json({ message: "Cart empty" });
// //     }

// //     const total = cart.items.reduce(
// //       (acc, item) => acc + item.price * item.quantity,
// //       0
// //     );

// //     const newOrder = new Order({
// //       userId,
// //       items: cart.items,
// //       totalAmount: total,
// //       address,
// //       phone
// //     });

// //     await newOrder.save();

// //     // Clear cart
// //     cart.items = [];
// //     await cart.save();

// //     res.json({ message: "Order placed successfully!" });

// //   } catch (err) {
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// app.post("/api/order", authMiddleware, async (req, res) => {
//   try {
//     const { address, phone, items } = req.body; // 🔥 selected items
//     const userId = req.user.id;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items selected" });
//     }

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(400).json({ message: "Cart not found" });
//     }

//     // calculate total
//     const total = items.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );

//     const newOrder = new Order({
//       userId,
//       items: items,
//       totalAmount: total,
//       address,
//       phone
//     });

//     await newOrder.save();

//     // 🔥 remove ordered items from cart
//     cart.items = cart.items.filter(
//       cartItem => !items.some(orderItem => orderItem._id == cartItem._id)
//     );

//     await cart.save();

//     res.json({ message: "Order placed successfully!" });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });











// app.get("/api/orders/my", authMiddleware, async (req, res) => {
//   try {
//     // ⚠ Use userId to match the logged-in user
//     const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.json(orders);
//     console.log("Logged-in userId:", req.user.id);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// app.get("/api/orders", async (req, res) => {
//   try {
//     // Fetch all orders, newest first
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//     console.log("All orders fetched:", orders.length);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });






// app.put("/api/orders/:id/status", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id);
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // Toggle status or set to delivered
//     order.status = "Delivered";
//     await order.save();

//     res.json(order);
//     console.log(`Order ${id} status updated to Delivered`);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });




// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./User");
const Cart = require("./Cart");
const Product = require("./Product");
const jwt = require("jsonwebtoken");
const Order = require("./Order");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// BREVO EMAIL SDK
// const SibApiV3Sdk = require("sib-api-v3-sdk");

// let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// let apiKey = apiInstance.authentications["apiKey"];
// apiKey.apiKey = process.env.BREVO_API_KEY;

const SibApiV3Sdk = require("sib-api-v3-sdk");

let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;


let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();



const app = express();













app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

console.log("ENV CHECK:", process.env.EMAIL);

// =======================
// OTP SYSTEM
// =======================

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const pendingUsers = {};

// =======================
// MONGODB
// =======================

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

//CLOUDINARYYY
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;








const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// PASSPORT GOOGLE SETUP
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const googleId = profile.id;
    const avatar = profile.photos[0].value;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.avatar = avatar;
        user.isVerified = true;
        await user.save();
      }
    } else {
      user = await User.create({ email, googleId, avatar, isVerified: true });
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

app.use(passport.initialize());

// GOOGLE ROUTES
app.get("/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"], session: false })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "https://kkllkk.netlify.app/login", session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },       // "id" to match your existing pattern
      "junaid_secret_key",         // same secret as your login
      { expiresIn: "1d" }          // same expiry as your login
    );
    res.redirect(`http://localhost:5173/auth/success?token=${token}&userId=${req.user._id}`);
  }
);











//tr order
app.get("/api/order/track/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Invalid Order ID" });
  }
});




// =======================
// PROFILE
// =======================
app.get("/api/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// =======================
// REGISTER (OTP SEND VIA BREVO)
// =======================
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 60000);

    pendingUsers[email] = {
      email,
      password,
      otp,
      otpExpire
    };

    // SEND OTP EMAIL
    await apiInstance.sendTransacEmail({
      sender: {
        email: "jahidjunaid99@gmail.com",
        name: "Your App"
      },

      to: [
        {
          email: email
        }
      ],

      subject: "OTP Verification",

      textContent: `Your OTP is ${otp}. Valid for 60 seconds.`
    });
  
    console.log("BREVO KEY:", process.env.BREVO_API_KEY);
console.log("Sending OTP:", otp);
console.log("To:", email);
    res.json({
      success: true,
      message: "OTP sent to email"
    });

  } catch (err) {
    console.log(
      "REGISTER ERROR:",
      err.response?.body || err.message || err
    );

    res.status(500).json({
      message: "Server error"
    });
  }
});
//verify otp
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // CHECK PENDING USER
    const pendingUser = pendingUsers[email];

    if (!pendingUser) {
      return res.status(400).json({
        success: false,
        message: "No pending user found"
      });
    }

    // CHECK OTP EXPIRATION
    if (new Date() > pendingUser.otpExpire) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    // CHECK OTP
    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Wrong OTP"
      });
    }

    // CREATE USER
    const newUser = new User({
      email: pendingUser.email,
      password: pendingUser.password
    });

    await newUser.save();

    // REMOVE TEMP USER
    delete pendingUsers[email];

    // SIGN JWT
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Account created successfully",
      token  // send token to frontend
    });

  } catch (err) {
    console.log("VERIFY OTP ERROR:", err.response?.body || err.message || err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});
// =======================
// LOGIN
// =======================

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "junaid_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      userId: user._id
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// =======================
// JWT MIDDLEWARE
// =======================

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "junaid_secret_key");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// =======================
// CART APIs
// =======================

app.post("/api/cart/add", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "junaid_secret_key");
    const userId = decoded.id;

    const { productId, name, price, image, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const exist = cart.items.find(i => i.productId === productId);

    if (exist) exist.quantity += quantity || 1;
    else cart.items.push({ productId, name, price, image, quantity: quantity || 1 });

    await cart.save();

    res.json({ success: true, cart });

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// DELETE CART ITEM
app.delete("/api/cart/delete/:productId", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "junaid_secret_key");

    const cart = await Cart.findOne({ userId: decoded.id });

    cart.items = cart.items.filter(i => i.productId !== req.params.productId);

    await cart.save();

    res.json({ success: true, cart });

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// GET CART
app.get("/api/cart", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, "junaid_secret_key");

    const cart = await Cart.findOne({ userId: decoded.id });

    res.json({ success: true, cart: cart || { items: [] } });

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// =======================
// PRODUCTS
// =======================

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

// ============================================================
// REPLACE your existing GET /api/products route in server.js
// with this one — supports ?type=shirt&category=Men&limit=8
// ============================================================

app.get("/api/products", async (req, res) => {
  try {
    console.log("========== PRODUCTS API HIT ==========");
    console.log("Full Query:", req.query);

    const filter = {};

    if (req.query.type) {
      filter.type = req.query.type;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    console.log("Mongo Filter:", filter);

    const limit = parseInt(req.query.limit) || 100;

    console.log("Limit:", limit);

    const products = await Product.find(filter)
      .limit(limit)
      .sort({ createdAt: -1 });

    console.log("Products Found:", products.length);

    if (products.length > 0) {
      console.log("Newest Product:");
      console.log({
        name: products[0].name,
        createdAt: products[0].createdAt,
      });

      console.log("Oldest Product:");
      console.log({
        name: products[products.length - 1].name,
        createdAt: products[products.length - 1].createdAt,
      });
    }

    console.log("=====================================");

    res.json(products);

  } catch (err) {
    console.error("PRODUCT FETCH ERROR:");
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch products",
      error: err.message,
    });
  }
});
app.get("/api/product/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});



app.post("/api/products", upload.single("image"), async (req, res) => {
  try {

    const {
      name,
      price,
      description,
      category,
      type
    } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const product = new Product({
      name,
      price,
      description,
      category,
      type,
      image
    });

    await product.save();

    res.json(product);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to add product"
    });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// =======================
// ORDERS
// =======================

app.post("/api/order", async (req, res) => {
  try {
    const { address, phone, items, guestName, guestEmail } = req.body;

    // Try to get userId from token if present — don't block if missing
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, "junaid_secret_key");
        userId = decoded.id;
      } catch {
        // invalid/expired token → treat as guest
      }
    }

    const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const order = new Order({
      userId,                              // null if guest
      guestName: userId ? null : guestName,
      guestEmail: userId ? null : guestEmail,
      items,
      totalAmount: total,
      address,
      phone
    });

    await order.save();

    res.json({ success: true, message: "Order placed successfully!", order });

  } catch (err) {
    console.log("ORDER ERROR:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/orders/my", authMiddleware, async (req, res) => {
  try {
    // ⚠ Use userId to match the logged-in user
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
    console.log("Logged-in userId:", req.user.id);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
});    


// =======================
// START SERVER
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});