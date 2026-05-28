const fs = require('fs');
const path = require('node:path');

const caminho = path.join(__dirname, 'aula 09 json.json');
const jsonString = fs.readFileSync(caminho, 'utf-8');
try {
 const obj = JSON.parse(jsonString);
const compacto = JSON.stringify(obj);
console.log(compacto);

const formatado = JSON.stringify(obj, null, 2);
console.log(formatado);
const parcial = JSON.stringify({
    nome: obj.nome,
    email: obj.email
}, null, 2);
console.log(parcial);
    console.log(dadosBasicos);
} catch (error) {
  console.error('JSON inválido:', error);
}
const obj = JSON.parse(jsonString);
localStorage.setItem('dadosBasicos', JSON.stringify(
    'usuario', JSON.stringify(obj)));
    const usuarioSalvo = localStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioSalvo);
    console.log(usuario.nome);
    console.log(usuario.email);
    localStorage.removeItem('usuario');
    localStorage.clear();
    const dadosBasicos = {
        nome: obj.nome,
        email: obj.email
    };
    localStorage.setItem('dadosBasicos', JSON.stringify(dadosBasicos));
    const dadosSalvos = localStorage.getItem('dadosBasicos');
    const dados = JSON.parse(dadosSalvos);
    console.log(dados.nome);
    console.log(dados.email);
    localStorage.removeItem('dadosBasicos');
    localStorage.clear();

