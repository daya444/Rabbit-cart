

// get the order  list for logged in ders
// api/orders/my-orders

import { Order } from "../model/orderModel.js"

export const getOrders =async(req,res)=> {

    try {
        const order = await Order.find({user : req.user._id}).sort({createdAt : -1})
        res.json(order)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Server Error"})
        
    }

}

export const orderDetails =async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )
        res.json(order)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Server Error"})
        
    }
}