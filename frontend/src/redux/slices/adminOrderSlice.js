import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"



//ftech all orders only admin 

export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrers",async(_,{rejectWithValue})=>{

    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,

            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )

        return response.data
    } catch (error) {

        return rejectWithValue(error.response.data)
        
    }
})


//update order delivery status
export const updateOrderStatus = createAsyncThunk("adminOrders/updateOrderStatus",async({id ,status},{rejectWithValue})=>{

    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
            { 
                status
 
           },

            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )

        return response.data
    } catch (error) {

        return rejectWithValue(error.response.data)
        
    }
})


//delete the order
export const deleteOrder = createAsyncThunk("adminOrders/deleteOrder",async(id,{rejectWithValue})=>{

    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
          

            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )

        return id 
    } catch (error) {

        return rejectWithValue(error.response.data)
        
    }
})


const adminOrderSlice = createSlice({
    name : "adminOrders",
    initialState : {
        orders : [],
        totalOrder : 0,
        totalSale : 0,
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builder)=> {
        builder

        .addCase(fetchAllOrders.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.totalOrder = action.payload.length;
            state.totalSale = action.payload.reduce((total, order) => total + order.totalPrice, 0);
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false;
           
            const updatedOrder = action.payload;
            const orderIndex = state.orders.findIndex((order)=> order._id === updatedOrder._id);
            if(orderIndex !== -1){
                state.orders[orderIndex] = updatedOrder
            }
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteOrder.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter(order => order._id !== action.payload);
            state.totalOrder = state.orders.length;
            state.totalSale = state.orders.reduce((total, order) => total + order.totalPrice, 0);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

})

export default  adminOrderSlice.reducer