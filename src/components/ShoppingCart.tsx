import { NavLink } from "react-router-dom";

const ShoppingCart = () => {
    return (
        <NavLink to='/cart' className='shopping-cart'>Корзина</NavLink>
    )
}

export default ShoppingCart;