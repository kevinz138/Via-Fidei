CREATE DATABASE viafidei;

USE viafidei;

-- 1. Tabela Usuario (Forte - Login e Cadastro)
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

-- 2. Tabelas de Domínio / Catálogo (Fortes)
CREATE TABLE intencao (
    idIntencao TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE tipoOracao (
    idTipoOracao TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE sacramento (
    idSacramento TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE tempoLiturgico (
    idTempoLiturgico TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL,
    cor VARCHAR(10) NOT NULL
);

CREATE TABLE anoLiturgico (
    anoInicio SMALLINT PRIMARY KEY, -- Ex: 2026 = ano que começa no Advento de 2026
    inicioAdvento DATE,
    natal DATE,
    batismoSenhor DATE,
    quartaCinzas DATE,
    pascoa DATE,
    pentecostes DATE
);

-- 3. Tabela Associativa N:N (Usuario <-> Sacramento)
CREATE TABLE usuarioSacramento (
    fkUsuario INT NOT NULL,
    fkSacramento TINYINT NOT NULL,
    PRIMARY KEY (fkUsuario, fkSacramento),
    CONSTRAINT fkUsuarioSacramentoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fkUsuarioSacramentoSacramento FOREIGN KEY (fkSacramento) REFERENCES sacramento(idSacramento)
);

-- 4. Tabelas de Registros e Práticas (Relacionamentos Fracos / Dependentes do Usuário)
CREATE TABLE oracao (
    idOracao INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    fkIntencao TINYINT NOT NULL,
    fkTipoOracao TINYINT NOT NULL,
    minutos SMALLINT NOT NULL,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkOracaoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fkOracaoIntencao FOREIGN KEY (fkIntencao) REFERENCES intencao(idIntencao),
    CONSTRAINT fkOracaoTipo FOREIGN KEY (fkTipoOracao) REFERENCES tipoOracao(idTipoOracao)
);

CREATE TABLE consultaCalendario (
    idConsulta INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    dataConsultada DATE NOT NULL,
    fkTempoLiturgico TINYINT NOT NULL,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkConsultaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fkConsultaTempo FOREIGN KEY (fkTempoLiturgico) REFERENCES tempoLiturgico(idTempoLiturgico)
);

CREATE TABLE quaresmaPratica (
    idQuaresmaPratica INT PRIMARY KEY AUTO_INCREMENT,
    fkUsuario INT NOT NULL,
    dataPratica DATE NOT NULL,
    pratica ENUM('oracao', 'jejum', 'esmola') NOT NULL,
    UNIQUE (fkUsuario, dataPratica, pratica), -- impede marcar duas vezes o mesmo dia
    CONSTRAINT fkQuaresmaUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

SELECT * FROM usuario;