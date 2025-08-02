import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Cart_API_END_POINT, Product_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setCount } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';




const Product = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { count } = useSelector(store => store.product);



    const applyProductHandler = async () => {
        try {
            const res = await axios.get(`${Cart_API_END_POINT}/apply/${product?._id}`, { withCredentials: true });
            console.log("kkkkkkk", res.data)
            if (res.data.success) {

                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    const counter = async () => {
        try {
            const res = await axios.get(`${Product_API_END_POINT}/get/${product?._id}`, { withCredentials: true });
            if (res.data.success) {
                if (res.data.product.carts.some(Cart => Cart.applicant === user?._id)) {// Ensure the state is in sync with fetched data
                    count = count + 1;
                    dispatch(setCount(count));
                } else {
                    dispatch(setCount(1));
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>


            <div>
                <Avatar className="cursor-pointer rounded-lg " style={{ height: "100px", width: "100%", objectfit: "cover" }}>
                    <AvatarImage src={product.photo} alt="@shadcn" />
                </Avatar>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{product?.productName}</h1>
                <p className='text-sm text-gray-600'>{product?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{product?.price} Rs</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{product?.stock} p</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{product?.category}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button className="bg-[#F83002]" ><Link to="/payment">Buy Now</Link></Button>
                <Button onClick={() => navigate(`/detail/${product?._id}`)} variant="outline">Details</Button>
                <Button
                    className="bg-[#7209b7]"
                    onClick={() => {
                        applyProductHandler();
                        counter();
                    }}

                >
                    Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
                </Button>

            </div>
        </div>
    )
}

export default Product