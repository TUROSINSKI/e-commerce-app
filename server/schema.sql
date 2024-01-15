create database ecommerceapp;
use ecommerceapp;


CREATE TABLE przedmioty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(255) NOT NULL,
    cena DECIMAL(10,2) NOT NULL,
    opis TEXT
);

INSERT INTO przedmioty (nazwa, cena, opis) VALUES
    ('Laptop', 2499.99, 'Super szybki laptop z najnowszym procesorem.'),
    ('Smartfon', 899.99, 'Nowoczesny smartfon z doskonałym aparatem.'),
    ('Kamera', 699.50, 'Profesjonalna kamera do nagrywania w wysokiej rozdzielczości.');