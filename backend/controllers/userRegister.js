import { User } from "../model/userModel.js";
import jwt from "jsonwebtoken"


export const register = async (req,res)=> {
    const {name,password,email} = req.body;
    try {
       
        let user = await User.findOne({email})
        if(user){
           return  res.status(400).json({message : "User already exits"})
        }
        user =  new User({name,password,email});
        await user.save()

    // Create JWT token
    const payload = { user: { _id: user._id, role: user.role } };
  
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

  

        res.status(201).json({
            user : {
                _id : user._id,
                name : user.name,
                email: user.email,
                role : user.role
            },
            token
        })
    

    }catch (err) {
        console.error("Error in Register:", err);  
        res.status(500).json({ message: "Server error", error: err.message });
    }
    

}

export const login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        let user = await User.findOne({email})

        if(!user){
            return res.status(401).json({message : "Invalid credentials"})
        }

        // check password

         let isMatch =  await user.comparePassword(password)

         if(!isMatch){
            return res.status(401).json({message : "Invalid Password"})
         }

          // Create JWT token
    const payload = { user: { _id: user._id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

  

        res.json({
            user : {
                _id : user._id,
                name : user.name,
                email: user.email,
                role : user.role
            },
            token
        })





    }catch (err){
        console.error("Error in Login:", err);  
        res.status(500).json({ message: "Server error", error: err.message });

    }

}

export const profile = async (req,res)=>{
    res.json(req.user)
}
