var database = require("../database/config");

// ---------- listas para os <select> ----------
function listarIntencoes() {
    var instrucaoSql = `SELECT idIntencao AS id, nome FROM intencao ORDER BY idIntencao;`;
    return database.executar(instrucaoSql);
}

function listarTipos() {
    var instrucaoSql = `SELECT idTipoOracao AS id, nome FROM tipoOracao ORDER BY idTipoOracao;`;
    return database.executar(instrucaoSql);
}

// ---------- gravar ----------
function registrar(idUsuario, idIntencao, idTipo, minutos) {
    var instrucaoSql = `
        INSERT INTO oracao (fkUsuario, fkIntencao, fkTipoOracao, minutos)
        VALUES (?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [idUsuario, idIntencao, idTipo, minutos]);
}