import { randomUUID } from "node:crypto";
import { banco } from "./base.js";

// Estas entidades ainda usam memória; clientes são persistidos no SQLite.
const produtos = [];
const categorias = [];
const fornecedores = [];

const responderJson = (response, status, dados) => {
  response.writeHead(status);
  return response.end(JSON.stringify(dados));
};

const validarCliente = (cliente) => {
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

  return null;
};

const formatarCliente = (cliente) => ({
  ...cliente,
  ativo: Boolean(cliente.ativo),
});

const responderErroBanco = (response, erro) => {
  console.error("Erro ao acessar o banco de dados:", erro);

  if (erro.code === "SQLITE_CONSTRAINT") {
    return responderJson(response, 409, {
      erro: "Já existe um cliente com esse email.",
    });
  }

  return responderJson(response, 500, {
    erro: "Erro interno ao acessar o banco de dados.",
  });
};

const manipularClientes = async (request, response) => {
  const { method, url, body } = request;

  try {
    if (url === "/clientes" && method === "GET") {
      const clientes = await banco.all(
        "SELECT id, nome, email, telefone, ativo FROM clientes ORDER BY nome",
      );
      responderJson(response, 200, clientes.map(formatarCliente));
      return true;
    }

    if (url === "/clientes" && method === "POST") {
      const dados = body ?? {};
      const erroValidacao = validarCliente(dados);

      if (erroValidacao) {
        responderJson(response, 400, { erro: erroValidacao });
        return true;
      }

      const novoCliente = {
        id: randomUUID(),
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        telefone: dados.telefone.trim(),
        ativo: dados.ativo,
      };

      await banco.run(
        `INSERT INTO clientes (id, nome, email, telefone, ativo)
         VALUES (?, ?, ?, ?, ?)`,
        novoCliente.id,
        novoCliente.nome,
        novoCliente.email,
        novoCliente.telefone,
        Number(novoCliente.ativo),
      );

      responderJson(response, 201, {
        mensagem: "Cliente cadastrado com sucesso!",
        cliente: novoCliente,
      });
      return true;
    }

    const partesUrl = url.split("/");
    const rotaComId =
      url.startsWith("/clientes/") && partesUrl.length === 3;

    if (!rotaComId) return false;

    const id = partesUrl[2];
    const clienteAtual = await banco.get(
      "SELECT id, nome, email, telefone, ativo FROM clientes WHERE id = ?",
      id,
    );

    if (!clienteAtual) {
      responderJson(response, 404, { erro: "Registro não encontrado." });
      return true;
    }

    if (method === "PUT") {
      const clienteAtualizado = {
        ...formatarCliente(clienteAtual),
        ...(body ?? {}),
        id,
      };
      const erroValidacao = validarCliente(clienteAtualizado);

      if (erroValidacao) {
        responderJson(response, 400, { erro: erroValidacao });
        return true;
      }

      clienteAtualizado.nome = clienteAtualizado.nome.trim();
      clienteAtualizado.email = clienteAtualizado.email.trim();
      clienteAtualizado.telefone = clienteAtualizado.telefone.trim();

      await banco.run(
        `UPDATE clientes
         SET nome = ?, email = ?, telefone = ?, ativo = ?
         WHERE id = ?`,
        clienteAtualizado.nome,
        clienteAtualizado.email,
        clienteAtualizado.telefone,
        Number(clienteAtualizado.ativo),
        id,
      );

      responderJson(response, 200, {
        mensagem: "Cliente atualizado com sucesso!",
        cliente: clienteAtualizado,
      });
      return true;
    }

    if (method === "DELETE") {
      await banco.run("DELETE FROM clientes WHERE id = ?", id);
      response.writeHead(204);
      response.end();
      return true;
    }

    return false;
  } catch (erro) {
    responderErroBanco(response, erro);
    return true;
  }
};

const colecoes = {
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
  },
};

