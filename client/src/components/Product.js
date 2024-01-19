import React from "react";
import '../styles/Product.css'
import { useStateValue } from "../StateProvider";
import { useNavigate } from 'react-router-dom';

function Product({ id, title, description, image, price, rating, categoryId, availability, reviews }) {

    const [ {basket}, dispatch] = useStateValue();

    const navigate = useNavigate();

    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        })
    }

    const openDetails = () => {navigate('/details/'+id, {state: {id, title, description, image, price, categoryId, availability, rating, reviews}})};
    
    return (
        <div className="product">
            <div className="product__info" >
                <p>{title}</p>
                <p className="product__price">
                    <small>zł</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
                </div>
            </div>
            <img src={image} />

            <button className="product__detailsButton" onClick={openDetails}>Show details</button>
            <button className="product__addButton" onClick={addToBasket}>Add to Cart</button>

        </div>
    )
}

export default Product