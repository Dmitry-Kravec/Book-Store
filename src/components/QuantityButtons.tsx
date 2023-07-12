import { memo } from 'react';

export interface QuantityButtonsProps {
    onQuantityChange: (value: number) => void,
    onQuantityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    quantity: number,
}

const QuantityButtons = ({
	onQuantityInputChange,
	onQuantityChange,
	quantity,
}: QuantityButtonsProps) => (
	<div className="quantity-buttons">
		<button
			className="quantity-buttons__quantity-button"
			type="button"
			onClick={() => onQuantityChange(-1)}
		>
			<span>&minus;</span>
		</button>
		<input
			className="quantity-buttons__quantity-input"
			type="number"
			value={quantity.toString()}
			onChange={onQuantityInputChange}
		/>
		<button
			className="quantity-buttons__quantity-button"
			type="button"
			onClick={() => onQuantityChange(1)}
		>
			<span>&#43;</span>
		</button>
	</div>
);

export default memo(QuantityButtons);
