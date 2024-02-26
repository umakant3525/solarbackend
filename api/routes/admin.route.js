import express from 'express';
import {updateAdmin} from '../controllers/admin.controller.js';
import verifyToken from '../utils/verifyToken.js'

const router = express.Router();

router.post('/updateadmin/:id', verifyToken, update)
router.delete('/delete/:id', , deleteUser)

export default router;
