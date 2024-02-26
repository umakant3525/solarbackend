import express from 'express';
import{ createList, getOneList, getAllListings , updateListing, deleteListing} from '../controllers/listing.controller.js'

const router = express.Router();


router.post('/createlist', createList);
 router.get('/getlist/:id', getOneList);
  router.get('/getalllist', getAllListings);
 router.post('/updatelist/:id', updateListing);
 router.delete('/deletelist/:id',deleteListing );
export default router;

