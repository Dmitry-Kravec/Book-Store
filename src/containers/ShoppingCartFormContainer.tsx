import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import QuantityButtons from '../components/QuantityButtons';
import { updateBookInCart } from '../redux/actions/shoppingCartActionCreators';
import { BookItemType } from '../types/BooksTypes';

type ShoppingCartFormContainerProps = {
	book: BookItemType,
	quantity: number;
}

const ShoppingCartFormContainer = ({ book, quantity }: ShoppingCartFormContainerProps) => {
	const dispatch = useDispatch();

	const handleQuantityChange = useCallback((value: number) => {
		dispatch(updateBookInCart(book, value));
	}, [book]);

	const handleQuantityInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(updateBookInCart(book, -quantity + Number(e.target.value)));
	}, [book, quantity]);

	return (
		<QuantityButtons
			quantity={quantity}
			handleQuantityChange={handleQuantityChange}
			handleQuantityInputChange={handleQuantityInputChange}
		/>
	);
};

export default ShoppingCartFormContainer;
