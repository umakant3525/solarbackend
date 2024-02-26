import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "../models/admin.model.js";
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const createAdmin = async (req, res, next) => {
    try {
        const { username, mobile, email, password, avatar } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Create a new admin
        const newAdmin = new Admin({ username, mobile, email, password: hashedPassword, avatar });
        await newAdmin.save();

        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
      next(error);
    }
};

export const signinAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await Admin.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Invalid Password or email'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const signoutAdmin = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('Admin has been logged out!');
    } catch (error) {
        next(error);
    }
};


export const createUserByAdmin = async (req, res, next) => {
   try {
       const { username, mobile, email, password, avatar, plantname, address } = req.body;

       // Check if the user already exists
       const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.status(400).json({ message: "User already exists" });
       }

       // Create a new user
       const hashedPassword = bcryptjs.hashSync(password, 10);
       const newUser = new User({ 
           username, 
           mobile, 
           email, 
           password: hashedPassword, 
           avatar, 
           plantname,
           address
       });
       await newUser.save();

       res.status(201).json({ message: "User created successfully", user: newUser });
   } catch (error) {
     next(error);
   }
};


export const signinUser = async (req, res, next) => {
   const { email, password } = req.body;

   try {
       const validUser = await  User.findOne({ email });
       if (!validUser) return next(errorHandler(404, 'User not found'));

       const validPassword = await bcryptjs.compare(password, validUser.password);
       if (!validPassword) return next(errorHandler(401, 'Invalid Password or email'));

       const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
       const { password: pass, ...rest } = validUser._doc;
       res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json(rest);
   } catch (error) {
       next(error);
   }
};


export const signoutUser = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
};
