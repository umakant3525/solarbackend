import express from 'express';
import { deleteAdmin, getAdmin, getAllAdmin, updateAdmin } from '../controllers/admin.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/getalladmin', getAllAdmin)
router.get('/getadmin/:id', getAdmin)
router.post('/updateadmin/:id', updateAdmin)
router.delete('/deleteadmin/:id', deleteAdmin)
export default router;
