import { mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const caminhoBanco = fileURLToPath(
  new URL("./database/database.sqlite", import.meta.url),
);
const caminhoSchema = fileURLToPath(
  new URL("./database/schema.sql", import.meta.url),
);

async function inicializarBanco() {
  try {
    await mkdir(dirname(caminhoBanco), { recursive: true });

    const db = await open({
      filename: caminhoBanco,
      driver: sqlite3.Database,
    });

    const sql = await readFile(caminhoSchema, "utf8");
    await db.exec(sql);

    console.log("Conexão com o banco de dados SQLite estabelecida.");
    return db;
  } catch (erro) {
    console.error("Erro ao inicializar o banco de dados:", erro);
    throw erro;
  }
}

const banco = await inicializarBanco();

export { banco };
