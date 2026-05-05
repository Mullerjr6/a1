
const fs = require("fs");

const ARQUIVO = "livros.json";

/**
 * Lê o arquivo livros.json e retorna a lista de livros.
 * Se o arquivo não existir, ele cria um novo com uma lista vazia.
 * Se houver erro de leitura ou conteúdo inválido, retorna lista vazia.
 */
function lerLivros() {
  try {

    if (!fs.existsSync(ARQUIVO)) {

      fs.writeFileSync(ARQUIVO, JSON.stringify([], null, 2), "utf8");
      return [];
    }

    const dados = fs.readFileSync(ARQUIVO, "utf8");

    if (!dados.trim()) {
      return [];
    }

    const livros = JSON.parse(dados);

    if (!Array.isArray(livros)) {
      console.log("O conteúdo de livros.json não é uma lista válida.");
      return [];
    }

    return livros;
  } catch (erro) {
    console.log("Erro ao ler o arquivo de livros:", erro.message);
    return [];
  }
}

/**
 * Salva a lista de livros no arquivo livros.json
 * usando formatação legível.
 * @param {Array} livros - Lista de livros a ser salva
 */
function salvarLivros(livros) {
  try {

    fs.writeFileSync(ARQUIVO, JSON.stringify(livros, null, 2), "utf8");
  } catch (erro) {
    console.log("Erro ao salvar o arquivo de livros:", erro.message);
  }
}

/**
 * Adiciona um novo livro após validar os dados recebidos.
 * @param {string} titulo - Título do livro
 * @param {string} autor - Autor do livro
 * @param {number} ano - Ano de publicação
 * @param {boolean} lido - Indica se o livro foi lido
 */
function adicionarLivro(titulo, autor, ano, lido) {
  // Validação do título
  if (typeof titulo !== "string" || titulo.trim() === "") {
    console.log("Título inválido.");
    return;
  }

  if (typeof autor !== "string" || autor.trim() === "") {
    console.log("Autor inválido.");
    return;
  }

  if (!Number.isInteger(ano) || ano <= 0) {
    console.log("Ano inválido. Informe um número inteiro positivo.");
    return;
  }

  if (typeof lido !== "boolean") {
    console.log("O campo 'lido' deve ser true ou false.");
    return;
  }

  const livros = lerLivros();

  const novoId =
    livros.length > 0 ? Math.max(...livros.map((livro) => livro.id)) + 1 : 1;

  const novoLivro = {
    id: novoId,
    titulo: titulo.trim(),
    autor: autor.trim(),
    ano,
    lido,
  };

  livros.push(novoLivro);

  salvarLivros(livros);

  console.log(`Livro "${novoLivro.titulo}" adicionado com sucesso.`);
}

/**
 * Exibe todos os livros no console de forma organizada.
 */
function listarLivros() {
  const livros = lerLivros();

  if (livros.length === 0) {
    console.log("Nenhum livro cadastrado.");
    return;
  }

  console.log("\n=== LISTA DE LIVROS ===");

  livros.forEach((livro) => {
    console.log(`ID: ${livro.id}`);
    console.log(`Título: ${livro.titulo}`);
    console.log(`Autor: ${livro.autor}`);
    console.log(`Ano: ${livro.ano}`);
    console.log(`Lido: ${livro.lido ? "Sim" : "Não"}`);
    console.log("------------------------");
  });
}

/**
 * Localiza um livro pelo ID e marca como lido.
 * @param {number} id - ID do livro
 */
function marcarComoLido(id) {

  if (!Number.isInteger(id) || id <= 0) {
    console.log("ID inválido.");
    return;
  }

  const livros = lerLivros();

  const livro = livros.find((item) => item.id === id);

  if (!livro) {
    console.log(`Livro com ID ${id} não encontrado.`);
    return;
  }

  livro.lido = true;

  salvarLivros(livros);

  console.log(`Livro "${livro.titulo}" foi marcado como lido.`);
}

 /**

 * @param {string} autor - Nome do autor para busca
 * @returns {Array} Lista de livros encontrados
 */
function buscarPorAutor(autor) {
  if (typeof autor !== "string" || autor.trim() === "") {
    console.log("Autor inválido para busca.");
    return [];
  }

  const livros = lerLivros();

  const encontrados = livros.filter(
    (livro) => livro.autor.toLowerCase() === autor.trim().toLowerCase()
  );

  return encontrados;
}
salvarLivros([]);

adicionarLivro("A Arte da Guerra", "Sun Tzu", 500, false);
adicionarLivro("O príncipe", "Nicolau Maquiavel", 1532, true);
adicionarLivro("O Hobbit", "J.R.R. Tolkien", 1937, false);

listarLivros();

marcarComoLido(1);

listarLivros();

console.log("\n=== BUSCA POR AUTOR: Nicolau Maquiavel ===");
const livrosDoAutor = buscarPorAutor("Nicolau Maquiavel");

if (livrosDoAutor.length === 0) {
  console.log("Nenhum livro encontrado para esse autor.");
} else {
  livrosDoAutor.forEach((livro) => {
    console.log(`ID: ${livro.id} | Título: ${livro.titulo} | Ano: ${livro.ano} | Lido: ${livro.lido ? "Sim" : "Não"}`);
  });
}
