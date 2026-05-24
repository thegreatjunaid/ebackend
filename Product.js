// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: String,
//     image: String,
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    type: String,
  },

  // MEN / WOMEN
  category: {
    type: String,
    enum: ["Men", "Women"],
    required: true,
  },

  // PRODUCT TYPE
  type: {
    type: String,
    enum: [
      // MEN
      "shirt",
      "pant",
      "t-shirt",
      "hoodie",
      "jacket",

      // WOMEN
      "saree",
      "three-piece",
      "kurti",
      "lehenga",

      // BOTH
      "shoes",
      "bags",
      "accessories"
    ],
    required: true,
  },

  stock: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);