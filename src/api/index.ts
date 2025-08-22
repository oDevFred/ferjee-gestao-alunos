import express from "express";
import alunoRoutes from './routes/aluno'

const app = express();

// Middleware para aceitar JSON
app.use(express.json());
app.use(alunoRoutes);

export default app;