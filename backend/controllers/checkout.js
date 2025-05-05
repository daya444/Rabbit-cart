import { Product } from "../model/productModel.js";
import { Cart } from "../model/cartModel.js";
import {Checkout} from "../model/checkoutModel.js"
import { Order } from "../model/orderModel.js";



  // post/ api/checkout
  // create a new checkout 
export const  createCheckout = async(req, res)=>{
    const {checkoutItems,shippingAddress,totalPrice,paymentMethod}= req.body;

    if(!checkoutItems  || checkoutItems.length === 0){
        return res.status(400).json({message : "No items in checkout"})
    }

    try {
        const newCheckout = await  Checkout.create({
            user : req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus : "pending",
            isPaid : false


        })

       
        res.status(201).json(newCheckout)
     
    }  catch (error) {
        console.error("Checkout creation error:", error); // 👈 add this
        res.status(500).json({ message: "Server Error", error: error.message }); // send actual message
      }
      
    
}

//put api/checkout/:id/pay
//update the payment details

export const updateCheckout = async (req, res) => {
    const { paymentDetails, paymentStatus } = req.body;
  
    try {
      const checkout = await Checkout.findById(req.params.id);
      if (!checkout) {
        return res.status(404).json({ message: "Checkout not found" });
      }
  
      if (paymentStatus.toLowerCase() === "paid") {
        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = Date.now();
  
        await checkout.save();
        return res.status(200).json(checkout);
      } else {
        return res.status(400).json({ message: "Invalid payment status" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  


// post /api/checkout/:id/finalize

export const finalizeCheckout = async (req,res)=> {
try {
    const checkout = await Checkout.findById(req.params.id)
    if(!checkout){
        res.status(404).json({message: "checkout not found"})
    }
    if(checkout.isPaid && !checkout.isFinalized){
        // create a final order based on the checkout 
        const finalOrder = await Order.create({


            user : checkout.user,
            orderItems: checkout.checkoutItems,
            shippingAddress : checkout.shippingAddress,
            paymentMethod : checkout.paymentMethod,
            totalPrice :checkout.totalPrice,
            isPaid : true,
            paidAt : checkout.paidAt,
            isDelivered :false,
            paymentStatus : "paid",
            paymentDetails : checkout.paymentDetails,
            status : "Processing"




        })

        //finalize the product 
        checkout.isFinalized = true;
        checkout.finalizedAt = Date.now()

         await checkout.save()
         // delete the cart

         await Cart.findOneAndDelete({ user: checkout.user });


         res.status(200).json(finalOrder)


    }else if (checkout.isFinalized){
        res.status(400).json({message : "checkout already finalized"})
    } else {
        res.status(400).json({message : "checkout is not paid"})
    }



    
} catch (error) {
    console.error(error)
    res.status(500).json({message: "Server error"})
    
}
}