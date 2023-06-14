import QuantityButtons, { QuantityButtonsProps } from './QuantityButtons';

type BookAddFormProps = QuantityButtonsProps & {
    handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void,
}

const BookAddForm = ({
	handleSubmit,
	quantity,
	handleQuantityChange,
	handleQuantityInputChange,
} : BookAddFormProps) => (
	<form
		className="book-add-form"
		onSubmit={handleSubmit}
	>
		<span>Quantity:</span>
		<QuantityButtons
			handleQuantityInputChange={handleQuantityInputChange}
			handleQuantityChange={handleQuantityChange}
			quantity={quantity}
		/>

		<button type="submit" className="book-add-form__submit-button">Buy</button>
	</form>
);

export default BookAddForm;
