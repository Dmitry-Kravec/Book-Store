import { memo } from 'react';

export interface QuantityButtonsProps {
    handleQuantityChange: (value: number) => void,
    handleQuantityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    quantity: number,
}

const QuantityButtons = ({
	handleQuantityInputChange,
	handleQuantityChange,
	quantity,
}: QuantityButtonsProps) => (
	<div className="quantity-buttons">
		<button
			className="quantity-buttons__quantity-button"
			type="button"
			onClick={() => handleQuantityChange(-1)}
		>
			<span>&minus;</span>
		</button>
		<input
			className="quantity-buttons__quantity-input"
			type="number"
			value={quantity.toString()}
			onChange={handleQuantityInputChange}
		/>
		<button
			className="quantity-buttons__quantity-button"
			type="button"
			onClick={() => handleQuantityChange(1)}
		>
			<span>&#43;</span>
		</button>
	</div>
);

export default memo(QuantityButtons);
