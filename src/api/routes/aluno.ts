import { Router } from "express";
import { criarAluno } from "../aluno";

const router = Router()

router.post('/alunos', criarAluno);

export default router;