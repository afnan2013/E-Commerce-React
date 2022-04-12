import express from 'express';
import { saveOrder } from '../controllers/orderController.js';
import { protect } from '../middlwares/authMiddeware.js';

const router = express.Router();

router.route('/').post(protect, saveOrder);

export default router;
