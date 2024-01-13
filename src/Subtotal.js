import React from "react";
import './Subtotal.css';
import CurrencyFormat from "react-currency-format";

function Subtotal() {
    return (
        <div className="subtotal">
            <CurrencyFormat renderText={(value) => (
                <>
                    <p>
                        Subtotal (0 items): <strong>{`${value}`}</strong>
                    </p>
                    <small className="subtotal__gift">
                        <input type="checkbox" />This order is a gift
                    </small>
                </>
            )}
                decimalScale={2}
                value={0}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"zł"}
            />

            <button>Proceed</button>
        </div>
    )
}

export default Subtotal