import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addtocart, getcustomerOfproducts, getCartProducts, updateStatus ,removeProductFromCart} from "../controllers/cart.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, addtocart);
router.route("/get").get(isAuthenticated, getCartProducts);//---
router.route("/:id/applicants").get(isAuthenticated, getcustomerOfproducts);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
router.route("/remove/:id").delete( isAuthenticated, removeProductFromCart);

 

export default router;

