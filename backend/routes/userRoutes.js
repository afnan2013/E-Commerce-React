import express from 'express';
const router = express.Router();

import { userAuth, getUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middlwares/authMiddeware.js';

router.post('/login', userAuth);
router.route('/profile').get(protect, getUserProfile);

export default router;
