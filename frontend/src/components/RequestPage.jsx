import React from 'react'
import Navbar from './shared/Navbar'

const RequestPage = () => {
  return (
    <>
    <Navbar/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",fontSize:"6vh",marginTop:"23vh"}}>
        <h1 style={{color:"#00802b",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",}}>Please Login/SignUp <br/> <span >to access the page</span> </h1>
    </div>
    </>
  )
}

export default RequestPage
