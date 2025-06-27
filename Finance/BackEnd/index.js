import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import incomeRoutes from './routes/inc.js'
import expenseRoutes from './routes/exp.js'
import homeRoutes from './routes/home.js'
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/home',homeRoutes);
app.use('/api/user',userRoutes);



const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
