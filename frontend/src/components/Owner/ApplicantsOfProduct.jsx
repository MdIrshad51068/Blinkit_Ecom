import React from 'react'
import useGetCustomerOfProducts from "@/hooks/useGetCustomerOfProducts"
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import { Avatar, AvatarImage } from '../ui/avatar'
// import { color } from 'framer-motion';
// import { Button } from '../ui/button';
import { Cart_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';


const shortlistingStatus = ['pending', 'delivered', 'cancel'];


const ApplicantsOfProduct = () => {
  useGetCustomerOfProducts();
  const { id: productid } = useParams();

  const statusHandler = async (status, userid) => {
    console.log('called');
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${Cart_API_END_POINT}/status/update`, { status,userid,productid });
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const { allApplicantsOfProducts } = useSelector(store => store.product);
  return (
    <>
      <Navbar />
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>

        {Array.isArray(allApplicantsOfProducts) && allApplicantsOfProducts.length > 0 ? (
          allApplicantsOfProducts.map((item) => (
            <div key={item._id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-around", borderRadius: "30px",
              marginTop: "20px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              height: "120px",
              width: "190vh"
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
              {
                shortlistingStatus.map((status, index) => (
                  <button
                    key={index}
                    onClick={() => statusHandler(status, item?._id)}
                    className="mx-2 px-4 py-1 bg-blue-500 text-white rounded"
                  >
                    {status}
                  </button>
                ))

              }
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
