import mongoose from "mongoose";


export const connectDB = async()=> {
    try {
       await  mongoose.connect(process.env.MONGO_URL)
       console.log('mongoDB connected to db ')
    }catch(err){
        console.log("MongoDB connection failed",err)
        process.exit(1); 
    }
}