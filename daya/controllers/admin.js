import { User } from "../model/userModel.js";

// get user for admin 
// /api/admin/users
export const getAdminUser = async (req,res)=>{
  try {
    const user = await User.find({})
    res.json(user)
    
  } catch (error) {
    console.error(error)
    res.status(500).json({messsage : "Server Error"})
  }

}

// post /api/admin/users
//private admin users only

export const addUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create a new user
      const user = new User({
        name,
        email,
        password, 
        role: role || "customer", // Default role is "user"
      });
  
      await user.save();
  
      res.status(201).json({ message: "User added successfully" ,user});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
};

export const updateUser = async (req, res) => {
    const { name, email, role } = req.body;

    try {
        let user = await User.findById(req.params.id); 

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        // Update only if new values are provided
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        // Save the updated user
        await user.save();

        res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params; // Get user ID from URL parameter

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "No user found with this ID" });
        }

        await User.deleteOne({ _id: id });

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


  