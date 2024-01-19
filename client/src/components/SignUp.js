import React, { useState } from "react";
import '../styles/SignUp.css'
import { useNavigate } from 'react-router-dom';

function SignUp() {

    const [Imie, setImie] = useState('');
    const [Nazwisko, setNazwisko] = useState('');
    const [Email, setEmail] = useState('');
    const [Haslo, setHaslo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/registerUser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Imie, Nazwisko, Email, Haslo }),
            });

            console.log(response)

            const data = await response.json();

            if (response.status === 200) {
                console.log('Registration successful:', data);
                navigate('/signin');
                alert("Registration successful. Now, you can sign in.")
            } else {
                console.error('Registration failed:', data.error);
            }
        } catch (error) {
            console.error('Request failed', error);
        }
    };

    return (
        <div className="signUp">
            <div className="signUp__container">
                <h1>Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <h5>Name</h5>
                    <input type="text" value={Imie} onChange={(e) => setImie(e.target.value)} />

                    <h5>Surname</h5>
                    <input type="text" value={Nazwisko} onChange={(e) => setNazwisko(e.target.value)} />

                    <h5>Email</h5>
                    <input type="text" value={Email} onChange={(e) => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={Haslo} onChange={(e) => setHaslo(e.target.value)} />

                    <button type="submit" className="signUp__button">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp