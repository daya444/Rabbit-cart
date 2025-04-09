import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchOrders = createAsyncThunk("/orders/fetchOrders",async(_,{rejectWithValue})=>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
            {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("userToken")}`
                }
            })
             return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
        
    }
})
export const fetchOrderById = createAsyncThunk("/orders/fetchOrderById", async (orderId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders : 0,
        orderDetails: null,
        loading: false,
        error: null
    },
    reducers: {}, // No regular reducers needed for async operations

    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;
