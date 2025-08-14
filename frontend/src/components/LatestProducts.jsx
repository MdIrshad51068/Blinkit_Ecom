import React from 'react';
import LatestProductCards from './LatestProductCards';
import { useSelector } from 'react-redux';

const LatestProducts = () => {
    const { allProducts} = useSelector(store => store.product);
    const { user} = useSelector(store => store.auth);

    const isOwner = user?.role === 'owner';
    console.log(isOwner)

    return (
        <div className='max-w-7xl mx-auto my-20'>
            {
                isOwner ? (
                    <div className='grid grid-cols-4 gap-4 my-5'>
                        {
                            allProducts.length <= 0
                                ? <span>No Product Available</span>
                                : allProducts.map((product) => (
                                    <LatestProductCards  product={product} />
                                ))
                        }
                    </div>
                ) : (
                    <>
                        <h1 className='text-4xl font-bold'>
                            <span className='text-[#00802b]'>Latest & Top </span> Branded Cloths
                        </h1>
                        <div className='grid grid-cols-4 gap-4 my-5'>
                            {
                                allProducts.length <= 0
                                    ? <span>No Product Available</span>
                                    : allProducts.slice(0, 6).map((product) => (
                                        <LatestProductCards key={product._id} product={product} />
                                    ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default LatestProducts;
