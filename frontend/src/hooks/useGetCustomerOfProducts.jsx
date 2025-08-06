import { Cart_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllApplicantsOfProducts } from "@/redux/productSlice";
import { useParams } from "react-router-dom";

const useGetCustomerOfProducts = () => {
  const dispatch = useDispatch();
  const { id: productID } = useParams(); // ✅ clean destructure

  useEffect(() => {
    if (!productID) return;

    const fetchAppliedProducts = async () => {
      try {
        const res = await axios.get(`${Cart_API_END_POINT}/${productID}/applicants`, {
          withCredentials: true,
        });
console.log(res.data.success)
        if (res.data.success) {
          // ✅ Make sure this matches the structure from your backend
          dispatch(setAllApplicantsOfProducts(res.data.applicant));
        } else {
          console.warn("⚠️ API returned success: false", res.data.message);
        }
      } catch (error) {
        console.error("❌ Error fetching applied customers:", error);
      }
    };

    fetchAppliedProducts();
  }, [dispatch, productID]); // ✅ dependencies

  // Optional: return a manual refetch function if needed
};

export default useGetCustomerOfProducts;
