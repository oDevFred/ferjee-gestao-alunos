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

export async function listarAlunos(req: Request, res: Response) {
    try {
        const alunos = await prisma.aluno.findMany({
            include: { unidade: true }
        });
        res.json(alunos);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
}

export async function atualizarAluno(req: Request, res: Response) {
    try{
        const { id } = req.params;
        const dados = req.body;

        // Evita alteração de campos sensíveis
        delete dados.id;
        delete dados.matricula;

        if (dados.nascimento) {
            dados.nascimento = new Date(dados.nascimento)
        }

        const alunoAtualizado = await prisma.aluno.update({
            where: { id: Number(id) },
            data: dados,
        });
        res.json(alunoAtualizado);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

// Remove um aluno pelo ID
export async function deletarAluno(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await prisma.aluno.delete({
        where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

// Buscar aluno
export async function buscarAlunoPorId(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const aluno = await prisma.aluno.findUnique({
            where: { id: Number(id) }
        });
        if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
        res.json(aluno);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}