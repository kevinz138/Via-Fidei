var express = require("express");
var router = express.Router();

var oracaoController = require("../controllers/oracaoController");

router.get("/opcoes", function (req, res) {
    oracaoController.opcoes(req, res);
});

router.post("/registrar", function (req, res) {
    oracaoController.registrar(req, res);
});

router.get("/resumo/:idUsuario", function (req, res) {
    oracaoController.resumo(req, res);
});

router.get("/intencoes", function (req, res) {
    oracaoController.intencoes(req, res);
});

router.get("/tipos", function (req, res) {
    oracaoController.tipos(req, res);
});

router.get("/semana/:idUsuario", function (req, res) {
    oracaoController.semana(req, res);
});

module.exports = router;