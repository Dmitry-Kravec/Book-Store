import { useCallback } from 'react';
import useTypedDispatch from '../hooks/useTypedDispatch';
import { updateBookInCart } from '../redux/actions/shoppingCartActionCreators';
import { BookItemType } from '../types/BooksTypes';
import QuantityButtons from '../components/QuantityButtons';

interface ShoppingCartFormContainerProps {
	book: BookItemType,
	quantity: number;
}

const ShoppingCartFormContainer = ({ book, quantity }: ShoppingCartFormContainerProps) => {
	const dispatch = useTypedDispatch();

	const handleQuantityChange = useCallback((value: number) => {
		dispatch(updateBookInCart(book, value));
	}, [book]);

	const handleQuantityInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateBookInCart(book, -quantity + Number(e.target.value)));
	}, [book, quantity]);

	return (
		<QuantityButtons
			quantity={quantity}
			onQuantityChange={handleQuantityChange}
			onQuantityInputChange={handleQuantityInputChange}
		/>
	);
};

export default ShoppingCartFormContainer;
