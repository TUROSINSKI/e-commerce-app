import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProductDetails from "./ProductDetails";

function App() {

  // useEffect (() => {

  // }, [])

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
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