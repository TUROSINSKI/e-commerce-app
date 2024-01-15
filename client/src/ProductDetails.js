import React from "react";
import { useLocation } from 'react-router-dom';
import './ProductDetails.css'

function ProductDetails() {

    const location = useLocation();
    const productDetails = location.state;

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    // Destructure the properties from productDetails
    const { id, title, image, price, rating, comment } = productDetails;

    return (
        <div className="productDetails">
            <h2 className="productDetails__title">{title}</h2>
            <p className="productDetails__price">Price: zł{price}</p>
            <img className="productDetails__image" src={image} alt={title}/>
            <div className="productDetails_UserOpinions">
            <div className="productDetails__rating">
                {Array(rating).fill().map((_, i) => (
                    <span key={i}>⭐</span>
                ))}
            </div>
            <p className="productDetails__comment">{comment}</p>
            </div>
        </div>
    )
}

export default ProductDetails