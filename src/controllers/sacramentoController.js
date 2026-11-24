var sacramentoModel = require("../models/sacramentoModel");

function buscarDoUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    sacramentoModel.buscarDoUsuario(idUsuario)
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage || String(erro));
        });
}

function buscarComunidade(req, res) {
    sacramentoModel.buscarComunidade()
        .then(function (resultado) { res.json(resultado); })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage || String(erro));
        });
}

function salvar(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var sacramentos = req.body.sacramentosServer;

    if (idUsuario == undefined || !Array.isArray(sacramentos)) {
        res.status(400).send("idUsuarioServer ou sacramentosServer inválido!");
        return;
    }

    sacramentoModel.limparDoUsuario(idUsuario)
        .then(function () {
            if (sacramentos.length == 0) {
                return;
            }
            return sacramentoModel.inserirDoUsuario(idUsuario, sacramentos);
        })
        .then(function () { res.status(200).json({ ok: true }); })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage || String(erro));
        });
}

module.exports = { buscarDoUsuario, buscarComunidade, salvar };