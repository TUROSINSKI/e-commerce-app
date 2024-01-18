import React from "react";
import '../styles/Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal, isBasketEmpty } from "../reducer";
import { useNavigate } from 'react-router-dom';

function Subtotal() {

    const [{ basket }, dispatch] = useStateValue();

    const navigate = useNavigate();

    const proceedOrder = () => {
        if (!isBasketEmpty(basket)) {
            navigate('/order');
        } else {
            alert("Your basket is empty. Add some items before proceeding.");
        }
    };

    console.log("Subtotal:",
        getBasketTotal(basket));

    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value) => (
                <>
                    <p>
                        Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
                    </p>
                </>
            )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"zł"}
            />

            <button onClick={proceedOrder}>Proceed</button>
        </div>
    )
}

export default Subtotal