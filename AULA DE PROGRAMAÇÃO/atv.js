class Usuario {
  #email;
  #senha;

  constructor(nome, email, senha) {
    this.nome = nome;
    this.#email = email;
    this.setSenha(senha);
  }

  get email() {
    return this.#email;
  }


  setSenha(novaSenha) {
    if (novaSenha.length < 8) {
      throw new Error("A senha deve ter no mínimo 8 caracteres.");
    }
    this.#senha = novaSenha;
  }

  autenticar(senha) {
    return this.#senha === senha;
  }

  info() {
    return {
      nome: this.nome,
      email: this.#email

    };
  }
}

const user = new Usuario("João", "joao@email.com", "12345678");

console.log(user.email); // getter
console.log(user.autenticar("12345678")); // true