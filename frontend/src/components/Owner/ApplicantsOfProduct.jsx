import React from 'react'
import useGetCustomerOfProducts from "@/hooks/useGetCustomerOfProducts"
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import { Avatar, AvatarImage } from '../ui/avatar'
import { color } from 'framer-motion';
import { Button } from '../ui/button';



const ApplicantsOfProduct = () => {
  useGetCustomerOfProducts();

  const { allApplicantsOfProducts } = useSelector(store => store.product);
  return (
    <>
    <Navbar />
      <div style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center"}}>
        
        {Array.isArray(allApplicantsOfProducts) && allApplicantsOfProducts.length > 0 ? (
          allApplicantsOfProducts.map((item) => (
            <div key={item._id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-around", borderRadius: "30px",
              marginTop: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              height:"120px",
              width:"190vh"
            }}>
              <Avatar style={{ height: "70px", width: "70px", objectfit: "cover", backgroundPosition: "center" }}   >
                <AvatarImage src={item?.profile?.profilePhoto} alt="@shadcn" />
              </Avatar>
              <div>
                <h1>{item.firstname} {item.lastname}</h1>
                <h1>{item.phoneNumber}</h1>
              </div>
              <h1>
                {item.profile.address}
              </h1>
              <Button>stetus</Button>
            </div>
          ))
        ) : (
          <p>No applicants found.</p>
        )}

      </div>
    </>
  )
}

export default ApplicantsOfProduct
