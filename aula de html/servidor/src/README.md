# API com Node.js e SQLite

API REST desenvolvida com o módulo HTTP nativo do Node.js. Os clientes são
armazenados de forma persistente em um banco SQLite.

## Como executar

É necessário ter o Node.js instalado. No terminal, entre nesta pasta e execute:

```bash
npm install
npm start
```

O servidor ficará disponível em `http://localhost:3000`. Na primeira execução,
o arquivo `database/database.sqlite` e a tabela `clientes` serão criados
automaticamente. A conexão é configurada em `base.js`, que executa as instruções
de `database/schema.sql` ao iniciar o servidor.

## Rotas de clientes

- `GET /clientes`: lista todos os clientes.
- `POST /clientes`: cadastra um cliente.
- `PUT /clientes/:id`: atualiza um cliente.
- `DELETE /clientes/:id`: exclui um cliente.

Exemplo de corpo para cadastro:

```json
{
  "nome": "Ana Silva",
  "email": "ana@email.com",
  "telefone": "11999999999",
  "ativo": true
}
```

Os dados de `categorias`, `fornecedores` e `produtos` continuam em memória.
