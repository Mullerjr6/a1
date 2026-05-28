function somarAte(limite) {
  let soma = 0;
    for (let i = 1; i <= limite; i++) {
        soma += i;
    }
    return soma;
}

console.log(somarAte(5));
