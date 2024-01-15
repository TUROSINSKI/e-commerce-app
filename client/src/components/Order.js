import React from "react";
import '../styles/Order.css'

function Order() {
    return (
        <div className="order">
            <div className="order__container">
                <form>
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