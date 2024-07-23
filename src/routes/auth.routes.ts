import { Router } from 'express';
import AuthController from '../controllers/auth.controllers';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.createUser);

export default router;