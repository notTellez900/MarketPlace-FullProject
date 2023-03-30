CREATE DATABASE ng_SPA;

USE ng_SPA;

CREATE TABLE items(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(180) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    precio NUMERIC(10, 2) NOT NULL,
    stock INT(11) NOT NULL,
    imagen VARCHAR(2500),
    id_Categoria INT(11) NOT NULL,
    FOREIGN KEY (id_Categoria) REFERENCES categoria(id)
);

CREATE TABLE categoria(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    descripcion VARCHAR(250) NOT NULL
);

DESCRIBE items;
DESCRIBE categoria;