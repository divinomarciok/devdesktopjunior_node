import {Router} from 'express';
import {receberCep} from '../controllers/controller.js'; 

const router = Router();

router.post('/cep',receberCep)

export default router;