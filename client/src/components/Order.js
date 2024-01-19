import React from "react";
import '../styles/Order.css'
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";

function Order() {

    const token = localStorage.getItem('token');
    const [{ basket }, dispatch] = useStateValue();
    const { isLoggedIn, userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const CenaKoncowa = getBasketTotal(basket);

        if (!isLoggedIn) {
            alert("No token found");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ CenaKoncowa }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log("Order created", result);
            dispatch({
                type: 'CLEAR_BASKET'
            });
            alert("Zamowienie złożone. Dziękujemy za skorzystanie z naszego sklepu!")
            navigate('/');
        } catch {
            alert("Error creating the order");
        }
    }

    return (
        <div className="order">
            <div className="order__container">
                <form onSubmit={handleSubmit}>
                    <h5 className="order__title">Phone number</h5>
                    <div>
                        <input className='order__input' type="tel" placeholder="Area code" />
                        <input className='order__input' type="tel" placeholder="Phone number" />
                    </div>

                    <h5 className="order__title">Shipping Address</h5>
                    <input className='order__input' placeholder="Address line 1"></input>
                    <input className='order__input' placeholder="Address line 2 (optional)" />

                    <div>
                        <input className='order__input' placeholder="City" />
                        <input className='order__input' placeholder="Region" />
                    </div>

                    <div>
                        <input className='order__input' placeholder="Postal / Zip Code" />
                        <input className='order__input' placeholder="Country" />
                    </div>

                    <button type="submit" className="order__button">Order It!</button>
                </form>
            </div>
        </div>
    )
}

export default Order