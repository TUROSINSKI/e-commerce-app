import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProductDetails from "./components/ProductDetails";
import Order from "./components/Order";

function App() {

  // useEffect (() => {

  // }, [])

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/order" element={[<Order />]} />
          <Route path="/details/:id" element={[<ProductDetails />]} />
          <Route path="/signUp" element={[<SignUp />]} />
          <Route path="/signIn" element={[<SignIn />]} />
          <Route path="/checkout" element={[<Checkout />]} />
          <Route path="/" element={[<Home />]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;