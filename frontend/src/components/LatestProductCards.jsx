import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { Button } from './ui/button';




const LatestProductCards = ({ product }) => {

    const { user } = useSelector(store => store.auth);
    const isOwner = user?.role === "owner"

    const navigate = useNavigate();
    return (
        <div onClick={() => isOwner ? navigate(`/applicants/${product._id}`) : navigate(`/detail/${product._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} >
            <div>
                <img
                    src={product.photo}
                    alt="Product"
                    className="w-64 h-64 object-cover rounded-md"
                    style={{ height: "20vh", width: "auto", padding: "10px", borderRadius: "20px" }}
                />

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
            {isOwner && (
                <Button className="mt-4 bg-red-900" onClick={() => alert("Button clicked!")}>
                    Delete
                </Button>
            )}



        </div>
    )
}

export default LatestProductCards