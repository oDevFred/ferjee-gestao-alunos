import { Request, Response } from 'express';
import prisma from '../config/prisma';

// Controller para criar unidade
export async function criarUnidade(req: Request, res: Response) {
    try {
        const unidade = await prisma.unidade.create({
        data: {
            nome: req.body.nome,
            endereco: req.body.endereco,
            responsavel: req.body.responsavel,
        },
        });
        res.status(201).json(unidade);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

export async function listarUnidades(req: Request, res: Response) {
    try {
        const unidades = await prisma.unidade.findMany();
        res.json(unidades);
    } catch (error: any) {
        res.status(500).json({ erro: error.message });
    }
}

// Buscar unidade por ID
export async function buscarUnidadePorId(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const unidade = await prisma.unidade.findUnique({
        where: { id: Number(id) }
        });
        if (!unidade) return res.status(404).json({ erro: 'Unidade não encontrada' });
        res.json(unidade);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
    }

    // Atualizar unidade
    export async function atualizarUnidade(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nome, endereco, responsavel } = req.body;
        const unidadeAtualizada = await prisma.unidade.update({
        where: { id: Number(id) },
        data: { nome, endereco, responsavel }
        });
        res.json(unidadeAtualizada);
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}

// Excluir unidade por ID
export async function deletarUnidade(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await prisma.unidade.delete({
        where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ erro: error.message });
    }
}