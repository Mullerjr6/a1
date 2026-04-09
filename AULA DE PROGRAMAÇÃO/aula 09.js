class Veiculo {
    constructor(marca, ano) {
        this.marca = marca;
        this.ano = ano;
    }
    info() {
        return `Marca: ${this.marca}, Ano: ${this.ano}`;
    }   
}

class Carro extends Veiculo {
    constructor(marca, ano, portas) {
        super(marca, ano);
        this.portas = portas;
    }
    info() {
        return `${super.info()}, Portas: ${this.portas}`;
    }
}

    class Moto extends Veiculo {
        constructor(marca, ano, cilindradas) {
            super(marca, ano);
            this.cilindradas = cilindradas;
        }
        info() {
            return `${super.info()}, Cilindradas: ${this.cilindradas}`;
        }
    }

const meuCarro = new Carro("Toyota", 2024, 4);
const minhaMoto = new Moto("Honda", 2023, 600);
console.log(meuCarro.info());
console.log(minhaMoto.info());