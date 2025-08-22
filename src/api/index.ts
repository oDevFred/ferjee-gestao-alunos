import express from "express";

const app = express();

// Middleware para aceitar JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send('API FERJEE rodando! 🚀')
});

export default app;