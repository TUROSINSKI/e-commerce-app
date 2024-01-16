// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {addProduct, editProduct, deleteProduct, getProducts, getProduct,getProductsByCategory, registerUser, loginUser, addToCart, removeFromCart, addReview,getReviewsForProduct, verifyToken, createOrder} from './database.js';
const app = express()
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

// // pobieranie wszystkich przedmiotów
// app.get('/items', async (req, res) => {
//   const items = await getItems();
//   res.send(items);
// });
// // pobieranie przedmiotu po id
// app.get('/items/:id', async (req, res) => {
//   const id = req.params.id;
//   const item = await getItem(id);
//   res.send(item);
// });
// //dodawanie przedmiotu
// app.post("/items", async (req, res) => {
//   const { nazwa, cena, opis } = req.body;
//   const item = await createItem(nazwa, cena, opis);
//   res.status(201).send(item);
// })

app.post("/api/registerUser", async (req, res) => {
  const { Imie, Nazwisko, Email, Haslo } = req.body;
  try {
    const result = await registerUser(Imie, Nazwisko, Email, Haslo);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/loginUser", async (req, res) => {
  const { Email, Haslo } = req.body;
  try {
    const { user, token }= await loginUser(Email, Haslo);
    // res.cookie('token', token, { httpOnly: true });
    res.send({ user, token });
    // res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie ma takiego użytkownika" });
  }
});

app.get("/api/loggedUser",verifyToken, async (req, res) => {
  try {
    res.send("poszlo");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Nie ma takiego użytkownika" });
  }
});

app.get("/api/getProducts", async (req, res) => {
  try {
    const result = await getProducts();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/getProduct/:id", async (req, res) => {
  try{
    const id = req.params.id;
    const item = await getProduct(id);
    res.send(item);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/getProductsByCategory", async (req, res) => {
  const { filterCategory, sortField, sortOrder } = req.query;

  try {
    const products = await getProductsByCategory(filterCategory, sortField, sortOrder);
    res.send(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.post("/api/addProduct", async (req, res) => {
  const { NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu } = req.body;
  try {
    const Product = await addProduct(NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu);
    res.send(Product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}); 

app.put("/api/editProduct/:id", async (req, res) => {
  const id = req.params.id;
  const { NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu } = req.body;
  try {
    const result = await editProduct(id, NazwaProduktu, OpisProduktu, Cena, Dostepnosc, KategoriaID, ZdjecieProduktu);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/api/deleteProduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteProduct(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/addToCart/:ZamowienieID", async (req, res) => {
  const { ZamowienieID } = req.params;
  const { ProduktID, Ilosc } = req.body;

  try {
    const result = await addToCart(ZamowienieID, ProduktID, Ilosc);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/api/removeFromCart/:PozycjaID", async (req, res) => {
  const { PozycjaID } = req.params;
  try {
    const result = await removeFromCart(PozycjaID);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});


app.post("/api/addReview", async (req, res) => {
  const { UzytkownikID, ProduktID, Ocena, Komentarz } = req.body;
  try {
    const result = await addReview(UzytkownikID, ProduktID, Ocena, Komentarz);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/api/getReviewsForProduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await getReviewsForProduct(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post('/api/createOrder', verifyToken, async (req, res) => {
  const userId = req.userId;
  const { CenaKoncowa } = req.body;
  try {
      console.log(userId, CenaKoncowa);
      const result = await createOrder(userId, CenaKoncowa);
      res.send(result);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Wystąpił błąd podczas tworzenia zamówienia' });
  }
});


// app.post("/api/addToCart/:id", async (req, res) => {
//   const id = req.params.id;
//   const {ProduktID, Ilosc } = req.body;
//   try {
//     const result = await addToCart(id,  ProduktID, Ilosc);
//     res.send(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(5000, () => console.log('Listening on port 5000'));

// module.exports = app;
