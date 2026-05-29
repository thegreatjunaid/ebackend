const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,  // ← optional now
    default: null
  },

  // Guest info (only filled if not logged in)
  guestName: {
    type: String,
    default: null
  },
  guestEmail: {
    type: String,
    default: null
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    default: "Pending"
  },

  address: String,
  phone: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);