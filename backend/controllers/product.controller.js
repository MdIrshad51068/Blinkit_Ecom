import { Product } from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";


// admin post krega product
export const postproduct = async (req, res) => {
  try {
    const { productName, description, price, category, stock } = req.body;
    const userId = req.id;

    if (!productName || !description || !price || !category || !stock) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required.",
        success: false,
      });
    }

    const fileUri = getDataUri(req.file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const createdProduct = await Product.create({
      productName,
      description,
      price: Number(price),
      category,
      stock: Number(stock),
      created_by: userId,
      Photo: cloudResponse.secure_url,
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
        const products = await product.find(query).sort({ createdAt: -1 });
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
        const product = await product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "products not found.",
                success: false
            })
        };
        return res.status(200).json({ product, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminproducts = async (req, res) => {
    try {
        const adminId = req.id;
        const products = await product.find({ created_by: adminId }).sort({
            createdAt:-1
        });
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
