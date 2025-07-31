import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestProducts from './LatestProducts'
import Footer from './shared/Footer'
import useGetAllProducts from '@/hooks/useGateAllProducts'
import useGateAllAppliedProducts from '@/hooks/useGateAllAppliedProducts'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGateAllAppliedProducts();
  useGetAllProducts();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'owner') {
      navigate("/owner");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestProducts />
      <Footer />
    </div>
  )
}

export default Home