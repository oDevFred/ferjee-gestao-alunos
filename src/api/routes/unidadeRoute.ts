import { Router } from 'express';
import { atualizarUnidade, criarUnidade, listarUnidades, buscarUnidadePorId, deletarUnidade } from '../unidade';
import { buscarAlunoPorId } from '../aluno';

const router = Router();

// Post
router.post('/unidades', criarUnidade);

// Get
router.get('/unidades', listarUnidades);
router.get('/unidades/:id', buscarUnidadePorId)

// Put
router.put('/unidades/:id', atualizarUnidade);

// Delete
router.delete('/unidades/:id', deletarUnidade);

export default router;