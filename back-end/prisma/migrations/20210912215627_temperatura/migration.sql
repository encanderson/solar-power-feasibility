-- CreateTable
CREATE TABLE "Temperatura" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ESCOLHA" TEXT NOT NULL,
    "Cidade" TEXT NOT NULL,
    "UF" TEXT NOT NULL,
    "JANEIRO" REAL NOT NULL,
    "FEVEREIRO" REAL NOT NULL,
    "MARCO" REAL NOT NULL,
    "ABRIL" REAL NOT NULL,
    "MAIO" REAL NOT NULL,
    "JUNHO" REAL NOT NULL,
    "JULHO" REAL NOT NULL,
    "AGOSTO" REAL NOT NULL,
    "SETEMBRO" REAL NOT NULL,
    "OUTUBRO" REAL NOT NULL,
    "NOVEMBRO" REAL NOT NULL,
    "DEZEMBRO" REAL NOT NULL,
    "Tmin" REAL NOT NULL,
    "Tmax" REAL NOT NULL
);