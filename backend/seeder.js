import dotenv from "dotenv"
import mongoose from "mongoose";

import { User } from "./model/userModel.js";
import { products } from "./data/product.js";
import { Product } from "./model/productModel.js";
import { Cart } from "./model/cartModel.js";


dotenv.config()

await mongoose.connect(process.env.MONGO_URL)
console.log("connected successfully")


const seedData =async()=>{
    
    try{

        // clear existing data
        await Product.deleteMany();
        await User.deleteMany()
        await Cart.deleteMany()

        //create the admin user 

        const createUser = await User.create({
            name:"daya",
            email:"daya@gmail.com",
            password:"1234567",
            role:"admin"

        })

        //userid
        //assign userid for all products


        const userId = createUser._id

        const sampleProducts = products.map((product)=>{
            return {...product,user :userId}
        })
        

        await Product.insertMany(sampleProducts)
        console.log("product seeded successfully")
        process.exit()
        
    }catch (err){
        console.log( "error while seeding the data",err)
        process.exit(1)
        
    }
}

seedData()