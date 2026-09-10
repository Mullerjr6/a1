# Cofre Nerd

Projeto acadêmico feito com React. A aplicação consulta cartas Pokémon em uma API e permite adicionar as cartas em um carrinho global.

## Tecnologias utilizadas

- React com Vite
- JavaScript
- Axios
- Redux Toolkit e React Redux
- Tailwind CSS
- CSS

## Como executar

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Organização

- `src/components/ProductList.jsx`: faz a requisição com Axios e mostra os produtos.
- `src/components/Header.jsx`: mostra a quantidade e o valor do carrinho.
- `src/components/Cart.jsx`: mostra os itens e permite limpar o carrinho.
- `src/features/cart/cartSlice.js`: possui as ações `addItem` e `clearCart`.
- `src/app/store.js`: configura a Store do Redux.
- `src/index.css`: importa o Tailwind e contém o CSS geral.

## Conteúdos demonstrados

- Requisição GET com `axios.get()`.
- Estados locais com `useState`.
- Requisição dentro de `useEffect`.
- Tratamento com `try`, `catch` e `finally`.
- Estado global com Redux Toolkit.
- Uso de `useSelector` e `useDispatch` sem prop drilling.
- Estilização responsiva com Tailwind CSS e CSS próprio.
- Valores formatados em reais.

## Assistência utilizada

Este projeto recebeu apoio de uma ferramenta de IA na organização inicial, na estilização e na revisão do código. O conteúdo deve ser estudado e apresentado conforme as regras da instituição de ensino.
