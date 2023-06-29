import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

import { updateBookInCart } from '../redux/actions/shoppingCartActionCreators';
import { BookItemType } from '../types/BooksTypes';
import BookAddForm from '../components/BookAddForm';

type BookAddFormContainerProps = {
    book: BookItemType,
}

const BookAddFormContainer = ({ book } : BookAddFormContainerProps) => {
	const [quantity, setQuantity] = useState(0);
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useDispatch();

	const handleSubmit = useCallback((e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (quantity !== 0) {
			dispatch(updateBookInCart(book, quantity));
			setQuantity(0);
			messageApi.open({
				type: 'success',
				content: 'Товар добавлен в корзину',
			});
		}
	}, [book, quantity, messageApi]);

	const handleQuantityInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuantity(+e.target.value);
		}, [],
	);

	const handleQuantityChange = useCallback((value: number) => {
		setQuantity((prevQuantity) => Math.max(prevQuantity + value, 0));
	}, []);

	return (
		<>
			{contextHolder}
			<BookAddForm
				handleSubmit={handleSubmit}
				quantity={quantity}
				handleQuantityChange={handleQuantityChange}
				handleQuantityInputChange={handleQuantityInputChange}
			/>
		</>
	);
};

export default BookAddFormContainer;
