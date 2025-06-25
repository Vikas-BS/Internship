import express from 'express';
import { loginUser, registerUser, googleLogin , setPassword} from '../controllers/authController.js';


const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google-login', googleLogin);
router.post('/set-password', setPassword);


export default router;
