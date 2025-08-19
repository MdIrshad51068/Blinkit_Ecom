import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:{
        allProducts:[],
        allApplicantsOfProducts:[],
        singleProduct:{}, 
        searchProductByText:"",
        allAppliedProducts:[],
        searchedQuery:"",
        count:"",
    },
    reducers:{
        // actions
        setAllProducts:(state,action) => {//---
            state.allProducts = action.payload;
        },
        setSingleProduct:(state,action) => {//---
            state.singleProduct = action.payload;
        },
        setAllApplicantsOfProducts:(state,action) => {
            state.allApplicantsOfProducts = action.payload;
        },
        setSearchProductByText:(state,action) => {
            state.searchProductByText = action.payload;
        },
        setAllAppliedProducts:(state,action) => {
            state.allAppliedProducts = action.payload;
        },
        setSearchedQuery:(state,action) => {//---
            state.searchedQuery = action.payload;
        },
        setCount:(state,action) => {//----
            state.count = action.payload;
        }
    }
});
export const {
    setAllProducts, 
    setSingleProduct, 
    setAllApplicantsOfProducts,
    setSearchProductByText, 
    setAllAppliedProducts,
    setSearchedQuery,
    setCount
} = productSlice.actions;
export default productSlice.reducer;