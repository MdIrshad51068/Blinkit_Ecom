import React from 'react'
import useGetCustomerOfProducts from "@/hooks/useGetCustomerOfProducts"
import { useSelector } from 'react-redux';


const ApplicantsOfProduct = () => {
  useGetCustomerOfProducts();

    const {allApplicantsOfProducts } = useSelector(store => store.product);
    console.log("allApplicantsOfProducts",allApplicantsOfProducts);

  return (
    <div>
      <h1>jjjjjjjjjjjjjjjjjjjjj</h1>
    </div>
  )
}

export default ApplicantsOfProduct
