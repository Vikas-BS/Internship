import { getCurrentUser } from '../controllers/homeController.js';
import express from 'express';
import { verifyToken } from '../middleware/authontication.js';

const router  = express.Router()

router.get('/', verifyToken, getCurrentUser);

export default router