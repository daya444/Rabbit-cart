import { Order } from "../model/orderModel.js"

//get all order by admin

//access by admin only
///api/admin/orders

export const getAllOrder = async ( req ,res)=> {

    try {
        const  orders = await Order.find({}).populate("user","name email ")
            res.json(orders)
        
        
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Server Error"})
        
    }

}
// upadate the stauts of the order by admin 
// /api/admin/orders/:id
export const updateStatus = async ( req ,res)=> {
    
    const {id} = req.params
    try {
         const order =await Order.findById(id).populate("user","name email ")
         if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt  =req.body.status === "Delivered" ? Date.now() : order.deliveredAt

            const updateOrder = await order.save()
            res.json(updateOrder)
         }else {
            res.status(404).json({message : "order not found"})
         }
       
       
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Server Error"})
        
    }
}

//delete the order
// /api/admin/orders/:id
export const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await order.deleteOne(); // Deletes the order from the database
        res.json({ message: "Order deleted successfully" });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
