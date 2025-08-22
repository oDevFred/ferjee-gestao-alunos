import { Request, Response } from "express";
import prisma from "../config/prisma";

// Função utilitária para gerar matrícula
function gerarMatricula(id: number): string {
    const ano = new Date().getFullYear();
    return `${ano}-${id.toString().padStart(4, '0')}`;
}

// Controller de cadastro de aluno
export async function criarAluno(req: Request, res: Response) {
    try {
        // Cria o aluno sem matrícula (será atualizada depois)
        const novoAluno = await prisma.aluno.create({
            data: {
                nome: req.body.nome,
                cpf: req.body.cpf,
                email: req.body.email,
                telefone: req.body.telefone,
                nascimento: new Date(req.body.nascimento),
                endereco: req.body.endereco,
                unidadeId: req.body.unidadeId,
                matricula: 'TEMP', // Valor temporário, será atualizado depois
            },
        });

        // Gera a matrícula baseado no ID gerado
        const matricula = gerarMatricula(novoAluno.id);

        // Atualiza o aluno com a matrícula correta
        const alunoComMatricula = await prisma.aluno.update({
            where: { id: novoAluno.id },
            data: { matricula },
        });

        res.status(201).json(alunoComMatricula);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}