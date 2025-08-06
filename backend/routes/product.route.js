import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  postproduct,
  getAllproducts,
  getproductById,
} from "../controllers/product.controller.js";

const router = express.Router();

// ✅ POST product with auth and image upload
router.post("/post", isAuthenticated, singleUpload, postproduct);//------
router.get("/get", getAllproducts);//-----
router.get("/get/:id", isAuthenticated, getproductById); //-----

export default router;

