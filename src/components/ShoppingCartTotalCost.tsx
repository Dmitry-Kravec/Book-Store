import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getShoppingCartTotalCost } from '../redux/selectors';

interface ShoppingCartTotalCostProps {
	className?: string;
}

const ShoppingCartTotalCost = ({ className }: ShoppingCartTotalCostProps) => {
	const totalCost = useSelector(getShoppingCartTotalCost);

	return <span className={`total-cost ${className}`}>{totalCost}</span>;
};

export default memo(ShoppingCartTotalCost);
