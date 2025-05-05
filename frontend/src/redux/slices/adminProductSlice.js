import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"



// get the all products for admin

export const fetchAdminProducts = createAsyncThunk("adminProducts/fetchProducts",async(_,)=>{

  
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`,
      
            {
                headers : {
                    Authorization :  `Bearer ${localStorage.getItem("userToken")}`
                }
            }


        )

        return response.data
        
    
})


// async  function to create new products

export const  createProduct = createAsyncThunk("adminProduct/newProduct" , async (productData)=>{


      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/products`, 
        productData
      ,
      {
        headers :{
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
        }
      }
   
    )

    return response.data
})



// async  function to update tye existing product

 export const updateProduct = createAsyncThunk("adminProduct/updateProduct",async({id ,productData})=>{

    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        productData,

        {
            headers : {
                Authorization :`Bearer ${localStorage.getItem("userToken")}`
            }
        }


    )

    return response.data
 })

 // async thunk for delete the product 

 export const deleteProduct = createAsyncThunk("adminProduct/deleteProduct",async({id})=>{
    const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
            headers : {
                Authorization :`Bearer ${localStorage.getItem("userToken")}`
            }
        }
    )
    return { id }; 
 })


 const initialState = {
    products: [],
    loading: false,
    error: null,
};

const adminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map(product => 
                    product._id === action.payload._id ? action.payload : product
                );
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                
                state.products = state.products.filter(product => product._id !== action.payload.id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default adminProductsSlice.reducer;
