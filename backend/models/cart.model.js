import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    count:{
        type:Number,
    },
    status:{
        type:String,
        enum:['pending', 'delivered', 'cancel'],
        default:'pending'
    }
},{timestamps:true});
export const Cart  = mongoose.model("Cart", cartSchema);