import express from 'express';
import { addExpense, getExpense } from '../controllers/expenseController.js';
import { verifyToken } from '../middleware/authontication.js';
const router = express.Router();

router.post('/expense',verifyToken,addExpense);
router.post('/',verifyToken,getExpense);

export default router;