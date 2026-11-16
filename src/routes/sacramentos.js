var express = require("express");
var router = express.Router();

var sacramentoController = require("../controllers/sacramentoController");

router.get("/comunidade", function (req, res) {
    sacramentoController.buscarComunidade(req, res);
});

router.get("/usuario/:idUsuario", function (req, res) {
    sacramentoController.buscarDoUsuario(req, res);
});

router.post("/salvar", function (req, res) {
    sacramentoController.salvar(req, res);
});

module.exports = router;