import express from 'express';
import { addExpense, getExpense } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/authontication.js';
const router = express.Router();

router.post('/',verifyToken,addExpense);
router.get('/',verifyToken,getExpense);

export default router;