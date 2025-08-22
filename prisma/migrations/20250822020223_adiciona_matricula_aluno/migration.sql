/*
  Warnings:

  - Added the required column `matricula` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "matricula" TEXT NOT NULL,
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
INSERT INTO "new_Aluno" ("cpf", "createdAt", "email", "endereco", "id", "nascimento", "nome", "telefone", "unidadeId", "updatedAt") SELECT "cpf", "createdAt", "email", "endereco", "id", "nascimento", "nome", "telefone", "unidadeId", "updatedAt" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_matricula_key" ON "Aluno"("matricula");
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
