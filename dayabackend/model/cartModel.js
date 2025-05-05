import mongoose from "mongoose"


const cartItemsSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        requried : true,
        ref : "Product"
    },
    name : String,
    image : String,
    price : String,
    size : String,
    color : String,
    quantity : {
        type : Number,
        default : 1
    }
},
{_id : false}

)



const cartSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
      
    },
    guestId : {
        type : String

    },
    products : [cartItemsSchema],
    totalPrice : {

        type : Number,
        default : 0,
         requried : true

    }
    
})

 export const  Cart = mongoose.model("Cart",cartSchema)