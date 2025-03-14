import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const UserSchema = mongoose.Schema({
    
    name : {
        type: String,
        required : true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] 
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin", "customer"], 
        default: "customer" 
    }
},
 {timestamps : true}
)

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Method to compare password
  UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
export  const User = mongoose.model("User", UserSchema);
  
