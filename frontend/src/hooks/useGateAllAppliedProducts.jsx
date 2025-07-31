import { setAllAppliedProducts } from "@/redux/productSlice";
import { Cart_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGateAllAppliedProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    const fetchAppliedProducts = async () => {
        try {
            const res = await axios.get(`${Cart_API_END_POINT}/get`, { withCredentials: true });
            console.log("lolo", res.data.products); // Log full response

            if (res.data.success) {
                dispatch(setAllAppliedProducts(res.data.products));
            } else {
                console.warn("⚠️ API returned success: false", res.data.message);
            }
        } catch (error) {
            console.error("❌ Error in fetchAppliedProducts:", error);
        }
    };

    fetchAppliedProducts();
}, []);

};
export default useGateAllAppliedProducts;