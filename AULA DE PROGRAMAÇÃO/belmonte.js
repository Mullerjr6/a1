const produtos = [
  { nome: "Teclado", preco: 120 },
  { nome: "Mouse", preco: 80 },
  { nome: "Monitor", preco: 900 },
  { nome: "Headset", preco: 250 }
];

const produtosOrdenados = produtos.sort((a, b) => b.preco - a.preco);

const valorTotal = produtos.reduce((total, produto) => total + produto.preco, 0);

console.log("Produtos ordenados (mais caro → mais barato):");
console.log(produtosOrdenados);

console.log("Valor total dos produtos:");
console.log(valorTotal);