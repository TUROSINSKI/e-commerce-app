import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/SignIn.css'

function SignIn() {

    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Haslo: haslo }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const result = await response.json();
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user))

            console.log(result);
            navigate('/');

    
        } catch (error) {
            console.error("Error during authentication", error);
            alert("Please check again your credentials");
        }
    };

    return (
        <div className="signIn">
            <div className="signIn__container">
                <h1>Sign In</h1>
                
                <form onSubmit={handleSubmit}>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
    
                    <h5>Password</h5>
                    <input type="password" value={haslo} onChange={(e) => setHaslo(e.target.value)} />
    
                    <button type="submit" className="signIn__button">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn