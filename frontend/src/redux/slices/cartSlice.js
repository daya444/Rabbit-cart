import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


// helper function to load cart from the localstorage

const loadCartFromStorage = ()=> {
    let storedCart =   localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {products : []}
}

//helper function to save the cart 

const saveCartToLocalStorage = (cart)=>{
  localStorage.setItem("cart",JSON.stringify(cart))
}

// get the cart for user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart",

    async({userId,guestId},{rejectWithValue})=>{

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
                params :{userId,guestId}
            })
            return response.data
            
        } catch (error) {
            console.log("while fetching the cart",error)
            return rejectWithValue(error.response?.data || { message: "An error occurred" });
            
        }

    }
)

//add item to the cart for user or guest

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ guestId, userId, productId, size, color, quantity }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
          {
            guestId,
            userId,
            productId,
            size,
            color,
            quantity,
          }
        );
        
        return response.data; // Assuming the API returns updated cart data
      } catch (error) {
        console.error("Error adding item to cart:", error);
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );


  // update the quamtity in he cart
  export const updateCartItemQuantity = createAsyncThunk(
    "cart/updateCartItemQuantity",
    async ({ guestId, userId, productId, size, color, quantity }, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
          {
            guestId,
            userId,
            productId,
            size,
            color,
            quantity,
          }
        );
        
        return response.data; 
      } catch (error) {
        console.error("Error adding item to cart:", error);
        return rejectWithValue(error.response?.data || "An error occurred");
      }
    }
  );



// remove the item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart",
    async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`, {
          data: { guestId, userId, productId, size, color } // ✅ wrap inside 'data'
        });
        return response.data;
      } catch (error) {
        console.log("Error while removing item from cart", error);
        return rejectWithValue(error.response?.data || { message: "Error removing from cart" });
      }
    }
  );
  

// merge guest cart into user cart
export const mergeGuestCart = createAsyncThunk("cart/mergeGuestCart",
    async ({ guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
                guestId
            },
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        );
            return response.data;
        } catch (error) {
            console.log("Error while merging guest cart", error);
            return rejectWithValue(error.response.data);
        }
    }
);


const cartSlice = createSlice({
    name : "cart" ,
    initialState : {
        cart : loadCartFromStorage(),
        loading : false,
        error : null
    },
    reducers : {
        clearCart : (state)=> {
            state.cart =  {products : []};
            localStorage.removeItem("cart")
        }
    }
    ,extraReducers : (builder)=> {
        builder 

        .addCase(fetchCart.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.loading = false,
            state.cart = action.payload
            saveCartToLocalStorage(action.payload)
        })
        .addCase(fetchCart.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "failed to fetch cart";
        })

        .addCase(addToCart.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.loading = false,
            state.cart = action.payload
            saveCartToLocalStorage(action.payload)
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "failed to add to cart"
        })

        .addCase(updateCartItemQuantity.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(updateCartItemQuantity.fulfilled,(state,action)=>{
            state.loading = false,
            state.cart = action.payload
            saveCartToLocalStorage(action.payload)
        })
        .addCase(updateCartItemQuantity.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "failed to update the item quantity"
        })

        .addCase(removeFromCart.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(removeFromCart.fulfilled,(state,action)=>{
            state.loading = false,
            state.cart = action.payload
            saveCartToLocalStorage(action.payload)
        })
        .addCase(removeFromCart.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "failed to remove  item"
        })

        .addCase(mergeGuestCart.pending,(state)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(mergeGuestCart.fulfilled,(state,action)=>{
            state.loading = false,
            state.cart = action.payload
            saveCartToLocalStorage(action.payload)
        })
        .addCase(mergeGuestCart.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.payload?.message || "failed to merge cart"
        })
    }
    

})

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;