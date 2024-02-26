import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
 import bcryptjs from 'bcryptjs'



export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({}); 
    
    if (!users || users.length === 0) {
      return next(errorHandler(404, 'Users not found!')); 
    }
    
    res.status(200).json(users); 
  } catch (error) {
    next(error); 
  }
};



export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id);
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

  export const updateUser = async (req, res, next) => {
    try {
      if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );
  
      const { password, ...rest } = updatedUser._doc;
  
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

  

  export const deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id); // Find user by ID and delete
      res.clearCookie('access_token'); // Clear access token cookie
      res.status(200).json('User has been deleted successfully!'); // Send success message
    } catch (error) {
      next(error); // Pass any errors to the error handling middleware
    }
  };
  
  


