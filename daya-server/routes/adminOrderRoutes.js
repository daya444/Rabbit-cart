import express from "express"
import { admin, protect } from "../middlewares/authMiddleware.js";

import { deleteOrder, getAllOrder, updateStatus } from "../controllers/adminOrder.js";


const router = express.Router()

router.get("/",protect,admin,getAllOrder)
router.put("/:id",protect,admin,updateStatus)
router.delete("/:id",protect,admin, deleteOrder)


export default router