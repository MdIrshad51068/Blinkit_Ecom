import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";

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
        const existingproduct = await Cart.findOne({ product: productId, applicant: userId });
        if (existingproduct) {
            existingproduct.count += 1;
            await existingproduct.save();
            return res.status(200).json({
                message: "Added",
                success: true
            });
        }

        // check if the jobs exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "product not found",
                success: false
            })
        }
        // create a new application
        const newcart = await Cart.create({
            product: productId,
            applicant: userId,
            count: 1,
        });

        product.carts.push(newcart._id);
        await product.save();
        return res.status(201).json({
            message: "product added successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};



export const getCartProducts = async (req, res) => {
    try {
        const userId = req.id;
        console.log("xxxxxxx", req.id)
        const products = await Cart.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'product',
            options: { sort: { createdAt: -1 } }
        });

        if (!products) {
            return res.status(404).json({
                message: "No Product",
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


// admin dekhega kitna user ne apply kiya hai
export const getcustomerOfproducts = async (req, res) => {
    try {
        const productId = req.params.id;

        const carts = await Cart.find({ product: productId }).populate({
            path: 'applicant'
        });

        if (!carts || carts.length === 0) {
            return res.status(404).json({
                message: 'No customers found for this product.',
                success: false
            });
        }

        const customers = carts.map(cart => cart.applicant);

        return res.status(200).json({
            customers,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error.',
            success: false
        });
    }
}



export const updateStatus = async (req, res) => {
    try {
        const { status, userid, productid } = req.body;
        console.log(status, userid, productid)

        // const productId = req.params.id;
        // console.log(productId)

        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        // find the application by applicantion id
        const product = await Cart.findOne({ product: productid, applicant: userid });
        console.log("jjjjj", product)
        if (!product) {
            return res.status(404).json({
                message: "product not found.",
                success: false
            })
        };

        // update the status
        product.status = status.toLowerCase();
        await product.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}



export const removeProductFromCart = async (req, res) => {
    try {
        const userId = req.id;
        const productId = req.params.id;

        // Remove the product from the user's cart
        const cartItem = await Cart.findOneAndDelete({ applicant: userId, product: productId });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
        });

    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};







export const removedtocart = async (req, res) => {
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
        const existingproduct = await Cart.findOne({ product: productId, applicant: userId });
        if (existingproduct) {
            if (existingproduct.count == 1) {
                const cartItem = await Cart.findOneAndDelete({ applicant: userId, product: productId });
                if (cartItem) {
                    return res.status(404).json({
                        success: true,
                        message: "Removed",
                    });
                }
            } else {
                existingproduct.count = existingproduct.count - 1
                await existingproduct.save();
                return res.status(400).json({
                    message: "Removed",
                    success: true
                });
            }

        }


    } catch (error) {
        console.log(error);
    }
};

