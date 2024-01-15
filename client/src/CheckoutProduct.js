import React from "react";
import './CheckoutProduct.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, rating }) {

    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    const addAnotherToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            }
        })
    }

    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} />

            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>zł</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating).fill().map((_, i) => (<p>⭐</p>))}
                </div>
            </div>
            <button onClick={removeFromBasket}>
                <RemoveIcon/>
            </button>
            <button onClick={addAnotherToBasket}>
                <AddIcon/>
            </button>
        </div>
    )
}

export default CheckoutProduct