import React from "react";
import './SignUp.css'

function SignUp() {
    return (
        <div className="signUp">
            <div className="signUp__container">
                <h1>Sign Up</h1>
                
                <form>
                    <h5>Username</h5>
                    <input type="text" />

                    <h5>Email</h5>
                    <input type="text" />

                    <h5>Password</h5>
                    <input type="password" />

                    <button className="signUp__button">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp