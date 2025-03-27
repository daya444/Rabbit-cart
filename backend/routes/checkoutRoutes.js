
import express from "express"

import {  protect } from "../middlewares/authMiddleware.js";
import { createCheckout, finalizeCheckout, updateCheckout } from "../controllers/checkout.js";


const router = express.Router();


router.post("/",protect,createCheckout)
router.put("/:id/pay",protect,updateCheckout),
router.post("/:id/finalize",finalizeCheckout)



export default router