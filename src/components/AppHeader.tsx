import { NavLink } from "react-router-dom";

import ShoppingCart from "./ShoppingCart";

import '../styles/app-header.scss';

const AppHeader = () => {
    return (
        <header className="app-header">
            <div className='app-header__logo-container'>
                <span className='app-header__logo'>Book Store</span>
            </div>
            <ul className='navigation-list'>
                <li className='navigation-list__item'>
                    <NavLink to='/' className='navigation-list__item-link'>Каталог</NavLink>
                </li>
                <li className='navigation-list__item'>
                    <ShoppingCart />
                </li>
            </ul>
        </header>
    )
}

export default AppHeader;