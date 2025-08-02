import React from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'

const OwnerPage = () => {
  return (
    <>
    <div>
      <Navbar/>
      <div style={{display:"flex",alignItems:"center", justifyContent:"flex-end",marginTop:"30px",marginRight:"30px" }}><Button className="bg-green-600 "><i className="fa-solid fa-plus"></i>Product</Button></div>
    </div>
    </>
  )
}

export default OwnerPage
