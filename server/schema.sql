create database ecommerceapp;
use ecommerceapp;


CREATE TABLE przedmioty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa VARCHAR(255) NOT NULL,
    cena DECIMAL(10,2) NOT NULL,
    opis TEXT,
    data_utworzenia TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO przedmioty (nazwa, cena, opis) VALUES
    ('Monitor', 799.99, 'Duży monitor LED o wysokiej rozdzielczości.'),
    ('Drukarka', 249.50, 'Kolorowa drukarka laserowa z szybkim drukiem.');



CREATE TABLE Kategorie (
    KategoriaID INT PRIMARY KEY AUTO_INCREMENT,
    NazwaKategorii VARCHAR(255) NOT NULL
);

CREATE TABLE Produkty (
    ProduktID INT PRIMARY KEY AUTO_INCREMENT,
    NazwaProduktu VARCHAR(255) NOT NULL,
    OpisProduktu TEXT,
    Cena DECIMAL(10, 2) NOT NULL,
    Dostepnosc INT NOT NULL,
    KategoriaID INT,
    ZdjecieProduktu VARCHAR(255), -- Ścieżka do pliku zdjęcia
    FOREIGN KEY (KategoriaID) REFERENCES Kategorie(KategoriaID)
);

CREATE TABLE Uzytkownicy (
    UzytkownikID INT PRIMARY KEY AUTO_INCREMENT,
    Imie VARCHAR(255) NOT NULL,
    Nazwisko VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Haslo VARCHAR(255) NOT NULL
);

CREATE TABLE Zamowienia (
    ZamowienieID INT PRIMARY KEY AUTO_INCREMENT,
    UzytkownikID INT,
    DataZamowienia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('W trakcie realizacji', 'Wyslane', 'Dostarczone') DEFAULT 'W trakcie realizacji',
    FOREIGN KEY (UzytkownikID) REFERENCES Uzytkownicy(UzytkownikID)
);

CREATE TABLE PozycjeZamowienia (
    PozycjaID INT PRIMARY KEY AUTO_INCREMENT,
    ZamowienieID INT,
    ProduktID INT,
    Ilosc INT NOT NULL,
    CenaJednostkowa DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ZamowienieID) REFERENCES Zamowienia(ZamowienieID),
    FOREIGN KEY (ProduktID) REFERENCES Produkty(ProduktID)
);

CREATE TABLE Recenzje (
    RecenzjaID INT PRIMARY KEY AUTO_INCREMENT,
    UzytkownikID INT,
    ProduktID INT,
    Ocena INT NOT NULL,
    Komentarz TEXT,
    FOREIGN KEY (UzytkownikID) REFERENCES Uzytkownicy(UzytkownikID),
    FOREIGN KEY (ProduktID) REFERENCES Produkty(ProduktID)
);

-- Wstawianie danych do tabeli Kategorie
INSERT INTO Kategorie (NazwaKategorii) VALUES
    ('Elektronika'),
    ('Książki'),
    ('Odzież'),
    ('Dom i Ogród');

-- Wstawianie danych do tabeli Produkty
INSERT INTO Produkty (NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) VALUES
    ('Smartphone XYZ', 'Nowoczesny smartfon z najnowszymi funkcjami.', 699.99, 100, 1, '/images/smartphone_xyz.jpg'),
    ('Książka "Przykład Książki"', 'Inspirująca książka napisana przez autora.', 19.99, 50, 2, '/images/przyklad_ksiazki.jpg'),
    ('Kurtka Zimowa', 'Stylowa kurtka na zimę.', 129.99, 30, 3, '/images/kurtka_zimowa.jpg'),
    ('Odkurzacz Robot', 'Inteligentny odkurzacz do sprzątania.', 299.99, 20, 4, '/images/odkurzacz_robot.jpg');

-- Wstawianie danych do tabeli Uzytkownicy
INSERT INTO Uzytkownicy (Imie, Nazwisko, Email, Haslo) VALUES
    ('Jan', 'Kowalski', 'jan.kowalski@example.com', 'haslo123'),
    ('Anna', 'Nowak', 'anna.nowak@example.com', 'haslo456');

-- Wstawianie danych do tabeli Zamowienia
INSERT INTO Zamowienia (UzytkownikID, Status) VALUES
    (1, 'W trakcie realizacji'),
    (2, 'Wyslane');

-- Wstawianie danych do tabeli PozycjeZamowienia
INSERT INTO PozycjeZamowienia (ZamowienieID, ProduktID, Ilosc, CenaJednostkowa) VALUES
    (1, 1, 2, 699.99),
    (2, 3, 1, 129.99);

-- Wstawianie danych do tabeli Recenzje
INSERT INTO Recenzje (UzytkownikID, ProduktID, Ocena, Komentarz) VALUES
    (1, 1, 5, 'Bardzo dobry smartfon.'),
    (2, 3, 4, 'Kurtka świetnie trzyma ciepło.');





