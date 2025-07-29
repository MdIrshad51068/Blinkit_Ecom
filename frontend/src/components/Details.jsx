import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Cart_API_END_POINT, Product_API_END_POINT } from '@/utils/constant';
import { setSingleProduct } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Details = () => {
    const {singleProduct} = useSelector(store => store.product);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleProduct?.cart?.some(cart => cart.applicant === user?._id) || false;
    
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const productId = params.id;
    const dispatch = useDispatch();

    const applyProductHandler = async () => {
        try {
            const res = await axios.get(`${Cart_API_END_POINT}/apply/${productId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleProduct = {...singleProduct, cart:[...singleProduct.cart,{applicant:user?._id}]}
                dispatch(setSingleProduct(updatedSingleProduct)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleProduct = async () => {
            try {
                const res = await axios.get(`${Product_API_END_POINT}/get/${productId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleProduct(res.data.product));
                    console.log(res.data);
                    setIsApplied(res.data.product.carts.some(cart=>cart.applicant === user?._id)) // Ensure the state is in sync with fetched data
                    console.log("hhh",res.data.product.carts.some(cart=>cart.applicant === user?._id));

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleProduct(); 
    },[productId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleProduct?.productName}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleProduct?.productName} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleProduct?.productName}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleProduct?.productName}LPA</Badge>
                    </div>
                </div>
                <Button
                onClick={isApplied ? null : applyProductHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already added' : 'Add'}
                </Button>
            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.productName}</span></h1>
                <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.productName}</span></h1>
                <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.productName}</span></h1>
                <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.productName} yrs</span></h1>
                <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.productName}LPA</span></h1>
                <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.applications?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleProduct?.createdAt.split("T")[0]}</span></h1>
            </div>
        </div>
    )
}

export default Details