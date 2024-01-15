import React from "react";
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function Header() {

    const [{ basket }, dispatch] = useStateValue();

    return (
        <div className="header">
            <Link to='/'>
                <img className="header__logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
            </Link>

            <div className="header__search">
                <input className="header__searchInput" type="text" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">

                <Link to={'/signUp'}>
                <div className="header__option">
                    <span className="header__optionLineOne">Hello</span>
                    <span className="header__optionLineTwo">Sign Up</span>
                </div>
                </Link>

                <Link to={'/signIn'}>
                    <div className="header__option">
                        <span className="header__optionLineOne">Welcome back</span>
                        <span className="header__optionLineTwo">Sign In</span>
                    </div>
                </Link>

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