import { randomUUID } from "crypto";

// Banco de dados em memória
const produtos = [];
const clientes = [];
const categorias = [];
const fornecedores = [];

const responderJson = (response, status, dados) => {
  response.writeHead(status);
  return response.end(JSON.stringify(dados));
};

const colecoes = {
  "/clientes": {
    itens: clientes,
    chaveResposta: "cliente",
    validar: (cliente, indiceAtual = -1) => {
      if (
        typeof cliente.nome !== "string" ||
        !cliente.nome.trim() ||
        typeof cliente.email !== "string" ||
        !cliente.email.trim() ||
        typeof cliente.telefone !== "string" ||
        !cliente.telefone.trim() ||
        typeof cliente.ativo !== "boolean"
      ) {
        return "Dados inválidos. Informe nome, email, telefone e ativo.";
      }

      const emailEmUso = clientes.some(
        (item, indice) =>
          indice !== indiceAtual &&
          item.email.trim().toLowerCase() ===
            cliente.email.trim().toLowerCase(),
      );

      return emailEmUso ? "Já existe um cliente com esse email." : null;
    },
    statusErro: (mensagem) =>
      mensagem.startsWith("Já existe") ? 409 : 400,
    mensagemCriado: "Cliente cadastrado com sucesso!",
    mensagemAtualizado: "Cliente atualizado com sucesso!",
    mensagemRemovido: "Cliente removido com sucesso!",
  },
  "/categorias": {
    itens: categorias,
    chaveResposta: "categoria",
    validar: (categoria) =>
      typeof categoria.nome === "string" &&
      categoria.nome.trim() &&
      typeof categoria.descricao === "string" &&
      categoria.descricao.trim()
        ? null
        : "Dados inválidos. Informe nome e descrição.",
    mensagemCriado: "Categoria cadastrada com sucesso!",
    mensagemAtualizado: "Categoria atualizada com sucesso!",
    mensagemRemovido: "Categoria removida com sucesso!",
  },
  "/fornecedores": {
    itens: fornecedores,
    chaveResposta: "fornecedor",
    validar: (fornecedor) => {
      if (
        typeof fornecedor.razaoSocial !== "string" ||
        !fornecedor.razaoSocial.trim() ||
        typeof fornecedor.contato !== "string" ||
        !fornecedor.contato.trim()
      ) {
        return "Dados inválidos. Informe razão social e contato.";
      }

      if (
        typeof fornecedor.cnpj !== "string" ||
        !/^\d{14}$/.test(fornecedor.cnpj)
      ) {
        return "CNPJ inválido. Informe exatamente 14 números.";
      }

      return null;
    },
    mensagemCriado: "Fornecedor cadastrado com sucesso!",
    mensagemAtualizado: "Fornecedor atualizado com sucesso!",
    mensagemRemovido: "Fornecedor removido com sucesso!",
  },
};

const manipularColecao = (request, response, caminho, configuracao) => {
  const { method, url, body } = request;
  const { itens, validar } = configuracao;

  if (url === caminho && method === "GET") {
    return responderJson(response, 200, itens);
  }

  if (url === caminho && method === "POST") {
    const dados = body ?? {};
    const erro = validar(dados);

    if (erro) {
      const status = configuracao.statusErro?.(erro) ?? 400;
      return responderJson(response, status, { erro });
    }

    const novoItem = { ...dados, id: randomUUID() };
    itens.push(novoItem);

    return responderJson(response, 201, {
      mensagem: configuracao.mensagemCriado,
      [configuracao.chaveResposta]: novoItem,
    });
  }

  const partesUrl = url.split("/");
  if (url.startsWith(`${caminho}/`) && partesUrl.length === 3) {
    const id = partesUrl[2];
    const indice = itens.findIndex((item) => item.id === id);

    if (indice === -1) {
      return responderJson(response, 404, { erro: "Registro não encontrado." });
    }

    if (method === "PUT") {
      const itemAtualizado = { ...itens[indice], ...(body ?? {}) };
      const erro = validar(itemAtualizado, indice);

      if (erro) {
        const status = configuracao.statusErro?.(erro) ?? 400;
        return responderJson(response, status, { erro });
      }

      itens[indice] = itemAtualizado;
      return responderJson(response, 200, {
        mensagem: configuracao.mensagemAtualizado,
        [configuracao.chaveResposta]: itemAtualizado,
      });
    }

    if (method === "DELETE") {
      itens.splice(indice, 1);
      response.writeHead(204);
      return response.end();
    }
  }

  return false;
};

export const manipuladorDeRotas = (request, response) => {
  for (const [caminho, configuracao] of Object.entries(colecoes)) {
    const resposta = manipularColecao(request, response, caminho, configuracao);
    if (resposta !== false) return resposta;
  }

  const { method, url, body } = request;
  const dados = body ?? {};

  // 1. READ (Listar todos os produtos)
  if (url === "/produtos" && method === "GET") {
    return responderJson(response, 200, produtos);
  }

  // 2. CREATE (Cadastrar um novo produto)
  if (url === "/produtos" && method === "POST") {
    const { nome, preco, categoria } = dados;

    if (!nome || preco === undefined || !categoria) {
      return responderJson(response, 400, { erro: "Dados inválidos." });
    }

    if (!categorias.some((item) => item.id === categoria)) {
      return responderJson(response, 400, {
        erro: "A categoria informada não existe.",
      });
    }

    const novoProduto = {
      id: randomUUID(),
      nome,
      preco,
      categoria,
    };

    produtos.push(novoProduto);

    return responderJson(response, 201, {
      mensagem: "Produto cadastrado com sucesso!",
      produto: novoProduto,
    });
  }

  // Rotas com parâmetro (Ex: /produtos/123-456-789)
  const partesUrl = url.split("/");
  const isRotaProdutoComId =
    url.startsWith("/produtos/") && partesUrl.length === 3;

  if (isRotaProdutoComId) {
    const id = partesUrl[2];
    const indexProduto = produtos.findIndex((produto) => produto.id === id);

    if (indexProduto === -1) {
      return responderJson(response, 404, {
        erro: "Produto não encontrado.",
      });
    }

    if (method === "PUT") {
      const { nome, preco, categoria } = body ?? {};
      const produtoAtualizado = {
        ...produtos[indexProduto],
        nome: nome ?? produtos[indexProduto].nome,
        preco: preco ?? produtos[indexProduto].preco,
        categoria: categoria ?? produtos[indexProduto].categoria,
      };

      if (!categorias.some((item) => item.id === produtoAtualizado.categoria)) {
        return responderJson(response, 400, {
          erro: "A categoria informada não existe.",
        });
      }

      produtos[indexProduto] = produtoAtualizado;
      return responderJson(response, 200, {
        mensagem: "Produto atualizado com sucesso!",
        produto: produtoAtualizado,
      });
    }

    if (method === "DELETE") {
      produtos.splice(indexProduto, 1);
      response.writeHead(204);
      return response.end();
    }
  }

  // Rota 404 (Fallback)
  return responderJson(response, 404, {
    erro: "Rota ou método não encontrado.",
  });
};
