import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken"


export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await User.findById(decoded.user._id).select("-password")
            console.log("check",req.user)
            next()
        } catch (err) {
            console.log("Token verification failed", err)
            res.status(401).json({ message: "Not Authorized,token verification failed" })
        }

    } else {
        res.status(401).json({ message: "Not Authorized,no token provided" })
    }



}

export const admin = (req, res, next) => {

    if (req.user && req.user.role === "admin") {
        // console.log("daya", req.user)
        next()
    } else {
        res.status(403).json({ message: "Not authorized as an admin" })
    }

}