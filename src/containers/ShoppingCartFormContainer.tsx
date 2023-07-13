import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
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
	const [currentQuantity, setCurrentQuantity] = useState(quantity);

	const handleQuantityChange = useCallback((value: number) => {
		dispatch(updateBookInCart(book, value));
		setCurrentQuantity((prevQuantity) => prevQuantity + value);
	}, [book]);

	// const debouncedDispatch = useMemo(() => debounce((book: BookItemType, quantity: number, newValue: number) => {
	// 	dispatch(updateBookInCart(book, -quantity + newValue));
	// }, 2000), []);

	const handleQuantityInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentQuantity(Number(e.target.value));
		// debouncedDispatch(book, quantity, Number(e.target.value));
	}, [book, quantity]);

	const handleQuantityInputBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
		dispatch(updateBookInCart(book, -quantity + currentQuantity));
	}, [book, quantity, currentQuantity]);

	return (
		<QuantityButtons
			quantity={currentQuantity}
			onQuantityChange={handleQuantityChange}
			onQuantityInputChange={handleQuantityInputChange}
			onQuantityInputBlur={handleQuantityInputBlur}
		/>
	);
};

export default ShoppingCartFormContainer;
