import React, { useState, useEffect } from "react";
import '../styles/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";

function Header() {

    const [{ basket }, dispatch] = useStateValue();
    const [imie, setImie] = useState('');

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setImie(user[0].Imie); // Update 'imie' state
        }
    }, []);

    // const userString = localStorage.getItem('user');
    // let user = null;
    // let imie = '';
    // console.log(userString);

    // if (userString) {
    //     user = JSON.parse(userString);
    //     console.log(user);
    //     imie = user[0].Imie;
    // }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setImie(null);
    }

    return (
        <div className="header">
            <Link to='/' className="header__logo" style={{ textDecoration: 'none' }}>
                {/* <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" /> */}
                <h1>Amazbob</h1>
                <img className='header__imageLogo' src="https://i.ibb.co/LzmbwKm/pngwing-com.png" />
            </Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">

                {imie ? (
                    <div className="header__option">
                        <span className="header__optionLineOne">Hello</span>
                        <span className="header__optionLineTwo">{imie + '!' ?? 'User'}</span>
                    </div>
                ) : (
                    <Link to={'/signUp'}>
                        <div className="header__option">
                            <span className="header__optionLineOne">Hello</span>
                            <span className="header__optionLineTwo">Sign Up</span>
                        </div>
                    </Link>
                )}

                {imie ? (
                    <div className="header__option" onClick={handleLogout}>
                        <span className="header__optionLineOne">Bye</span>
                        <span className="header__optionLineTwo">Log out</span>
                    </div>
                ) : (
                    <Link to={'/signIn'}>
                        <div className="header__option">
                            <span className="header__optionLineOne">Welcome back</span>
                            <span className="header__optionLineTwo">Sign In</span>
                        </div>
                    </Link>
                )}
                <Link to='/checkout'>
                    <div className="header__optionBasket">
                        <ShoppingCartIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header