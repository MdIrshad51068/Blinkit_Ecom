import React from 'react';
import { useSelector } from 'react-redux';
import useGateAllAppliedProducts from '@/hooks/useGateAllAppliedProducts'; // ✅ Make sure this is the correct path
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Cart_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';



const Cart = () => {
    useGateAllAppliedProducts();// ✅ Fetch data into Redux
    const navigate = useNavigate();


const removed = async (productId) => {
  try {
    const res = await axios.delete(`${Cart_API_END_POINT}/remove/${productId}`, {
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};





    const { allAppliedProducts } = useSelector(store => store.product);
    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <div style={{ display: "flex", width: "130vh", height: "auto" }}>


                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {
                            allAppliedProducts.length <= 0 ? <span>Empty cart.</span> : allAppliedProducts.map((item, index) => (
                                <div key={item._id} className="p-4 border-b" style={{ display: "flex", alignItems: "center", gap: "50px", height: "20vh" }}>
                                    <div>
                                        <img
                                            src={item.product?.photo}
                                            alt="Product"
                                            className="w-64 h-64 object-cover rounded-md"
                                            style={{ height: "20vh", width: "auto", padding: "30px", borderRadius: "50px" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>

                                        <Button className="bg-gray-400 h-8 w-8"><i className="fa-solid fa-plus"></i></Button>
                                        <h1>0</h1>
                                        <Button className="bg-gray-400 h-8 w-8"><i class="fa-solid fa-minus"></i></Button>
                                        <Badge className="h-6 w-14 ml-10 p-4">{item.product?.price || "Unnamed Product"} <i class="fa-solid fa-indian-rupee-sign"></i></Badge>

                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px", }}>
                                        <Button className="bg-blue-500 ml-50" onClick={() => navigate("/payment")}>Buy Now</Button>
                                    <Button onClick={() => removed(item.product._id)} className="bg-red-700" >Remove</Button>
                                    
                                </div>

                                </div>

                    ))
                        }
                </div>


            </div>
            <div style={{ height: "100vh", border: "1px solid black", width: "70vh" }}>

            </div>
        </div >
        </>
    );
};

export default Cart;
