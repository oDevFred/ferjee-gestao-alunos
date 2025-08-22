import { Router } from "express";
import { criarAluno, listarAlunos, atualizarAluno, deletarAluno } from "../aluno";

const router = Router()

router.post('/alunos', criarAluno);
router.get('/alunos', listarAlunos);
router.put('/alunos/:id', atualizarAluno);
router.delete('/alunos/:id', deletarAluno);

export default router;