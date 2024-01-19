import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'admin',
    database: 'ecommerceapp'
}).promise()



// export async function getItem(id){
//     const [rows] = await pool.query(
//         `SELECT * FROM przedmioty WHERE id  = ?`, [id])
//         return rows[0]
// }

// export async function createItem(nazwa,cena,opis){
//     const [result] = await pool.query(`
//         INSERT INTO przedmioty (nazwa,cena,opis) VALUES (?,?,?)`, [nazwa,cena,opis])
//         const id = result.insertId
//         return getItem(id)
// }

// export async function getItems() {
//     const [rows] = await pool.query(
//         "SELECT * FROM przedmioty")
//         return rows
// }

export async function registerUser(Imie, Nazwisko, Email, Haslo) {
    const hashedPassword = await bcrypt.hash(Haslo, 10);
    const [result] = await pool.query(`
        INSERT INTO Uzytkownicy (Imie, Nazwisko, Email, Haslo, rola) VALUES (?, ?, ?, ?,'user')`, [Imie, Nazwisko, Email, hashedPassword]);
        return result;
  }
  
export async function loginUser(Email, Haslo) {
    const [user] = await pool.query(`
        SELECT * FROM Uzytkownicy WHERE Email = ?`, [Email]);
        if (user.length === 0) {
            throw new Error('Invalid email or password');
        }
        const hashedPassword = user[0].Haslo;
        
        if (!hashedPassword) {
            throw new Error('Hashed password is missing');
        }
        const isPasswordValid = await bcrypt.compare(Haslo, hashedPassword);
        
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ userId: user[0].UzytkownikID }, 'GigaTajniak', { expiresIn: '1h' });

        return { user, token };
  }

  export function verifyToken(req, res, next) {
    // const token = req.cookies.token;
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).send({ error: 'Brak autoryzacji' });
    }
    
    jwt.verify(token, 'GigaTajniak', (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Nieprawidłowy token' });
        }
        req.userId = decoded.userId;
        next();
    });
}
export async function findUser(id) {
    const [rows] = await pool.query(`SELECT * FROM Uzytkownicy WHERE UzytkownikID = ?`, [id]);
    return rows[0];
}

export async function addProduct(NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) {
    const [result] = await pool.query(`
        INSERT INTO Produkty (NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) VALUES (?, ?, ?, ?, ?, ?)`, 
        [NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu])
        const id = result.insertId
        return getProduct(id);
  }
  
export async function editProduct(ProduktID, NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu) {
    const [rows] = await pool.query(`
        UPDATE Produkty SET NazwaProduktu = ?, OpisProduktu = ?, Cena = ?, Dostepnosc = ?, KategoriaID = ?, ZdjecieProduktu = ? WHERE ProduktID = ?`, 
        [NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu, ProduktID]);
        return rows;
  }
  
export async function deleteProduct(ProduktID) {
    const [deleted] = await pool.query(`
        DELETE FROM Produkty WHERE ProduktID = ?`, [ProduktID]);
        return deleted;
  }
  
export async function getProduct(ProduktID) {
    const [rows] = await pool.query(`
        SELECT * FROM Produkty WHERE ProduktID = ?`, [ProduktID]);
        return rows[0];
  }

export async function getProducts() {
    const [rows] = await pool.query(`
        SELECT * FROM Produkty`)
        return rows
  }
  
export async function getProductsByCategory(filterCategory) {
    try {
      const [rows] = await pool.query(`SELECT * FROM Produkty WHERE KategoriaID = ?`, [filterCategory]);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  export async function getProductSort(sortOrder) {
    try {
      const [rows] = await pool.query(`SELECT * FROM Produkty ORDER BY Cena ${sortOrder}`);
      return rows;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  export async function getCategoryById(KategoriaID) {
    const [rows] = await pool.query(`
        SELECT NazwaKategorii FROM Kategorie WHERE KategoriaID = ?`, [KategoriaID]);
        return rows[0];
  }

  export async function getCategoryID() {
    const [rows] = await pool.query(`
        SELECT KategoriaID FROM Kategorie`);
        return rows;
  }

  export async function getCategory() {
    const [rows] = await pool.query(`
        SELECT * FROM Kategorie`);
        return rows;
  }


  export async function addNewCategory(NazwaKategorii) {
    const [rows] = await pool.query(`
        INSERT INTO Kategorie (NazwaKategorii) VALUES (?)`, [NazwaKategorii]);
        return rows;
  }

  export async function addToCart(ZamowienieID, ProduktID, Ilosc) {
    const getProductPriceQuery = "SELECT Cena FROM Produkty WHERE ProduktID = ?";
    const addToOrderQuery = "INSERT INTO PozycjeZamowienia (ZamowienieID, ProduktID, Ilosc, CenaJednostkowa) VALUES (?, ?, ?, ?)";
  
    try {
      // Pobierz cenę produktu
      const [product] = await pool.query(getProductPriceQuery, [ProduktID]);
      const CenaJednostkowa = product[0].Cena * Ilosc;
  
      // Dodaj do zamówienia
      const [zamowienie]  = await pool.query(addToOrderQuery, [ZamowienieID, ProduktID, Ilosc, CenaJednostkowa]);
  
      return { zamowienie };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export async function createOrder(UzytkownikID, CenaKoncowa) {
    const query = `
        INSERT INTO Zamowienia (UzytkownikID, CenaKoncowa, Status)
        VALUES (?, ?, 'W trakcie realizacji')
    `;
    console.log(UzytkownikID);
    const values = [UzytkownikID, CenaKoncowa];

    return await pool.query(query, values);
}



  export async function removeFromCart(PozycjaID) {
    const [rows] = await pool.query(`
      DELETE FROM PozycjeZamowienia WHERE PozycjaID = ?`, [PozycjaID]);
      return rows;
  }


  export async function addReview(UzytkownikID, ProduktID, Ocena, Komentarz) {
    const [rows] = await pool.query(`
      INSERT INTO Recenzje (UzytkownikID, ProduktID, Ocena, Komentarz) VALUES (?, ?, ?, ?)`, 
      [UzytkownikID, ProduktID, Ocena, Komentarz]);
      return rows;
  }
  
  export async function getReviewsForProduct(ProduktID) {
    const [rows] = await pool.query(`
    SELECT * FROM Recenzje WHERE ProduktID = ?`, [ProduktID]);
    return rows;
  }
