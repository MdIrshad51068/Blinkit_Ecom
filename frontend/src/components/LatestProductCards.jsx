import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarImage } from './ui/avatar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Button } from './ui/button';


const LatestProductCards = ({ product }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/detail/${product._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
            <div>
                <Avatar className="cursor-pointer rounded-lg " style={{ height: "100px", width: "100%", objectfit: "cover" }}>
                    <AvatarImage src={product.photo} alt="@shadcn" />
                </Avatar>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{product?.productName}</h1>
                <p className='text-sm text-gray-600'>Color : {product?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{product?.price} Rs</Badge>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{product?.stock} P</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{product?.category}</Badge>

            </div>
            

        </div>
    )
}

export default LatestProductCards