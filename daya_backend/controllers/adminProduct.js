import { Product } from "../model/productModel.js"

// get all produts 
// this is private routes only for admin
// /api/admin/products
export const getAllProduct =async (req ,res)=> {
    try {
        
        const products = await Product.find({})
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({message : "Server Error"})
        
    }

}

