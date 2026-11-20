CREATE DATABASE viafidei;

USE viafidei;

CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE intencao (
    idIntencao TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE
);

INSERT INTO intencao (nome) VALUES
('Família'), ('Paz'), ('Gratidão'), ('Saúde'), ('Estudos'), ('Trabalho');

CREATE TABLE tipoOracao (
    idTipoOracao TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE
);

INSERT INTO tipoOracao (nome) VALUES
('Terço'), ('Missa'), ('Pai-Nosso'), ('Outras');

CREATE TABLE sacramento (
    idSacramento TINYINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL UNIQUE
);

INSERT INTO sacramento (nome) VALUES
('Batismo'), ('Eucaristia'), ('Reconciliação'), ('Crisma'),
('Matrimônio'), ('Ordem'), ('Unção');

CREATE TABLE usuarioSacramento (
    fkUsuario INT NOT NULL,
    fkSacramento TINYINT NOT NULL,
    PRIMARY KEY (fkUsuario, fkSacramento),
    CONSTRAINT fkUsuarioSacramentoUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    CONSTRAINT fkUsuarioSacramentoSacramento FOREIGN KEY (fkSacramento) REFERENCES sacramento(idSacramento)
);

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

SELECT u.nome,
	s.nome FROM usuario u
    JOIN usuarioSacramento us
		ON us.fkUsuario = idUsuario
	JOIN sacramento s
		ON us.fkSacramento = idSacramento;
        
SELECT * FROM usuario;