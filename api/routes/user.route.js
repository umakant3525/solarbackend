import express from 'express';
import {  deleteUser, getAllUser, getUser, updateUser } from '../controllers/user.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

const test = (req,res,next) =>{
    console.log('Middleware is working');
}

router.get('/getalluser', getAllUser)
router.get('/getuser/:id', getUser)
router.post('/updateuser/:id', updateUser)
router.delete('/deleteuser/:id', deleteUser)
export default router;
