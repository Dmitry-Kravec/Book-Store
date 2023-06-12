import { NavLink } from "react-router-dom";

import { ShoppingCart } from "./ShoppingCart";
import logo from "../images/logo.png";
import catalog_icon from "../images/catalog-Icon.svg";
import shopping_carticon from "../images/shopping-cart-Icon.svg";

import "../styles/app-header.scss";

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="app-header__content">
        <div className="app-header__logo-container">
          <img
            src={logo}
            className="app-header__logo"
            alt="logo"
            height="100"
          />
        </div>
        <ul className="navigation-list">
          <li className="navigation-list__item">
            <NavLink to="/" className="navigation-list__item-link">
              <img
                src={catalog_icon}
                alt="catalog"
                className="navigation-list__catalog-icon"
                width="35"
              />
              <span className="navigation-list__item-label">Каталог</span>
            </NavLink>
          </li>
          <li className="navigation-list__item">
            <ShoppingCart>
              <NavLink to="/cart" className="navigation-list__item-link">
                <img
                  src={shopping_carticon}
                  className="navigation-list__shopping-cart-icon"
                  alt="shopping-cart"
                  width="35"
                />
                <span className="navigation-list__item-label">Корзина</span>
              </NavLink>
            </ShoppingCart>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default AppHeader;
