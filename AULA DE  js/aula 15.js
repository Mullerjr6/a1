const fs = require('fs');

function registrarLog(mensagem) {
    const data = new Date().toISOString();
    const log = `[${data}] ${mensagem}\n`;
    fs.appendFileSync('log.txt', log);
}

registrarLog('Iniciando o programa');
registrarLog('Produto adicionado com sucesso');
registrarLog('Erro ao calcular desconto');
