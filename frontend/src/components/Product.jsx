import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Link,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product }) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100' style={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
            

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
                {/* <Button className="bg-[#7209b7]">Add to Cart <FontAwesomeIcon icon={faShoppingCart} /></Button> */}
            </div>
        </div>
    )
}

export default Product