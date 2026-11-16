var database = require("../database/config");

// Sacramentos que ESTE usuário marcou
function buscarDoUsuario(idUsuario) {
    var instrucaoSql = `
        SELECT s.nome
        FROM usuarioSacramento us
        JOIN sacramento s ON s.idSacramento = us.fkSacramento
        WHERE us.fkUsuario = ?;
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

// % de usuários que já receberam cada sacramento (média da comunidade)
function buscarComunidade() {
    var instrucaoSql = `
        SELECT s.nome,
               COUNT(us.fkUsuario) * 100 / GREATEST((SELECT COUNT(*) FROM usuario), 1) AS percentual
        FROM sacramento s
        LEFT JOIN usuarioSacramento us ON us.fkSacramento = s.idSacramento
        GROUP BY s.idSacramento, s.nome
        ORDER BY s.idSacramento;
    `;
    return database.executar(instrucaoSql);
}

function limparDoUsuario(idUsuario) {
    var instrucaoSql = `DELETE FROM usuarioSacramento WHERE fkUsuario = ?;`;
    return database.executar(instrucaoSql, [idUsuario]);
}

// recebe os NOMES, ex.: ['Batismo', 'Crisma']
function inserirDoUsuario(idUsuario, nomes) {
    var instrucaoSql = `
        INSERT INTO usuarioSacramento (fkUsuario, fkSacramento)
        SELECT ?, idSacramento FROM sacramento WHERE nome IN (?);
    `;
    return database.executar(instrucaoSql, [idUsuario, nomes]);
}

module.exports = { buscarDoUsuario, buscarComunidade, limparDoUsuario, inserirDoUsuario };