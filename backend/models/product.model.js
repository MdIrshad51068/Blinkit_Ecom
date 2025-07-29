import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    default: ""
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    }
  ]
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
