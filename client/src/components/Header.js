import React, { useState, useEffect } from "react";
import '../styles/Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router-dom';

function Header() {

    const [{ basket }, dispatch] = useStateValue();
    const { isLoggedIn, userData, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const id = userData ? userData[0].UzytkownikID : 0;
    const imie = userData ? userData[0].Imie : '';

    const handleSearch = () => {
        if (searchTerm) {
            navigate(`/?search=${searchTerm}`);
        }
    };

    return (
        <div className="header">
            <Link to='/' className="header__logo" style={{ textDecoration: 'none' }}>
                <h1>Amazbob</h1>
                <img className='header__imageLogo' src="https://i.ibb.co/LzmbwKm/pngwing-com.png" />
            </Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchTerm.trim() !== '') {
                        handleSearch();
                    }
                }} />
                <SearchIcon className="header__searchIcon" onClick={() => {
                    if (searchTerm.trim() !== '') {
                        handleSearch();
                    }
                }} />
            </div>

            <div className="header__nav">

                {isLoggedIn ? (
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

                {isLoggedIn ? (
                    <div className="header__option" onClick={logout}>
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