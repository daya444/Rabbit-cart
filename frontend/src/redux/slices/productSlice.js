import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

// fetch the products according to filters
export const fetchProductByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async (
      { collections, sizes, colors, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit, },
      { rejectWithValue }
    ) => {
      try {
        const params = new URLSearchParams();
        if (collections) params.append("collections", collections);
        if (sizes) params.append("sizes", sizes);
        if (colors) params.append("colors", colors);
        if (gender) params.append("gender", gender);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sortBy", sortBy);
        if (search) params.append("search", search);
        if (category) params.append("category", category);
        if (material) params.append("material", material);
        if (brand) params.append("brand", brand);
        if (limit) params.append("limit", limit);
        
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${params.toString()}`);
        return response.data
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );

  //fetch the single product by id

export const fetchProductDetils = createAsyncThunk("products/fetchProductDetails",
    async(id)=>{
         
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        
        return response.data


})


//async thunk update the single products

export const updateProduct =createAsyncThunk("products/updateProduct",async({id,productData})=>{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,productData,
        
        {
          headers : {
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
          }

    });
        return response.data

})

//async thunk fetch similar product

export const fetchSimilarProducts =createAsyncThunk("products/fetchSimilarProducts",async({id})=>{
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
       
        
      );
     
        return response.data
        

})

const productSlice = createSlice({
  name : "products",
  initialState : {
      products : [],
      selectedProduct : null ,//store the single product details
      similarProduct : [],
      loading : false,
      error :null,
      filters : {
          collections : "", 
          sizes :"",
           colors : "", 
           gender : "",
          minPrice : "", 
          maxPrice : "",
          sortBy : "",
          search : "", 
          category : "", 
          material : "", 
          brand : "", 
          limit : "", 
         
          
      }
  },
  reducers: {
      setFilters: (state, action) => {
          state.filters = { ...state.filters, ...action.payload };
      },
      clearFilters: (state) => {
          state.filters = {
              collections: "",
              sizes: "",
              colors: "",
              gender: "",
              minPrice: "",
              maxPrice: "",
              sortBy: "",
              search: "",
              category: "",
              material: "",
              brand: "",
              limit: "",
          };
      },
  },
  extraReducers : (builder)=>{
      builder
      // Fetch products by filters
      .addCase(fetchProductByFilters.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(fetchProductByFilters.fulfilled, (state, action) => {
          state.loading = false;
          state.products = Array.isArray(action.payload)? action.payload : []
      })
      .addCase(fetchProductByFilters.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
       // Fetch single product details
       .addCase(fetchProductDetils.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(fetchProductDetils.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetils.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = false;
          const updateProduct =  action.payload;
          const index =  state.products.findIndex(
              (product)=> product._id === updateProduct._id
          )
          if(index > -1){
               state.products[index] = updateProduct
          }
      })
      .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      // Fetch similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.similarProduct = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      });
  }
})





export const { setFilters , clearFilters} = productSlice.actions
export default productSlice.reducer