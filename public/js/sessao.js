// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

function mostrarSenha() {
    var campo = document.getElementById("senha");
    var olhoAberto = document.getElementById("olho_aberto");
    var olhoFechado = document.getElementById("olho_fechado");
    var botao = document.getElementById("btn_olho");

    if (campo.type == "password") {
        campo.type = "text";
        olhoAberto.style.display = "none";
        olhoFechado.style.display = "block";
        botao.title = "Esconder senha";
        botao.setAttribute("aria-label", "Esconder senha");
    } else {
        campo.type = "password";
        olhoAberto.style.display = "block";
        olhoFechado.style.display = "none";
        botao.title = "Mostrar senha";
        botao.setAttribute("aria-label", "Mostrar senha");
    }
}
