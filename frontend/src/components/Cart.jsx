import React from 'react';
import { useSelector } from 'react-redux';
import useGateAllAppliedProducts from '@/hooks/useGateAllAppliedProducts'; // ✅ Make sure this is the correct path

const Cart = () => {
    useGateAllAppliedProducts(); // ✅ Fetch data into Redux

    const { allAppliedProducts } = useSelector(store => store.product);
    return (
        <div>
            <h1>Cart</h1>
            {
                allAppliedProducts.map((item, index) => (
                    <div key={index} className="p-4 border-b">
                        <h2>{item.product?.productName || "Unnamed Product"}</h2>

                        
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;
