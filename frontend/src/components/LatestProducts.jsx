import React from 'react'
import LatestProductCards from './LatestProductCards';
import { useSelector } from 'react-redux'; 

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestProducts = () => {
    const {allProducts} = useSelector(store=>store.product);
   
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#00802b]' >Latest & Top </span  >  Branded Cloths</h1>
            <div className='grid grid-cols-4 gap-4 my-5'>
                {
                    allProducts.length <= 0 ? <span>No Product Available</span> : allProducts?.slice(0,6).map((product) => <LatestProductCards key={product._id} product={product}/>)
                }
            </div>
        </div>
    )
}

export default LatestProducts