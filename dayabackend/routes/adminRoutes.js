import express from "express"
import { admin, protect } from "../middlewares/authMiddleware.js";
import { addUser, deleteUser, getAdminUser, updateUser } from "../controllers/admin.js";

const router =express.Router()

router.get("/",protect,admin,getAdminUser)
router.post("/",protect,admin,addUser)
router.put("/:id",protect,admin,updateUser)
router.delete("/:id",protect,admin,deleteUser)



export default router