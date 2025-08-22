import { Router } from 'express';
import { criarUnidade, listarUnidades } from '../unidade';

const router = Router();

router.post('/unidades', criarUnidade);
router.get('/unidades', listarUnidades);

export default router;