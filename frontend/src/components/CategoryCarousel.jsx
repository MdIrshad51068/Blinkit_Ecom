import React from 'react';
import { useSelector } from 'react-redux';
import useGateAllAppliedProducts from '@/hooks/useGateAllAppliedProducts';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { Cart_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { allAppliedProducts } = useSelector(store => store.product);
  const refetchCart = useGateAllAppliedProducts();

  const total = allAppliedProducts?.reduce((acc, item) => {
    const price = Number(item?.product?.price ?? 0);
    const count = Number(item?.count ?? 0);
    return acc + price * count;
  }, 0);

  const removed = async (productId) => {
    try {
      const res = await axios.delete(`${Cart_API_END_POINT}/remove/${productId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        refetchCart(); // refresh cart data
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const applyProductHandler = async (productId) => {
    try {
      const res = await axios.get(`${Cart_API_END_POINT}/apply/${productId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        refetchCart(); // refresh cart
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error applying product");
    }
  };

  const minus = async (productId) => {
    try {
      const res = await axios.delete(`${Cart_API_END_POINT}/minus/${productId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        refetchCart(); // refresh cart
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error reducing quantity");
    }
  };

  // const cartProduct = async (productId) => {
  //   try {
  //     const res = await axios.get(`${Cart_API_END_POINT}/get/${productId}`, {
  //       withCredentials: true,
  //     });

  //     if (res.data.success) {
  //       toast.success(res.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Error reducing quantity");
  //   }
  // };


  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "130vh", height: "auto" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {
              allAppliedProducts.length <= 0 ? (
                <span>Empty cart.</span>
              ) : (
                allAppliedProducts.map((item) => (
                  <div key={item._id} className="p-4 border-b" style={{ display: "flex", alignItems: "center", gap: "6px", height: "20vh" }}>

                    <div>
                      <img
                        src={item.product?.photo}
                        alt="Product"
                        className="w-64 h-64 object-cover rounded-md"
                        style={{ height: "20vh", width: "auto", padding: "30px", borderRadius: "50px" }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                      <Button className="bg-gray-400 h-8 w-8" onClick={() => applyProductHandler(item.product._id)}>
                        <i className="fa-solid fa-plus"></i>
                      </Button>
                      <h1>{item.count}</h1>
                      <Button className="bg-gray-400 h-8 w-8" onClick={() => minus(item.product._id)}>
                        <i className="fa-solid fa-minus"></i>
                      </Button>
                      <Badge className="h-6 w-14 ml-10 p-4">
                        {typeof item.product?.price === 'number' && typeof item.count === 'number'
                          ? item.product.price * item.count
                          : "Unnamed Product"}{" "}
                        <i className="fa-solid fa-indian-rupee-sign"></i>
                      </Badge>
                      <Badge className="h-6 w-18 ml-10 p-4 bg-green-800">
                        {item.status}
                      </Badge>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "30px" }}>
                      <Button className="bg-blue-500 ml-50" onClick={() => navigate("/payment")}>
                        Buy Now
                      </Button>
                      <Button onClick={() => removed(item.product._id)} className="bg-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>

        {/* Total */}
        <div style={{
          height: "85vh",
          width: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
          marginTop: "20px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
        }}>
          <h1 className="text-xl">Total: ₹ {total}</h1>
        </div>
      </div>
    </>
  );
};

export default Cart;
