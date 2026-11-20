var oracaoModel = require("../models/oracaoModel");

// função auxiliar: evita repetir o mesmo .catch em todo lugar
function erro500(res, erro) {
    console.log(erro);
    res.status(500).json(erro.sqlMessage || String(erro));
}

// GET /oracoes/opcoes  ->  { intencoes: [...], tipos: [...] }
function opcoes(req, res) {
    Promise.all([oracaoModel.listarIntencoes(), oracaoModel.listarTipos()])
        .then(function (r) { res.json({ intencoes: r[0], tipos: r[1] }); })
        .catch(function (erro) { erro500(res, erro); });
}

// POST /oracoes/registrar
function registrar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var idIntencao = req.body.intencaoServer;
    var idTipo = req.body.tipoServer;
    var minutos = Number(req.body.minutosServer);

    if (idUsuario == undefined || idIntencao == undefined || idTipo == undefined || !(minutos > 0)) {
        res.status(400).send("Dados inválidos!");
        return;
    }

    oracaoModel.registrar(idUsuario, idIntencao, idTipo, minutos)
        .then(function () { res.status(200).json({ ok: true }); })
        .catch(function (erro) { erro500(res, erro); });
}

// GET /oracoes/resumo/:idUsuario  ->  { pessoasHoje: 128, minutosSemana: 95 }
function resumo(req, res) {
    var idUsuario = req.params.idUsuario;
    Promise.all([oracaoModel.pessoasHoje(), oracaoModel.minutosDaSemana(idUsuario)])
        .then(function (r) {
            res.json({ pessoasHoje: Number(r[0][0].total), minutosSemana: Number(r[1][0].total) });
        })
        .catch(function (erro) { erro500(res, erro); });
}

// GET /oracoes/intencoes  ->  [ { nome, total }, ... ]
function intencoes(req, res) {
    oracaoModel.rankingIntencoes()
        .then(function (r) { res.json(r); })
        .catch(function (erro) { erro500(res, erro); });
}

// GET /oracoes/tipos  ->  [ { nome, total }, ... ]
function tipos(req, res) {
    oracaoModel.totalPorTipo()
        .then(function (r) { res.json(r); })
        .catch(function (erro) { erro500(res, erro); });
}

// GET /oracoes/semana/:idUsuario  ->  { voce: [{dia, minutos}], comunidade: [{dia, minutos}] }
function semana(req, res) {
    var idUsuario = req.params.idUsuario;
    Promise.all([oracaoModel.semanaDoUsuario(idUsuario), oracaoModel.semanaDaComunidade()])
        .then(function (r) { res.json({ voce: r[0], comunidade: r[1] }); })
        .catch(function (erro) { erro500(res, erro); });
}

module.exports = { opcoes, registrar, resumo, intencoes, tipos, semana };