function mostrarUsuarios(lista) {
    lista.forEach(usuario => {
    console.log(usuario.name);
});
}

async function carregarUsuarios() {
    try {
const resposta = await fetch("https://jsonplaceholder.typicode.com/users")
if (!resposta.ok) throw new Error("erro");
const dados = await resposta.json()
mostrarUsuarios(dados);
    } catch (erro) {
        console.log("falha:",erro.message);
    }
}
carregarUsuarios();

