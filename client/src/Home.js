import React, { useState, useEffect } from "react";
import './Home.css'
import Product from "./Product";

function Home() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/getProducts") // Replace with your Node.js backend API endpoint
            .then(response => {
                if (!response.ok) {
                    throw new Error('ayaya no fetchin');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://img.freepik.com/free-photo/side-view-woman-holding-smartphone-shopping-bags-cyber-monday_23-2148657647.jpg?w=1380&t=st=1705107150~exp=1705107750~hmac=affaa64e8f7b9943e4db25a8f8d59d6c3ac6813bf6e3615b3a18ac674d107cc6" />
                <div className="home__row">
                    {products.map(product => (
                        <Product
                            key={product.ProduktID}
                            id={product.ProduktID}
                            title={product.NazwaProduktu}
                            price={product.Cena}
                            image={product.ZdjecieProduktu}
                            rating={5}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home