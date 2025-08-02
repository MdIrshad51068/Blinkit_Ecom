import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Cart_API_END_POINT, Product_API_END_POINT } from '@/utils/constant';
import { setSingleProduct } from '@/redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Navbar from './shared/Navbar';

const Details = () => {
    const { singleProduct } = useSelector(store => store.product);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleProduct.carts.some(Cart => Cart.applicant === user?._id) || false;
    console.log("hello", singleProduct?.carts?.some(Cart => Cart.applicant === user?._id))
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const productId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const applyProductHandler = async () => {
        try {
            const res = await axios.get(`${Cart_API_END_POINT}/apply/${productId}`, { withCredentials: true });


            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleProduct = { ...singleProduct, carts: [...singleProduct.carts, { applicant: user?._id }] }
                dispatch(setSingleProduct(updatedSingleProduct)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleProduct = async () => {
            try {
                const res = await axios.get(`${Product_API_END_POINT}/get/${productId}`, { withCredentials: true });
                if (res.data.success) {
                    console.log("lllllllll", res.data.product);
                    dispatch(setSingleProduct(res.data.product));

                    setIsApplied(res.data.product.carts.some(Cart => Cart.applicant === user?._id)) // Ensure the state is in sync with fetched data
                    console.log("hhhhh", res.data.product.carts.some(Cart => Cart.applicant === user?._id));

                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleProduct();
    }, [productId, dispatch, user?._id]);

    return (
        <>
            <div>
                <Navbar />
                <div className='max-w-7xl mx-auto my-10' style={{ display: "flex", alignItems: "center", gap: "30px" }}>
                    <div className='flex items-center justify-between' >
                        <img
                            src={singleProduct?.photo}
                            alt="Product"
                            className="w-64 h-64 object-cover rounded-md"
                            style={{ height: "80vh", width: "auto", padding: "30px", borderRadius: "50px" }}
                        />

                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginLeft: "90px", gap: "10px" }}>
                        <div style={{ marginBottom: "50px" }}>
                            <h1 className='font-bold text-xl'>{singleProduct?.productName}</h1>
                            <p className='text-gray-600'>{singleProduct?.description}</p>
                            <p className='text-gray-600 '>{singleProduct?.category}</p>
                            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                <Badge className="bg-blue-500">{singleProduct?.price} <i class="fa-solid fa-indian-rupee-sign"></i></Badge>
                                <Badge className="bg-green-500">{singleProduct?.stock} in stock</Badge>

                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "30px" }}>
                            <Button className="bg-[#7209b7]" onClick={isApplied ? null : applyProductHandler}>Add to Cart <FontAwesomeIcon icon={faShoppingCart} /></Button>
                            <Button className="bg-red-700" onClick={() => navigate("/payment")}>Buy Now</Button>



                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default Details