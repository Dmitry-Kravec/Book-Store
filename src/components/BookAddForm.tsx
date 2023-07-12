import { memo } from 'react';
import QuantityButtons, { QuantityButtonsProps } from './QuantityButtons';

interface BookAddFormProps extends QuantityButtonsProps {
	handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void,
}

const BookAddForm = ({
	handleSubmit,
	quantity,
	onQuantityChange,
	onQuantityInputChange,
}: BookAddFormProps) => (
	<form
		className="book-add-form"
		onSubmit={handleSubmit}
	>
		<div className="book-add-form__block">
			<span>Quantity:</span>
			<QuantityButtons
				onQuantityInputChange={onQuantityInputChange}
				onQuantityChange={onQuantityChange}
				quantity={quantity}
			/>
		</div>
		<button type="submit" className="book-add-form__submit-button">Buy</button>
	</form>
);

export default memo(BookAddForm);
