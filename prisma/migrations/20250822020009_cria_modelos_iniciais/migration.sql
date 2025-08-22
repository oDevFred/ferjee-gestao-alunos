/*
  Warnings:

  - Added the required column `unidadeId` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Unidade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "duracao" INTEGER NOT NULL,
    "unidadeId" INTEGER NOT NULL,
    CONSTRAINT "Curso_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AlunoCurso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunoId" INTEGER NOT NULL,
    "cursoId" INTEGER NOT NULL,
    "matriculadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AlunoCurso_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunoCurso_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "nascimento" DATETIME NOT NULL,
    "endereco" TEXT,
    "unidadeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Aluno_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "Unidade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Aluno" ("cpf", "createdAt", "email", "id", "nascimento", "nome", "telefone", "updatedAt") SELECT "cpf", "createdAt", "email", "id", "nascimento", "nome", "telefone", "updatedAt" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
