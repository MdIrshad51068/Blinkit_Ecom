import { Product } from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


// admin post krega product
export const postproduct = async (req, res) => {
  try {
    const { productName, description, price, category, stock } = req.body;
    const userId = req.id;
    const file = req.file;
    console.log("fileUri", file);
    const fileUri = getDataUri(file);

    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    if (!productName || !description || !price || !category || !stock) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }
    if (!fileUri) {
      return res.status(400).json({
        message: "Product image is required.",
        success: false,
      });
    }
    const createdProduct = await Product.create({
      productName,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      created_by: userId,
      photo: cloudResponse.secure_url,
    });
    return res.status(201).json({
      message: "New product created successfully.",
      product: createdProduct,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while creating product.",
      success: false,
    });
  }
};




// student k liye
export const getAllproducts = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { productName: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]
    };
    const products = await Product.find(query).sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({
        message: "products not found.",
        success: false
      })
    };
    return res.status(200).json({
      products,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}




// student
export const getproductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate({
      path: 'carts',
      options: { sort: { createdAt: -1 } }
    });
    console.log("ooooooooooo", product)

    if (!product) {
      return res.status(404).json({
        message: "products not found.",
        success: false
      })
    };
    return res.status(200).json({ product, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while geting product.",
      success: false,
    });
  }
}

