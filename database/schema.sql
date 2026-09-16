CREATE DATABASE IF NOT EXISTS videojuegos_db;
USE videojuegos_db;


CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL UNIQUE,
    correo VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);


CREATE TABLE videojuegos (
    id_videojuego INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    desarrollador VARCHAR(100),
    fecha_lanzamiento DATE,
    plataforma VARCHAR(100),
    precio DECIMAL(10,2) DEFAULT 0.00,
    imagen_url VARCHAR(500),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE videojuego_categoria (
    id_videojuego INT NOT NULL,
    id_categoria INT NOT NULL,

    PRIMARY KEY (id_videojuego, id_categoria),

    FOREIGN KEY (id_videojuego)
        REFERENCES videojuegos(id_videojuego)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_videojuego INT NOT NULL,
    puntuacion INT NOT NULL,
    comentario TEXT,
    fecha_resena TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_puntuacion
        CHECK (puntuacion BETWEEN 1 AND 5),

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (id_videojuego)
        REFERENCES videojuegos(id_videojuego)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE favoritos (
    id_usuario INT NOT NULL,
    id_videojuego INT NOT NULL,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_usuario, id_videojuego),

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (id_videojuego)
        REFERENCES videojuegos(id_videojuego)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);