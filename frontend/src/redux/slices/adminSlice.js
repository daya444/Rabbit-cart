import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"


//fetch all user only

export const fetchUser =createAsyncThunk("admin/fetchUser",async()=>{
    
        const response =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
            {
                headers:{
                    Authorization :`Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
  
})


// add the create user action
export const addUser = createAsyncThunk(
    "admin/addUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                       
                    },
                }
            );
            return response.data; // Successfully created user
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred"); 
        }
    }
);


//update the user info 

export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async ({ name,email,role,id }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
                {name,email,role},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                        
                    },
                }
            );
            return response.data; // Successfully updated user
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);

//delete the user 

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return id
        } catch (error) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


const adminSlice = createSlice({
    name : "admin",
    initialState : {
        users : [],
        loading : false,
        error : null
    },
    reducers : {},
    extraReducers : (builders)=>{
        builders

        .addCase(fetchUser.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false,
            state.users = action.payload
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.error = action.error.message,
            state.loading = false
        })
        .addCase(updateUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
           const updatedUser = action.payload.user;
           const findIndex = state.users.findIndex((user)=> user._id === updatedUser._id)
           if(findIndex !== -1){
            state.users[findIndex]=updatedUser
           }
           state.loading = false;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
          // Add user
          .addCase(addUser.pending, (state) => {
            state.loading = true; 
            state.error =null
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload.user);
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        })

            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((user) => user._id !== action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    



    }

})



export default adminSlice.reducer