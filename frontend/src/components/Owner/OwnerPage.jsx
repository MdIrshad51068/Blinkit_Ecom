import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import {  useNavigate } from 'react-router-dom'
import LatestProducts from '../LatestProducts'
import useGetAllProducts from "@/hooks/useGateAllProducts"




const OwnerPage = () => {
    useGetAllProducts();

  const navigate=useNavigate();
  return (
    <>
    <div>
      <Navbar/>
      <div style={{display:"flex",alignItems:"center", justifyContent:"flex-end",marginTop:"30px",marginRight:"30px" }} onClick={()=>navigate("/productregistration") }><Button className="bg-green-600 "><i className="fa-solid fa-plus"></i>Product</Button></div>
      <LatestProducts/>
    </div>
    </>
  )
}

export default OwnerPage
