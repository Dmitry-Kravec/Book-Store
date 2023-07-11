import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Popover } from 'antd';

import ShoppingCartPopover from './ShoppingCartPopover';
import logo from '../images/logo.png';
import catalogIcon from '../images/catalog-Icon.svg';
import shoppingCarticon from '../images/shopping-cart-Icon.svg';

const AppHeader = () => (
	<header className="app-header">
		<div className="app-header__content">
			<NavLink to="/">
				<img
					src={logo}
					className="app-header__logo"
					alt="logo"
					height="100"
				/>
			</NavLink>
			<ul className="navigation-list">
				<li className="navigation-list__item">
					<NavLink to="/" className="navigation-list__item-content">
						<img
							src={catalogIcon}
							alt="catalog"
							className="navigation-list__catalog-icon"
							width="36"
							height="36"
						/>
						<span className="navigation-list__item-label">Каталог</span>
					</NavLink>
				</li>
				<li className="navigation-list__item">
					<Popover
						rootClassName="navigation-list__item-popover"
						placement="bottom"
						trigger="click"
						content={<ShoppingCartPopover />}
					>
						<span className="navigation-list__item-content">
							<img
								src={shoppingCarticon}
								className="navigation-list__shopping-cart-icon"
								alt="shopping-cart"
								width="36"
								height="36"
							/>
							<span className="navigation-list__item-label">Корзина</span>
						</span>
					</Popover>
				</li>
			</ul>
		</div>
	</header>
);

export default memo(AppHeader);
