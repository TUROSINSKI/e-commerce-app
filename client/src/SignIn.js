import React from "react";
import './SignIn.css'

function SignIn() {
    return (
        <div className="signIn">
            <div className="signIn__container">
                <h1>Sign In</h1>
                
                <form>
                    <h5>Email</h5>
                    <input type="text" />

                    <h5>Password</h5>
                    <input type="password" />

                    <button className="signIn__button">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignIn