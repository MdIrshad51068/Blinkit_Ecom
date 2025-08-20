import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch,useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/productSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(store => store.auth);


    const searchProductandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <h1 className='text-5xl font-bold'>Search, Here To & <br /> Get Your <span className='text-[#00802b]'>Desire Products</span></h1>
                <p>Discover a world of endless choices and unbeatable deals<br />shop smarter, faster, and better with us</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your desire products.'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full'

                    />
                    <Button onClick={() => {
                        if (user) {
                            searchProductandler();
                        } else {
                            navigate("/request");
                        }
                    }} className="rounded-r-full bg-[#00802b]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default HeroSection