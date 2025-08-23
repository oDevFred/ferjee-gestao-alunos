import { Router } from "express";
import { criarAluno, listarAlunos, atualizarAluno, deletarAluno, buscarAlunoPorId } from "../aluno";

const router = Router()

// Post
router.post('/alunos', criarAluno);

// Get
router.get('/alunos', listarAlunos);
router.get('/alunos/:id', buscarAlunoPorId);

// Put
router.put('/alunos/:id', atualizarAluno);

// Delete
router.delete('/alunos/:id', deletarAluno);

export default router;