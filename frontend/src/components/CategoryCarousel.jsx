import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/productSlice';
import pantImg from '../assets/pant.png';
import shirtImg from '../assets/shirtImg.png';
import jeansImg from '../assets/jeansImg.png';
import kurtaImg from '../assets/kurtaImg.png';
import pajamaImg from '../assets/pajamaImg.png';

const category= [
    {  img: pantImg },
    {  img: shirtImg },
    {  img: jeansImg },
    {  img: kurtaImg },
    {  img: pajamaImg }
];



const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

const { user } = useSelector(store => store.auth);


    return (
        <div>
            <Carousel className="w-full max-w-320 mx-auto my-20">
                <CarouselPrevious />
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/3 lg-basis-1/3">
                                <img src={cat.img}  className="w-200 h-140 object-cover mb-2" onClick={() => { if (user) { searchJobHandler(cat) } else { navigate("/request") } }} variant="outline" />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent> 
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel