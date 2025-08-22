import express from "express";
import path from "path";
import alunoRoutes from './routes/alunoRoute';
import unidadeRoutes from './routes/unidadeRoute';

const app = express();

// Middleware para aceitar JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, '../../public')));

app.use(alunoRoutes);
app.use(unidadeRoutes);

export default app;