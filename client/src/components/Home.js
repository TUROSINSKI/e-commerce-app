import React, { useState, useEffect } from "react";
import '../styles/Home.css'
import Product from "./Product";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ProductPopup from "./ProductPopup";

function Home() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setCategories([
            { KategoriaID: 1, NazwaKategorii: 'Elektronika' },
            { KategoriaID: 2, NazwaKategorii: 'Książki' },
            { KategoriaID: 3, NazwaKategorii: 'Odzież' },
            { KategoriaID: 4, NazwaKategorii: 'Dom i Ogród' },
        ]);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        let url = selectedCategory === ''
            ? 'http://localhost:5000/api/getProducts'
            : `http://localhost:5000/api/getProductsByCategory?filterCategory=${selectedCategory}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching products');
                }
                return response.json();
            })
            .then(data => {
                return Promise.all(data.map(async product => {
                    const res = await fetch(`http://localhost:5000/api/getReviewsForProduct/${product.ProduktID}`);
                    const reviews = await res.json();
                    const comments = reviews.map(review => review.Komentarz);
                    return { ...product, reviews, comments };
                }));
            })
            .then(productsWithReviews => {
                setProducts(productsWithReviews);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [selectedCategory]);

    console.log(products);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    const addProductHandler = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product)
            });
    
            if (!response.ok) {
                throw new Error('Product could not be added');
            }
    
            const addedProduct = await response.json();
            // Update state or perform any actions needed after product addition
            setShowPopup(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="home">
            <div className="home__container">
                <img src="https://img.freepik.com/free-photo/side-view-woman-holding-smartphone-shopping-bags-cyber-monday_23-2148657647.jpg?w=1380&t=st=1705107150~exp=1705107750~hmac=affaa64e8f7b9943e4db25a8f8d59d6c3ac6813bf6e3615b3a18ac674d107cc6" />
                <div className="home__toolbar">
                    <div>
                        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.KategoriaID} value={category.KategoriaID}>
                                    {category.NazwaKategorii}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* <div style={{ fontSize: '30px' }}>
                        Products
                    </div> */}
                    <div>
                        <AddCircleIcon style={{ fontSize: '40px' }} onClick={() => setShowPopup(true)} />
                        {showPopup && <ProductPopup onSave={addProductHandler} onClose={() => setShowPopup(false)} />}
                    </div>
                </div>
                <div className="home__row">
                    {products.map(product => (
                        <Product
                            key={product.ProduktID}
                            id={product.ProduktID}
                            title={product.NazwaProduktu}
                            description={product.OpisProduktu}
                            price={product.Cena}
                            image={product.ZdjecieProduktu}
                            rating={calculateAverageRating(product.reviews)}
                            reviews={product.reviews}
                            availability={product.Dostepnosc}
                            categoryId={product.KategoriaID}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home

function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
        return 0;
    }
    const total = reviews.reduce((acc, review) => acc + review.Ocena, 0);
    return total / reviews.length;
}