// import React from "react";
// import '../styles/Order.css'
// import { useStateValue } from "../StateProvider";
// import { getBasketTotal } from "../reducer";
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../AuthContext";

// function Order() {

//     const token = localStorage.getItem('token');
//     const [{ basket }, dispatch] = useStateValue();
//     const { isLoggedIn, userData, logout } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const CenaKoncowa = getBasketTotal(basket);

//         if (!isLoggedIn) {
//             alert("No token found");
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:5000/api/createOrder', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ CenaKoncowa }),
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const result = await response.json();
//             console.log("Order created", result);
//             dispatch({
//                 type: 'CLEAR_BASKET'
//             });
//             alert("Zamowienie złożone. Dziękujemy za skorzystanie z naszego sklepu!")
//             navigate('/');
//         } catch {
//             alert("Error creating the order");
//         }
//     }

//     return (
//         <div className="order">
//             <div className="order__container">
//                 <form onSubmit={handleSubmit}>
//                     <h5 className="order__title">Phone number</h5>
//                     <div>
//                         <input className='order__input' type="tel" placeholder="Area code" />
//                         <input className='order__input' type="tel" placeholder="Phone number" />
//                     </div>

//                     <h5 className="order__title">Shipping Address</h5>
//                     <input className='order__input' placeholder="Address line 1"></input>
//                     <input className='order__input' placeholder="Address line 2 (optional)" />

//                     <div>
//                         <input className='order__input' placeholder="City" />
//                         <input className='order__input' placeholder="Region" />
//                     </div>

//                     <div>
//                         <input className='order__input' placeholder="Postal / Zip Code" />
//                         <input className='order__input' placeholder="Country" />
//                     </div>

//                     <button type="submit" className="order__button">Order It!</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Order

import React, { useState } from "react";
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

    const [areaCode, setAreaCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const CenaKoncowa = getBasketTotal(basket);

        if (!areaCode || !phoneNumber || !addressLine1 || !city || !region || !postalCode || !country) {
            alert("Please fill in all required fields");
            return;
        }

        if (!isLoggedIn) {
            alert("U must be logged in");
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
                        <input 
                            className='order__input' 
                            type="tel" 
                            value={areaCode}
                            onChange={(e) => setAreaCode(e.target.value)}
                            placeholder="Area code" 
                        />
                        <input 
                            className='order__input' 
                            type="tel" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone number" 
                        />
                    </div>

                    <h5 className="order__title">Shipping Address</h5>
                    <input 
                        className='order__input' 
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        placeholder="Address line 1"
                    />
                    <input 
                        className='order__input' 
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        placeholder="Address line 2 (optional)"
                    />

                    <div>
                        <input 
                            className='order__input' 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City" 
                        />
                        <input 
                            className='order__input' 
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            placeholder="Region" 
                        />
                    </div>

                    <div>
                        <input 
                            className='order__input' 
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Postal / Zip Code" 
                        />
                        <input 
                            className='order__input' 
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Country" 
                        />
                    </div>

                    <button type="submit" className="order__button">Order It!</button>
                </form>
            </div>
        </div>
    )
}

export default Order;
