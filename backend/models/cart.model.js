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
    status:{
        type:String,
        enum:['pending', 'delivered', 'cancel'],
        default:'pending'
    }
},{timestamps:true});
export const cart  = mongoose.model("Cart", cartSchema);