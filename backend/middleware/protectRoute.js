 
// import jwt from "jsonwebtoken"
// import {User} from "../models/user.model.js"

// export const protectRoute = async(req,res,next) =>{
//     try{
//         const token = req.cookies.jwt
//         if(!token){
//             return res.status(400).json({message:"Unauthrozied- No token provided"})
//         }
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         if(!decoded){
//             return res.status(400).json({message:"Unauthrozied- No token provided"})
//         }

//         const user = await User.findById(decoded.userId).select("-password")
//         if(!user){
//             return res.status(400).json({message:"User not found"})
//         }
//         req.user = user
//         next()
//     }catch(error){
//         return res.status(500).json({message:"Internal Server error"})
//     }

// }

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    let token;

    // Read from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(400).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
