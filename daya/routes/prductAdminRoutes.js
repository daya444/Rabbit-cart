import express from "express"
import { admin, protect } from "../middlewares/authMiddleware.js";
import { getAllProduct } from "../controllers/adminProduct.js";



const router = express.Router();


router.get("/",protect,admin,getAllProduct)


export default router