import React from "react";
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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
                <div className="header__option">
                    <span className="header__optionLineOne">Hello</span>
                    <span className="header__optionLineTwo">Sign Up</span>
                </div>

                <div className="header__option">
                    <span className="header__optionLineOne">Welcome back</span>
                    <span className="header__optionLineTwo">Sign In</span>
                </div>

                <Link to='/checkout' className="header__optionBasket">
                    <div className="header__optionBasket">
                        <ShoppingBagIcon />
                        <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header