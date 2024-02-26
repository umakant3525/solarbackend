import express from 'express';
import { createAdmin, signinAdmin, signoutAdmin, createUserByAdmin, signinUser ,signoutUser} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/createadmin', createAdmin);
router.post('/signinadmin', signinAdmin);
router.get('/signoutadmin', signoutAdmin);

router.post('/createuser', createUserByAdmin);
router.post('/signinuser', signinUser);
router.get('/signoutuser', signoutUser);
export default router;
