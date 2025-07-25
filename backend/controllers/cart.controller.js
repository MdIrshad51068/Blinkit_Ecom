import { cart } from "../models/cart.model.js";
import { product } from "../models/product.model.js";

export const addtocart = async (req, res) => {
    try {
        const userId = req.id;
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                message: "product id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingproduct = await cart.findOne({ product: productId, cart: userId });

        if (existingproduct) {
            return res.status(400).json({
                message: "You have already added",
                success: false
            });
        }

        // check if the jobs exists
        const product = await product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "product not found",
                success: false
            })
        }
        // create a new application
        const newProduct = await product.create({
            job:productId,
            applicant:userId,
        });

        product.cart.push(newProduct._id);
        await product.save();
        return res.status(201).json({
            message:"product added successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getCartProducts = async (req,res) => {
    try {
        const userId = req.id;
        const product = await product.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'product',
            options:{sort:{createdAt:-1}}
        });
        if(!product){
            return res.status(404).json({
                message:"No Product",
                success:false
            })
        };
        return res.status(200).json({
            product,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getcustomerOfproducts = async (req,res) => {
    try {
        const productId = req.params.id;
        const product = await product.findById(productId).populate({
            path:'cart',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'user'
            }
        });
        if(!product){
            return res.status(404).json({
                message:'product not found.',
                success:false
            })
        };
        return res.status(200).json({
            product, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const productId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const product = await product.findOne({_id:productId});
        if(!product){
            return res.status(404).json({
                message:"product not found.",
                success:false
            })
        };

        // update the status
        product.status = status.toLowerCase();
        await product.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}