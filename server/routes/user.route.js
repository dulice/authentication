import express from 'express';
import { deleteUser, getEmail, login, register, sendMail, sendOTP, updateUser, verifyOTP } from '../controllers/user.controller.js';
import { VerifyToken, localVariables } from '../config.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/sendOTP', localVariables, sendOTP);
router.put('/email', getEmail)
router.post('/sendMail', sendMail);
router.post('/verifyOTP', verifyOTP);
router.put('/updatePassword', VerifyToken, updateUser);
router.delete('/:id', deleteUser);

export default router;