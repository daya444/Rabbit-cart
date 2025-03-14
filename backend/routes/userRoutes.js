
import express from "express"

import { login, profile, register } from "../controllers/userRegister.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

// post request for user

router.post("/register",register)
router.post("/login",login)
router.get('/profile',protect, profile)

   

 export default router