const manipularColecao = (request, response, caminho, configuracao) => {
  const { method, url, body } = request;
  const { itens, validar } = configuracao;

  if (url === caminho && method === "GET") {
    responderJson(response, 200, itens);
    return true;
  }

  if (url === caminho && method === "POST") {
    const dados = body ?? {};
    const erro = validar(dados);

    if (erro) {
      responderJson(response, 400, { erro });
      return true;
    }

    const novoItem = { ...dados, id: randomUUID() };
    itens.push(novoItem);
    responderJson(response, 201, {
      mensagem: configuracao.mensagemCriado,
      [configuracao.chaveResposta]: novoItem,
    });
    return true;
  }

  const partesUrl = url.split("/");
  if (url.startsWith(`${caminho}/`) && partesUrl.length === 3) {
    const id = partesUrl[2];
    const indice = itens.findIndex((item) => item.id === id);

    if (indice === -1) {
      responderJson(response, 404, { erro: "Registro não encontrado." });
      return true;
    }

    if (method === "PUT") {
      const itemAtualizado = { ...itens[indice], ...(body ?? {}) };
      const erro = validar(itemAtualizado, indice);

      if (erro) {
        responderJson(response, 400, { erro });
        return true;
      }

      itens[indice] = itemAtualizado;
      responderJson(response, 200, {
        mensagem: configuracao.mensagemAtualizado,
        [configuracao.chaveResposta]: itemAtualizado,
      });
      return true;
    }

    if (method === "DELETE") {
      itens.splice(indice, 1);
      response.writeHead(204);
      response.end();
      return true;
    }
  }

  return false;
};

const manipularProdutos = (request, response) => {
  const { method, url, body } = request;
  const dados = body ?? {};

  if (url === "/produtos" && method === "GET") {
    responderJson(response, 200, produtos);
    return true;
  }

  if (url === "/produtos" && method === "POST") {
    const { nome, preco, categoria } = dados;

    if (!nome || preco === undefined || !categoria) {
      responderJson(response, 400, { erro: "Dados inválidos." });
      return true;
    }

    if (!categorias.some((item) => item.id === categoria)) {
      responderJson(response, 400, {
        erro: "A categoria informada não existe.",
      });
      return true;
    }

    const novoProduto = { id: randomUUID(), nome, preco, categoria };
    produtos.push(novoProduto);
    responderJson(response, 201, {
      mensagem: "Produto cadastrado com sucesso!",
      produto: novoProduto,
    });
    return true;
  }

  const partesUrl = url.split("/");
  if (url.startsWith("/produtos/") && partesUrl.length === 3) {
    const id = partesUrl[2];
    const indice = produtos.findIndex((produto) => produto.id === id);

    if (indice === -1) {
      responderJson(response, 404, { erro: "Produto não encontrado." });
      return true;
    }

    if (method === "PUT") {
      const produtoAtualizado = {
        ...produtos[indice],
        nome: dados.nome ?? produtos[indice].nome,
        preco: dados.preco ?? produtos[indice].preco,
        categoria: dados.categoria ?? produtos[indice].categoria,
      };

      if (!categorias.some((item) => item.id === produtoAtualizado.categoria)) {
        responderJson(response, 400, {
          erro: "A categoria informada não existe.",
        });
        return true;
      }

      produtos[indice] = produtoAtualizado;
      responderJson(response, 200, {
        mensagem: "Produto atualizado com sucesso!",
        produto: produtoAtualizado,
      });
      return true;
    }

    if (method === "DELETE") {
      produtos.splice(indice, 1);
      response.writeHead(204);
      response.end();
      return true;
    }
  }

  return false;
};

export const manipuladorDeRotas = async (request, response) => {
  if (await manipularClientes(request, response)) return;

  for (const [caminho, configuracao] of Object.entries(colecoes)) {
    if (manipularColecao(request, response, caminho, configuracao)) return;
  }

  if (manipularProdutos(request, response)) return;

  responderJson(response, 404, {
    erro: "Rota ou método não encontrado.",
  });
};
