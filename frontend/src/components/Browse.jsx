import React, { useEffect }from 'react'
import Navbar from './shared/Navbar'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllProducts from '@/hooks/useGateAllProducts';
import { setSearchedQuery } from '@/redux/productSlice';
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react';




// const randomJobs = [1, 2,45];

const Browse = () => {
    const [query, setQuery] = useState("");

    const searchProductandler = () => {
        dispatch(setSearchedQuery(query));
    }

    
    useGetAllProducts();
    const {allProducts} = useSelector(store=>store.product);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mt-10'>
                    <input
                        type="text"
                        placeholder='Find your desire products.'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={searchProductandler} className="rounded-r-full bg-[#00802b]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allProducts.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allProducts.map((product) => {
                            return (
                                <Product key={product._id} product={product}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse