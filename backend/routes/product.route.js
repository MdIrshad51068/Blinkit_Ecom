import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {getAdminproducts, getAllproducts, getproductById, postproduct } from "../controllers/product.controller.js";

const router = express.Router();

router.route("/post").post( isAuthenticated,postproduct);
router.route("/get").get(isAuthenticated, getAllproducts);
router.route("/getadminproducts").get(isAuthenticated, getAdminproducts);
router.route("/get/:id").get(isAuthenticated, getproductById);

export default router;

