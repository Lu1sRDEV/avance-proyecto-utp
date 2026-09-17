CREATE DATABASE IF NOT EXISTS sistema_matriculas;

USE sistema_matriculas;



CREATE TABLE carreras (
    carrera_id INT AUTO_INCREMENT PRIMARY KEY,
    carrera_codigo VARCHAR(20) NOT NULL UNIQUE,
    carrera_nombre VARCHAR(100) NOT NULL UNIQUE,
    estado BOOLEAN NOT NULL DEFAULT TRUE
);




CREATE TABLE alumnos (
    alu_id INT AUTO_INCREMENT PRIMARY KEY,

    alu_dni CHAR(8) NOT NULL UNIQUE,

    alu_nombres VARCHAR(100) NOT NULL,
    alu_apellidos VARCHAR(150) NOT NULL,

    alu_correo VARCHAR(150) NOT NULL UNIQUE,
    alu_telefono VARCHAR(20),

    carrera_id INT NOT NULL,

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    estado BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT fk_alumno_carrera
        FOREIGN KEY (carrera_id)
        REFERENCES carreras(carrera_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);




CREATE TABLE docentes (
    docente_id INT AUTO_INCREMENT PRIMARY KEY,

    docente_dni CHAR(8) NOT NULL UNIQUE,

    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,

    correo VARCHAR(150) UNIQUE,
    telefono VARCHAR(20),

    estado BOOLEAN NOT NULL DEFAULT TRUE
);




CREATE TABLE cursos (
    curso_id INT AUTO_INCREMENT PRIMARY KEY,

    curso_codigo VARCHAR(20) NOT NULL UNIQUE,
    curso_nombre VARCHAR(100) NOT NULL,

    ciclo INT NOT NULL,

    creditos INT DEFAULT 0,

    carrera_id INT NOT NULL,

    estado BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT chk_ciclo
        CHECK (ciclo >= 1),

    CONSTRAINT fk_curso_carrera
        FOREIGN KEY (carrera_id)
        REFERENCES carreras(carrera_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);




CREATE TABLE periodos_academicos (
    periodo_id INT AUTO_INCREMENT PRIMARY KEY,

    periodo_nombre VARCHAR(50) NOT NULL UNIQUE,

    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,

    estado BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT chk_fechas_periodo
        CHECK (fecha_fin > fecha_inicio)
);




CREATE TABLE secciones (
    seccion_id INT AUTO_INCREMENT PRIMARY KEY,

    curso_id INT NOT NULL,
    docente_id INT NOT NULL,
    periodo_id INT NOT NULL,

    codigo_seccion VARCHAR(20) NOT NULL,

    capacidad INT NOT NULL,

    aula VARCHAR(50),

    horario VARCHAR(100),

    estado BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT chk_capacidad
        CHECK (capacidad > 0),

    CONSTRAINT fk_seccion_curso
        FOREIGN KEY (curso_id)
        REFERENCES cursos(curso_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_seccion_docente
        FOREIGN KEY (docente_id)
        REFERENCES docentes(docente_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_seccion_periodo
        FOREIGN KEY (periodo_id)
        REFERENCES periodos_academicos(periodo_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uk_seccion_periodo
        UNIQUE (curso_id, codigo_seccion, periodo_id)
);




CREATE TABLE matriculas (
    matricula_id INT AUTO_INCREMENT PRIMARY KEY,

    alu_id INT NOT NULL,
    seccion_id INT NOT NULL,

    fecha_matricula TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    estado ENUM(
        'ACTIVA',
        'RETIRADA',
        'FINALIZADA'
    ) NOT NULL DEFAULT 'ACTIVA',

    CONSTRAINT fk_matricula_alumno
        FOREIGN KEY (alu_id)
        REFERENCES alumnos(alu_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_matricula_seccion
        FOREIGN KEY (seccion_id)
        REFERENCES secciones(seccion_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT uk_alumno_seccion
        UNIQUE (alu_id, seccion_id)
);