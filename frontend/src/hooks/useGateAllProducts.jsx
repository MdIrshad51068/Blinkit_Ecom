import { setAllProducts } from '@/redux/productSlice'
import { Product_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllProducts = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.product);
    useEffect(()=>{
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get(`${Product_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    console.log(res.data.products);
                    dispatch(setAllProducts(res.data.products));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProducts();
    },[])
}

export default useGetAllProducts