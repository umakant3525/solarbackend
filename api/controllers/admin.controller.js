import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const getAllAdmin = async (req, res, next) => {
  try {
    const admins = await Admin.find({}); // Fetch all admins
    
    if (!admins || admins.length === 0) {
      return next(errorHandler(404, 'Admins not found!')); // Handle case where no admins are found
    }
    
    res.status(200).json(admins); // Return admins array
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id); // Find admin by ID
    
    if (!admin) {
      return next(errorHandler(404, 'Admin not found!')); // Handle case where admin is not found
    }
  
    const { password: pass, ...rest } = admin._doc; // Omit password from response
  
    res.status(200).json(rest); // Return admin details
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
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

    const { password, ...rest } = updatedAdmin._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    await Admin.findByIdAndDelete(req.params.id); // Find admin by ID and delete
    // Assuming you're not using access tokens for admin authentication
    res.status(200).json('Admin has been deleted successfully!'); // Send success message
  } catch (error) {
    next(error); // Pass any errors to the error handling middleware
  }
};
