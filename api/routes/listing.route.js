import express from 'express';
import { createListing, deleteListing, updateListing , getListing, getListings } from '../controllers/listing.controller.js';
//import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/createlist', createList);
router.delete('/deletelist/:id', deleteList);
router.post('/updatelist/:id', updateList);
router.get('/getlist/:id', getList)
router.get('/getalllst', getList);

export default router;
  