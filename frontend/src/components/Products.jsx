import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Product from './Product';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setUser } from '@/redux/authSlice'
import { useNavigate } from 'react-router-dom'

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Products = () => {
    const { allProducts, searchedQuery } = useSelector(store => store.product);
    const { user } = useSelector(store => store.auth);
    const [filterProducts, setFilterProducts] = useState(allProducts);

    useEffect(() => {
        if (searchedQuery) {
            const filteredProducts = allProducts.filter((product) => {
                return product.productName.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterProducts(filteredProducts)
        } else {
            setFilterProducts(allProducts)
        }
    }, [allProducts, searchedQuery]);

    return (
        <div>
            <Navbar />
            
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterProducts.length <= 0 ? <span>Product not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-4 gap-4 my-5'>
                                    {
                                        filterProducts.map((product) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={product?._id}>
                                                <Product product={product} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Products