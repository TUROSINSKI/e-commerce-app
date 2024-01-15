import React from "react";
import '../styles/Subtotal.css';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from 'react-router-dom';

function Subtotal() {

    const [{ basket }, dispatch] = useStateValue();

    const navigate = useNavigate();

    const proceedOrder = () => {navigate('/order')};

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