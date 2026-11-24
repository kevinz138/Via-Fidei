var database = require("../database/config");

function listarIntencoes() {
    var instrucaoSql = `SELECT idIntencao AS id, nome FROM intencao ORDER BY idIntencao;`;
    return database.executar(instrucaoSql);
}

function listarTipos() {
    var instrucaoSql = `SELECT idTipoOracao AS id, nome FROM tipoOracao ORDER BY idTipoOracao;`;
    return database.executar(instrucaoSql);
}

function registrar(idUsuario, idIntencao, idTipo, minutos) {
    var instrucaoSql = `
        INSERT INTO oracao (fkUsuario, fkIntencao, fkTipoOracao, minutos)
        VALUES (?, ?, ?, ?);
    `;
    return database.executar(instrucaoSql, [idUsuario, idIntencao, idTipo, minutos]);
}

function pessoasHoje() {
    var instrucaoSql = `
        SELECT COUNT(DISTINCT fkUsuario) AS total
        FROM oracao
        WHERE DATE(dataHora) = CURDATE();
    `;
    return database.executar(instrucaoSql);
}

function minutosDaSemana(idUsuario) {
    var instrucaoSql = `
        SELECT COALESCE(SUM(minutos), 0) AS total
        FROM oracao
        WHERE fkUsuario = ?
          AND YEARWEEK(dataHora, 1) = YEARWEEK(CURDATE(), 1);
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

function rankingIntencoes() {
    var instrucaoSql = `
        SELECT i.nome, COUNT(o.idOracao) AS total
        FROM intencao i
        LEFT JOIN oracao o ON o.fkIntencao = i.idIntencao
        GROUP BY i.idIntencao, i.nome
        ORDER BY total DESC, i.nome
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

function totalPorTipo() {
    var instrucaoSql = `
        SELECT t.nome, COUNT(o.idOracao) AS total
        FROM tipoOracao t
        LEFT JOIN oracao o ON o.fkTipoOracao = t.idTipoOracao
        GROUP BY t.idTipoOracao, t.nome
        ORDER BY t.idTipoOracao;
    `;
    return database.executar(instrucaoSql);
}

function semanaDoUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT WEEKDAY(dataHora) AS dia, SUM(minutos) AS minutos
        FROM oracao
        WHERE fkUsuario = ?
          AND YEARWEEK(dataHora, 1) = YEARWEEK(CURDATE(), 1)
        GROUP BY WEEKDAY(dataHora);
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

function semanaDaComunidade() {
    var instrucaoSql = `
        SELECT WEEKDAY(dataHora) AS dia,
               SUM(minutos) / COUNT(DISTINCT fkUsuario) AS minutos
        FROM oracao
        WHERE YEARWEEK(dataHora, 1) = YEARWEEK(CURDATE(), 1)
        GROUP BY WEEKDAY(dataHora);
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listarIntencoes, listarTipos, registrar,
    pessoasHoje, minutosDaSemana,
    rankingIntencoes, totalPorTipo,
    semanaDoUsuario, semanaDaComunidade
};