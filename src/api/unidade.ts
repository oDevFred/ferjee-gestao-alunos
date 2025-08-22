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