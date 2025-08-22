# FERJEE - Sistema de Gestão de Alunos

Este projeto é um sistema de gestão de alunos para a Federação do Estado do Rio de Janeiro de Esportes Eletrônicos (FERJEE).

## Funcionalidades
- Cadastro, listagem, edição e exclusão de alunos
- Cadastro, listagem, edição e exclusão de unidades
- Geração automática de matrícula para alunos
- Integração frontend (HTML + TailwindCSS + JS) com backend (Node.js + Express + TypeScript)
- Banco de dados SQLite gerenciado via Prisma ORM
- API RESTful
- Docker para ambiente de desenvolvimento

## Como rodar o projeto

### 1. Clonar o repositório
```sh
git clone <url-do-repo>
cd ferjee-gestao-alunos
```

### 2. Instalar dependências
```sh
npm install
```

### 3. Rodar as migrações do banco
```sh
npx prisma migrate dev
```

### 4. Rodar o projeto em desenvolvimento
```sh
npm run dev
```

### 5. Acessar o sistema
- Frontend: http://localhost:3000/alunos.html, http://localhost:3000/unidades.html, http://localhost:3000/lista-alunos.html
- API: endpoints REST em http://localhost:3000

### 6. Usar com Docker (opcional)
```sh
docker-compose up --build
```

## Estrutura de pastas
```
public/         # Frontend estático
src/            # Backend (Express + TypeScript)
prisma/         # Schema e migrações do Prisma
```

## Scripts úteis
- `npm run dev`: inicia o servidor em modo desenvolvimento
- `npm run build`: compila o TypeScript
- `npm start`: executa o JS compilado

## Observações
- O número de matrícula do aluno é gerado automaticamente ao cadastrar.
- Para cadastrar um aluno, é necessário ter pelo menos uma unidade cadastrada.

---

Desenvolvido para a FERJEE com foco em boas práticas, escalabilidade e aprendizado.
